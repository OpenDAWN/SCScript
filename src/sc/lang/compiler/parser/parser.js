(function(sc) {
  "use strict";

  require("../compiler");
  require("../scope");
  require("../node");

  var Token = sc.lang.compiler.Token;
  var Message = sc.lang.compiler.Message;

  var Scope = sc.lang.compiler.scope({
    begin: function() {
      var declared = this.getDeclaredVariable();
      this.stack.push({
        vars: {},
        args: {},
        declared: declared
      });
    }
  });

  function Parser(parent, lexer) {
    if (parent) {
      this.parent = parent;
      this.lexer = parent.lexer;
      this.scope = parent.scope;
      this.state = parent.state;
    } else {
      this.parent = null;
      this.lexer = lexer;
      this.scope = new Scope(this);
      this.state = {
        innerElements: false,
        immutableList: false,
        underscore: []
      };
    }
  }

  Parser.addParseMethod = function(name, method) {
    Parser.prototype["parse" + name] = method;
  };

  Object.defineProperty(Parser.prototype, "lookahead", {
    get: function() {
      return this.lexer.lookahead;
    }
  });

  Parser.prototype.lex = function() {
    return this.lexer.lex();
  };

  Parser.prototype.unlex = function(token) {
    this.lexer.unlex(token);
    return this;
  };

  Parser.prototype.expect = function(value) {
    var token = this.lexer.lex();
    if (token.type !== Token.Punctuator || token.value !== value) {
      this.throwUnexpected(token, value);
    }
    return token;
  };

  Parser.prototype.match = function(value) {
    return this.lexer.lookahead.value === value;
  };

  Parser.prototype.matchAny = function(list) {
    var value = this.lexer.lookahead.value;
    for (var i = 0, imax = list.length; i < imax; ++i) {
      if (list[i] === value) {
        return value;
      }
    }
    return null;
  };

  Parser.prototype.createMarker = function(node) {
    return this.lexer.createMarker(node);
  };

  Parser.prototype.hasNextToken = function() {
    return this.lookahead.type !== Token.EOF;
  };

  Parser.prototype.throwError = function() {
    return this.lexer.throwError.apply(this.lexer, arguments);
  };

  Parser.prototype.throwUnexpected = function(token) {
    switch (token.type) {
    case Token.EOF:
      return this.throwError(token, Message.UnexpectedEOS);
    case Token.FloatLiteral:
    case Token.IntegerLiteral:
      return this.throwError(token, Message.UnexpectedNumber);
    case Token.CharLiteral:
    case Token.StringLiteral:
    case Token.SymbolLiteral:
      return this.throwError(token, Message.UnexpectedLiteral, token.type.toLowerCase());
    case Token.Identifier:
      return this.throwError(token, Message.UnexpectedIdentifier);
    }
    return this.throwError(token, Message.UnexpectedToken, token.value);
  };

  Parser.prototype.withScope = function(fn) {
    var result;

    this.scope.begin();
    result = fn.call(this);
    this.scope.end();

    return result;
  };

  sc.lang.compiler.Parser = Parser;
})(sc);
