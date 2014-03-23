(function(sc) {
  "use strict";

  require("./Number");

  sc.lang.klass.define("SimpleNumber", "Number", {
    NotYetImplemented: [
      "$new",
      "isValidUGenInput",
      "numChannels",
      "magnitude",
      "angle",
      "neg",
      "bitNot",
      "abs",
      "ceil",
      "floor",
      "frac",
      "sign",
      "squared",
      "cubed",
      "sqrt",
      "exp",
      "reciprocal",
      "midicps",
      "cpsmidi",
      "midiratio",
      "ratiomidi",
      "ampdb",
      "dbamp",
      "octcps",
      "cpsoct",
      "log",
      "log2",
      "log10",
      "sin",
      "cos",
      "tan",
      "asin",
      "acos",
      "atan",
      "sinh",
      "cosh",
      "tanh",
      "rand",
      "rand2",
      "linrand",
      "bilinrand",
      "sum3rand",
      "distort",
      "softclip",
      "coin",
      "isPositive",
      "isNegative",
      "isStrictlyPositive",
      "isNaN",
      "asBoolean",
      "booleanValue",
      "binaryValue",
      "rectWindow",
      "hanWindow",
      "welWindow",
      "triWindow",
      "scurve",
      "ramp",
      "mod",
      "div",
      "pow",
      "min",
      "max",
      "bitAnd",
      "bitOr",
      "bitXor",
      "bitHammingDistance",
      "bitTest",
      "lcm",
      "gcd",
      "round",
      "roundUp",
      "trunc",
      "atan2",
      "hypot",
      "hypotApx",
      "leftShift",
      "rightShift",
      "unsignedRightShift",
      "ring1",
      "ring2",
      "ring3",
      "ring4",
      "difsqr",
      "sumsqr",
      "sqrsum",
      "sqrdif",
      "absdif",
      "thresh",
      "amclip",
      "scaleneg",
      "clip2",
      "fold2",
      "wrap2",
      "excess",
      "firstArg",
      "rrand",
      "exprand",
      "equalWithPrecision",
      "hash",
      "asInteger",
      "asFloat",
      "asComplex",
      "asRect",
      "degrad",
      "raddeg",
      "performBinaryOpOnSimpleNumber",
      "performBinaryOpOnComplex",
      "performBinaryOpOnSignal",
      "nextPowerOfTwo",
      "nextPowerOf",
      "nextPowerOfThree",
      "previousPowerOf",
      "quantize",
      "linlin",
      "linexp",
      "explin",
      "expexp",
      "lincurve",
      "curvelin",
      "bilin",
      "biexp",
      "moddif",
      "lcurve",
      "gauss",
      "gaussCurve",
      "asPoint",
      "asWarp",
      "wait",
      "waitUntil",
      "sleep",
      "printOn",
      "storeOn",
      "rate",
      "asAudioRateInput",
      "madd",
      "lag",
      "lag2",
      "lag3",
      "lagud",
      "lag2ud",
      "lag3ud",
      "varlag",
      "slew",
      "writeInputSpec",
      "series",
      "seriesIter",
      "while",
      "while",
      "degreeToKey",
      "keyToDegree",
      "nearestInList",
      "nearestInScale",
      "partition",
      "nextTimeOnGrid",
      "playAndDelta",
      "asQuant",
      "asTimeString",
      "asFraction",
      "prSimpleNumberSeries",
      "asBufWithValues",
      "schedBundleArrayOnClock",
    ]
  });

})(sc);
