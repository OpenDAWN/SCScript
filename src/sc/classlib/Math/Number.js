SCScript.install(function(sc) {
  "use strict";

  require("./Magnitude");

  var $  = sc.lang.$;
  var fn = sc.lang.fn;
  var iterator = sc.lang.iterator;

  sc.lang.klass.refine("Number", function(spec, utils) {
    spec.isNumber = utils.alwaysReturn$true;

    spec["+"] = utils.subclassResponsibility("+");
    spec["-"] = utils.subclassResponsibility("-");
    spec["*"] = utils.subclassResponsibility("*");
    spec["/"] = utils.subclassResponsibility("/");
    spec.mod = utils.subclassResponsibility("mod");
    spec.div = utils.subclassResponsibility("div");
    spec.pow = utils.subclassResponsibility("pow");

    spec.performBinaryOpOnSeqColl = function($aSelector, $aSeqColl, $adverb) {
      var $this = this;

      return $aSeqColl.$("collect", [ $.Function(function() {
        return [ function($item) {
          return $item.perform($aSelector, $this, $adverb);
        } ];
      }) ]);
    };

    // TODO: implements performBinaryOpOnPoint

    spec.rho = utils.nop;

    spec.theta = function() {
      return $.Float(0.0);
    };

    spec.real = utils.nop;

    spec.imag = function() {
      return $.Float(0.0);
    };

    // TODO: implements @
    // TODO: implements complex
    // TODO: implements polar

    spec.for = fn(function($endValue, $function) {
      iterator.execute(
        iterator.number$for(this, $endValue),
        $function
      );
      return this;
    }, "endValue; function");

    spec.forBy = fn(function($endValue, $stepValue, $function) {
      iterator.execute(
        iterator.number$forBy(this, $endValue, $stepValue),
        $function
      );
      return this;
    }, "endValue; stepValue; function");

    spec.forSeries = fn(function($second, $last, $function) {
      iterator.execute(
        iterator.number$forSeries(this, $second, $last),
        $function
      );
      return this;
    }, "second; last; function");
  });
});
