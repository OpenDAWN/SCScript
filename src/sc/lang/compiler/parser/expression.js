(function(sc) {
  "use strict";

  require("./parser");

  var Parser = sc.lang.compiler.Parser;

  /*
    Expression :
      AssignmentExpression
  */
  Parser.addParseMethod("Expression", function() {
    return this.parseAssignmentExpression();
  });

  /*
    Expressions :
      Expression
      Expressions ; Expression
  */
  Parser.addParseMethod("Expressions", function() {
    var nodes = [];

    while (this.hasNextToken() && !this.matchAny([ ",", ")", "]", ".." ])) {
      var marker = this.createMarker();
      var node = this.parseExpression();
      node = marker.update().apply(node);

      nodes.push(node);

      if (this.match(";")) {
        this.lex();
      }
    }

    if (nodes.length === 0) {
      this.throwUnexpected(this.lookahead);
    }

    return nodes.length === 1 ? nodes[0] : nodes;
  });
})(sc);
