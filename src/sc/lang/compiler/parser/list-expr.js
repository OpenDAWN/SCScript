(function(sc) {
  "use strict";

  require("./base-parser");

  var Token = sc.lang.compiler.Token;
  var Node = sc.lang.compiler.Node;
  var BaseParser = sc.lang.compiler.BaseParser;

  /*
    ListExpression :
      [ ListElements(opts) ]

    ListElements :
      ListElement
      ListElements , ListElement

    ListElement :
      Expression : Expression
      Expression
  */
  BaseParser.addParseMethod("ListExpression", function() {
    return new ListExpressionParser(this).parse();
  });

  /*
    ImmutableListExpression :
      # ListExpression
  */
  BaseParser.addParseMethod("ImmutableListExpression", function(lookahead) {
    if (this.state.immutableList) {
      this.throwUnexpected(lookahead);
    }

    var expr;
    this.state.immutableList = true;
    this.expect("#");
    expr = this.parseListExpression();
    this.state.immutableList = false;

    return expr;
  });

  function ListExpressionParser(parent) {
    BaseParser.call(this, parent);
    this.parent = parent;
  }
  sc.libs.extend(ListExpressionParser, BaseParser);

  ListExpressionParser.prototype.parse = function() {
    this.expect("[");

    var elements = this.parseListElements();

    this.expect("]");

    return Node.createListExpression(elements, this.state.immutableList);
  };

  ListExpressionParser.prototype.parseListElements = function() {
    var elements = [];
    var innerElements = this.state.innerElements;

    this.state.innerElements = true;

    while (this.hasNextToken() && !this.match("]")) {
      elements = elements.concat(this.parseListElement());
      if (!this.match("]")) {
        this.expect(",");
      }
    }

    this.state.innerElements = innerElements;

    return elements;
  };

  ListExpressionParser.prototype.parseListElement = function() {
    var elements = [];

    if (this.lookahead.type === Token.Label) {
      elements.push(this.parseLabel(), this.parseExpression());
    } else {
      elements.push(this.parseExpression());
      if (this.match(":")) {
        this.lex();
        elements.push(this.parseExpression());
      }
    }

    return elements;
  };
})(sc);
