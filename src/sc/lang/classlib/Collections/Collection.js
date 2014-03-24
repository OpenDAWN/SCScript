(function(sc) {
  "use strict";

  require("../Core/Object");

  function SCCollection() {
    this.__initializeWith__("Object");
  }

  sc.lang.klass.define("Collection", "Object", {
    constructor: SCCollection,
    NotYetImplemented: [
      "$newFrom",
      "$with",
      "$fill",
      "$fill2D",
      "$fill3D",
      "$fillND",
      "hash",
      "species",
      "do",
      "iter",
      "size",
      "flatSize",
      "isEmpty",
      "notEmpty",
      "asCollection",
      "isCollection",
      "add",
      "addAll",
      "remove",
      "removeAll",
      "removeEvery",
      "removeAllSuchThat",
      "atAll",
      "putEach",
      "includes",
      "includesEqual",
      "includesAny",
      "includesAll",
      "matchItem",
      "collect",
      "select",
      "reject",
      "collectAs",
      "selectAs",
      "rejectAs",
      "detect",
      "detectIndex",
      "doMsg",
      "collectMsg",
      "selectMsg",
      "rejectMsg",
      "detectMsg",
      "detectIndexMsg",
      "lastForWhich",
      "lastIndexForWhich",
      "inject",
      "injectr",
      "count",
      "occurrencesOf",
      "any",
      "every",
      "sum",
      "mean",
      "product",
      "sumabs",
      "maxItem",
      "minItem",
      "maxIndex",
      "minIndex",
      "maxValue",
      "minValue",
      "maxSizeAtDepth",
      "maxDepth",
      "deepCollect",
      "deepDo",
      "invert",
      "sect",
      "union",
      "difference",
      "symmetricDifference",
      "isSubsetOf",
      "asArray",
      "asBag",
      "asList",
      "asSet",
      "asSortedList",
      "powerset",
      "flopDict",
      "histo",
      "printAll",
      "printcsAll",
      "dumpAll",
      "printOn",
      "storeOn",
      "storeItemsOn",
      "printItemsOn",
      "writeDef",
      "writeInputSpec",
      "case",
      "makeEnvirValPairs",
    ]
  });

})(sc);
