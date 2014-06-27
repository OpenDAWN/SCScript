(function(sc) {
  "use strict";

  require("./parser");

  var Parser = sc.lang.compiler.Parser;
  var Node = sc.lang.compiler.Node;

  /*
    PartialExpression :
      BinaryExpression
  */
  Parser.addParseMethod("PartialExpression", function() {
    if (this.state.innerElements) {
      return this.parseBinaryExpression();
    }

    var underscore = this.state.underscore;
    this.state.underscore = [];

    var node = this.parseBinaryExpression();

    if (this.state.underscore.length) {
      node = this.withScope(function() {
        var args = new Array(this.state.underscore.length);
        for (var i = 0, imax = args.length; i < imax; ++i) {
          var x = this.state.underscore[i];
          var y = Node.createVariableDeclarator(x);
          args[i] = this.createMarker(x).update(x).apply(y);
          this.scope.add("arg", this.state.underscore[i].name);
        }

        return Node.createFunctionExpression(
          { list: args }, [ node ], false, true, false
        );
      });
    }

    this.state.underscore = underscore;

    return node;
  });
})(sc);
