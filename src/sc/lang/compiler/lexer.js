(function(sc) {
  "use strict";

  require("./compiler");

  var slice = [].slice;
  var strlib = sc.libs.strlib;
  var Token    = sc.lang.compiler.Token;
  var Message  = sc.lang.compiler.Message;
  var Keywords = sc.lang.compiler.Keywords;

  function Lexer(source, opts) {
    /* istanbul ignore next */
    if (typeof source !== "string") {
      if (typeof source === "undefined") {
        source = "";
      }
      source = String(source);
    }
    this.source = source.replace(/\r\n?/g, "\n");
    this.opts = opts = opts || /* istanbul ignore next */ {};

    this.length = source.length;
    this.errors = opts.tolerant ? [] : null;

    this.index = 0;
    this.lineNumber = this.length ? 1 : 0;
    this.lineStart = 0;

    this.lookahead = this.advance();

    this.index = 0;
    this.lineNumber = this.length ? 1 : 0;
    this.lineStart = 0;
  }

  Object.defineProperty(Lexer.prototype, "columnNumber", {
    get: function() {
      return this.index - this.lineStart;
    }
  });

  Lexer.prototype.tokenize = function() {
    var tokens = [];

    while (true) {
      var token = this.collectToken();
      if (token.type === Token.EOF) {
        break;
      }
      tokens.push(token);
    }

    return tokens;
  };

  Lexer.prototype.collectToken = function() {
    var token = this.advance();

    var result = {
      type: token.type,
      value: token.value
    };

    if (this.opts.range) {
      result.range = token.range;
    }
    if (this.opts.loc) {
      result.loc = token.loc;
    }

    return result;
  };

  Lexer.prototype.advance = function() {
    this.skipComment();

    if (this.length <= this.index) {
      return this.EOFToken();
    }

    var lineNumber = this.lineNumber;
    var columnNumber = this.columnNumber;

    var token = this._advance();

    token.loc = {
      start: { line: lineNumber, column: columnNumber },
      end: { line: this.lineNumber, column: this.columnNumber }
    };

    return token;
  };

  Lexer.prototype.skipComment = function() {
    var source = this.source;
    var length = this.length;
    var index = this.index;

    while (index < length) {
      var ch1 = source.charAt(index);
      var ch2 = source.charAt(index + 1);

      if (ch1 === " " || ch1 === "\t") {
        index += 1;
      } else if (ch1 === "\n") {
        index += 1;
        this.lineNumber += 1;
        this.lineStart = index;
      } else if (ch1 === "/" && ch2 === "/") {
        index = this.skipSingleLineComment(index + 2);
      } else if (ch1 === "/" && ch2 === "*") {
        index = this.skipMultiLineComment(index + 2);
      } else {
        break;
      }
    }

    this.index = index;
  };

  Lexer.prototype.skipSingleLineComment = function(index) {
    var source = this.source;
    var length = this.length;

    while (index < length) {
      var ch = source.charAt(index);
      index += 1;
      if (ch === "\n") {
        this.lineNumber += 1;
        this.lineStart = index;
        break;
      }
    }

    return index;
  };

  Lexer.prototype.skipMultiLineComment = function(index) {
    var source = this.source;
    var length = this.length;

    var depth = 1;
    while (index < length) {
      var ch1 = source.charAt(index);
      var ch2 = source.charAt(index + 1);

      if (ch1 === "\n") {
        this.lineNumber += 1;
        this.lineStart = index;
      } else if (ch1 === "/" && ch2 === "*") {
        depth += 1;
        index += 1;
      } else if (ch1 === "*" && ch2 === "/") {
        depth -= 1;
        index += 1;
        if (depth === 0) {
          return index + 1;
        }
      }

      index += 1;
    }
    this.throwError({}, Message.UnexpectedToken, "ILLEGAL");

    return index;
  };

  Lexer.prototype._advance = function() {
    var ch = this.source.charAt(this.index);

    if (ch === "\\") {
      return this.scanSymbolLiteral();
    }
    if (ch === "'") {
      return this.scanQuotedSymbolLiteral();
    }
    if (ch === "$") {
      return this.scanCharLiteral();
    }
    if (ch === '"') {
      return this.scanStringLiteral();
    }
    if (ch === "_") {
      return this.scanUnderscore();
    }
    if (strlib.isAlpha(ch)) {
      return this.scanIdentifier();
    }
    if (strlib.isNumber(ch)) {
      return this.scanNumericLiteral();
    }

    return this.scanPunctuator();
  };

  Lexer.prototype.lex = function() {
    var token = this.lookahead;

    this.index      = token.range[1];
    this.lineNumber = token.lineNumber;
    this.lineStart  = token.lineStart;

    this.lookahead = this.advance();

    this.index      = token.range[1];
    this.lineNumber = token.lineNumber;
    this.lineStart  = token.lineStart;

    return token;
  };

  Lexer.prototype.unlex = function(token) {
    this.lookahead = token;
    this.index = token.range[1];
    this.lineNumber = token.lineNumber;
    this.lineStart = token.lineStart;
    return this.lookahead;
  };

  Lexer.prototype.makeToken = function(type, value, start) {
    return {
      type: type,
      value: value,
      lineNumber: this.lineNumber,
      lineStart: this.lineStart,
      range: [ start, this.index ]
    };
  };

  Lexer.prototype.EOFToken = function() {
    return this.makeToken(Token.EOF, "<EOF>", this.index);
  };

  Lexer.prototype.scanCharLiteral = function() {
    var start = this.index;
    var value = this.source.charAt(this.index + 1);

    this.index += 2;

    return this.makeToken(Token.CharLiteral, value, start);
  };

  Lexer.prototype.scanIdentifier = function() {
    var source = this.source.slice(this.index);
    var start = this.index;
    var type;
    var value = /^[a-zA-Z][a-zA-Z0-9_]*/.exec(source)[0];

    this.index += value.length;

    if (this.source.charAt(this.index) === ":") {
      this.index += 1;
      return this.makeToken(Token.Label, value, start);
    } else if (isKeyword(value)) {
      type = Token.Keyword;
    } else {
      switch (value) {
      case "inf":
        type = Token.FloatLiteral;
        value = "Infinity";
        break;
      case "pi":
        type = Token.FloatLiteral;
        value = String(Math.PI);
        break;
      case "nil":
        type = Token.NilLiteral;
        break;
      case "true":
        type = Token.TrueLiteral;
        break;
      case "false":
        type = Token.FalseLiteral;
        break;
      default:
        type = Token.Identifier;
        break;
      }
    }

    return this.makeToken(type, value, start);
  };

  Lexer.prototype.scanNumericLiteral = function() {
    return this.scanNAryNumberLiteral() ||
      this.scanHexNumberLiteral() ||
      this.scanAccidentalNumberLiteral() ||
      this.scanDecimalNumberLiteral();
  };

  Lexer.prototype.scanNAryNumberLiteral = function() {
    var start = this.index;
    var items = this.match(
      /^(\d+)r((?:[\da-zA-Z](?:_(?=[\da-zA-Z]))?)+)(?:\.((?:[\da-zA-Z](?:_(?=[\da-zA-Z]))?)+))?/
    );

    if (!items) {
      return;
    }

    var base    = items[1].replace(/^0+(?=\d)/g, "")|0;
    var integer = items[2].replace(/(^0+(?=\d)|_)/g, "");
    var frac    = items[3] && items[3].replace(/_/g, "");
    var pi = false;

    if (!frac && base < 26 && integer.substr(-2) === "pi") {
      integer = integer.slice(0, -2);
      pi = true;
    }

    var type  = Token.IntegerLiteral;
    var value = calcNBasedInteger(integer, base);

    if (frac) {
      type = Token.FloatLiteral;
      value += calcNBasedFrac(frac, base);
    }

    if (isNaN(value)) {
      this.throwError({}, Message.UnexpectedToken, items[0]);
    }

    var token = makeNumberToken(type, value, pi);

    this.index += items[0].length;

    return this.makeToken(token.type, token.value, start);
  };

  Lexer.prototype.scanHexNumberLiteral = function() {
    var start = this.index;
    var items = this.match(/^(0x(?:[\da-fA-F](?:_(?=[\da-fA-F]))?)+)(pi)?/);

    if (!items) {
      return;
    }

    var integer = items[1].replace(/_/g, "");
    var pi      = !!items[2];

    var type  = Token.IntegerLiteral;
    var value = +integer;

    var token = makeNumberToken(type, value, pi);

    this.index += items[0].length;

    return this.makeToken(token.type, token.value, start);
  };

  Lexer.prototype.scanAccidentalNumberLiteral = function() {
    var start = this.index;
    var items = this.match(/^(\d+)([bs]+)(\d*)/);

    if (!items) {
      return;
    }

    var integer    = items[1];
    var accidental = items[2];
    var sign = (accidental.charAt(0) === "s") ? +1 : -1;

    var cents;
    if (items[3] === "") {
      cents = Math.min(accidental.length * 0.1, 0.4);
    } else {
      cents = Math.min(items[3] * 0.001, 0.499);
    }
    var value = +integer + (sign * cents);

    var token = makeNumberToken(Token.FloatLiteral, value, false);

    this.index += items[0].length;

    return this.makeToken(token.type, token.value, start);
  };

  Lexer.prototype.scanDecimalNumberLiteral = function() {
    var start = this.index;
    var items = this.match(
      /^((?:\d(?:_(?=\d))?)+((?:\.(?:\d(?:_(?=\d))?)+)?(?:e[-+]?(?:\d(?:_(?=\d))?)+)?))(pi)?/
    );

    var integer = items[1];
    var frac    = items[2];
    var pi      = items[3];

    var type  = (frac || pi) ? Token.FloatLiteral : Token.IntegerLiteral;
    var value = +integer.replace(/(^0+(?=\d)|_)/g, "");

    var token = makeNumberToken(type, value, pi);

    this.index += items[0].length;

    return this.makeToken(token.type, token.value, start);
  };

  Lexer.prototype.scanPunctuator = function() {
    var start = this.index;
    var items = this.match(/^(\.{1,3}|[(){}[\]:;,~#`]|[-+*\/%<=>!?&|@]+)/);

    if (items) {
      this.index += items[0].length;
      return this.makeToken(Token.Punctuator, items[0], start);
    }

    this.throwError({}, Message.UnexpectedToken, this.source.charAt(this.index));

    this.index = this.length;

    return this.EOFToken();
  };

  Lexer.prototype.scanStringLiteral = function() {
    var start = this.index;
    var source = this.source;
    var length = this.length;
    var str = "";

    this.index += 1;
    while (this.index < length) {
      var ch = source.charAt(this.index++);
      if (ch === '"') {
        return this.makeToken(Token.StringLiteral, str, start);
      } else if (ch === "\n") {
        this.lineNumber += 1;
        this.lineStart = this.index;
        str += "\\n";
      } else if (ch === "\\") {
        str += "\\" + source.charAt(this.index++);
      } else {
        str += ch;
      }
    }

    return this.throwError({}, Message.UnexpectedToken, "ILLEGAL");
  };

  Lexer.prototype.scanQuotedSymbolLiteral = function() {
    var start = this.index;
    var source = this.source;
    var length = this.length;
    var str = "";

    this.index += 1;
    while (this.index < length) {
      var ch = source.charAt(this.index++);
      if (ch === "'") {
        return this.makeToken(Token.SymbolLiteral, str, start);
      } else if (ch === "\n") {
        this.throwError({}, Message.UnexpectedToken, "ILLEGAL");
      } else if (ch !== "\\") {
        str += ch;
      }
    }

    return this.throwError({}, Message.UnexpectedToken, "ILLEGAL");
  };

  Lexer.prototype.scanSymbolLiteral = function() {
    var start = this.index;
    var items = this.match(/^\\([a-zA-Z_]\w*|\d+)?/);

    var value = items[1] || "";

    this.index += items[0].length;

    return this.makeToken(Token.SymbolLiteral, value, start);
  };

  Lexer.prototype.scanUnderscore = function() {
    var start = this.index;

    this.index += 1;

    return this.makeToken(Token.Identifier, "_", start);
  };

  Lexer.prototype.match = function(re) {
    return re.exec(this.source.slice(this.index));
  };

  Lexer.prototype.getLocItems = function() {
    return [ this.index, this.lineNumber, this.columnNumber ];
  };

  Lexer.prototype.throwError = function(token, messageFormat) {
    var message = strlib.format(messageFormat, slice.call(arguments, 2));

    var index, lineNumber, column;
    if (typeof token.lineNumber === "number") {
      index      = token.range[0];
      lineNumber = token.lineNumber;
      column     = token.range[0] - token.lineStart + 1;
    } else {
      index      = this.index;
      lineNumber = this.lineNumber;
      column     = index - this.lineStart + 1;
    }

    var error = new Error("Line " + lineNumber + ": " + message);
    error.index       = index;
    error.lineNumber  = lineNumber;
    error.column      = column;
    error.description = message;

    if (this.errors) {
      var prev = this.errors[this.errors.length - 1];
      if (!(prev && error.index <= prev.index)) {
        this.errors.push(error);
      }
    } else {
      throw error;
    }

    return this.EOFToken();
  };

  function char2num(ch, base) {
    var num = strlib.char2num(ch, base);
    if (num >= base) {
      num = NaN;
    }
    return num;
  }

  function calcNBasedInteger(integer, base) {
    var value = 0;
    for (var i = 0, imax = integer.length; i < imax; ++i) {
      value *= base;
      value += char2num(integer[i], base);
    }
    return value;
  }

  function calcNBasedFrac(frac, base) {
    var value = 0;
    for (var i = 0, imax = frac.length; i < imax; ++i) {
      value += char2num(frac[i], base) * Math.pow(base, -(i + 1));
    }
    return value;
  }

  function makeNumberToken(type, value, pi) {
    if (pi) {
      type = Token.FloatLiteral;
      value = value * Math.PI;
    }

    if (type === Token.FloatLiteral && value === (value|0)) {
      value = value + ".0";
    }

    return {
      type: type,
      value: String(value)
    };
  }

  function isKeyword(value) {
    return Keywords.hasOwnProperty(value);
  }

  sc.lang.compiler.lexer = Lexer;
})(sc);
