"use strict";

require("./mathlib");

var mathlib = sc.libs.mathlib;

describe("sc.libs.mathlib", function() {
  function testCase(context, cases, opts) {
    var methodName = context.test.title;
    opts = opts || {};

    if (typeof opts.randSeed === "number") {
      sc.libs.random.setSeed(opts.randSeed);
    }

    cases.forEach(function(items) {
      var expected, actual;
      var desc;

      expected = items.pop();
      actual = mathlib[methodName].apply(null, items);

      desc = sc.test.desc("#{0}(#{1})", methodName, "" + items);

      if (opts.closeTo) {
        if (isFinite(actual)) {
          expect(actual).with_message(desc).to.be.closeTo(expected, opts.closeTo);
        } else if (isNaN(actual)) {
          expect(actual).with_message(desc).to.be.nan;
        } else {
          expect(actual).with_message(desc).to.equal(expected);
        }
      } else {
        expect(actual).with_message(desc).to.equal(expected);
      }
    });
  }
  it("rand", function() {
    testCase(this, [
      [ 1.0, 0.85755145549774 ],
      [ 1.0, 0.07253098487854 ],
      [ 1.0, 0.15391707420349 ],
      [ 1.0, 0.53926873207092 ],
      [ 1.0, 0.37802028656006 ],
      [ 1.0, 0.35834920406342 ],
      [ 1.0, 0.63415861129761 ],
      [ 1.0, 0.82429480552673 ],
      [ 1.0, 0.09632408618927 ],
      [ 1.0, 0.93640172481537 ],
    ], { randSeed: 0, closeTo: 1e-6 });
  });
  it("+", function() {
    testCase(this, [
      [ -2.5, -3.5, -6.0 ],
      [ -2.5,  0.0, -2.5 ],
      [ -2.5, +3.5,  1.0 ],
      [  0.0, -3.5, -3.5 ],
      [  0.0,  0.0,  0.0 ],
      [  0.0, +3.5,  3.5 ],
      [ +2.5, -3.5, -1.0 ],
      [ +2.5,  0.0,  2.5 ],
      [ +2.5, +3.5,  6.0 ],
    ]);
  });
  it("-", function() {
    testCase(this, [
      [ -2.5, -3.5,  1.0 ],
      [ -2.5,  0.0, -2.5 ],
      [ -2.5, +3.5, -6.0 ],
      [  0.0, -3.5, +3.5 ],
      [  0.0,  0.0,  0.0 ],
      [  0.0, +3.5, -3.5 ],
      [ +2.5, -3.5,  6.0 ],
      [ +2.5,  0.0,  2.5 ],
      [ +2.5, +3.5, -1.0 ],
    ]);
  });
  it("*", function() {
    testCase(this, [
      [ -2.5, -3.5,  8.75 ],
      [ -2.5,  0.0,  0.00 ],
      [ -2.5, +3.5, -8.75 ],
      [  0.0, -3.5,  0.00 ],
      [  0.0,  0.0,  0.00 ],
      [  0.0, +3.5,  0.00 ],
      [ +2.5, -3.5, -8.75 ],
      [ +2.5,  0.0,  0.00 ],
      [ +2.5, +3.5, +8.75 ],
    ]);
  });
  it("/", function() {
    testCase(this, [
      [ -2.5, -3.5,  0.71428571428571 ],
      [ -2.5,  0.0, -Infinity ],
      [ -2.5, +3.5, -0.71428571428571 ],
      [  0.0, -3.5,  0.0 ],
      [  0.0,  0.0,  NaN ],
      [  0.0, +3.5,  0.0 ],
      [ +2.5, -3.5, -0.71428571428571 ],
      [ +2.5,  0.0, +Infinity ],
      [ +2.5, +3.5, +0.71428571428571 ],
    ], { closeTo: 1e-6 });
  });
  it("mod", function() {
    testCase(this, [
      [ -2.5, -3.5, -2.5 ],
      [ -2.5,  0.0,  0.0 ],
      [ -2.5, +3.5,  1.0 ],
      [  0.0, -3.5,  0.0 ],
      [  0.0,  0.0,  0.0 ],
      [  0.0, +3.5,  0.0 ],
      [ +2.5, -3.5, -1.0 ],
      [ +2.5,  0.0,  0.0 ],
      [ +2.5, +3.5,  2.5 ],
    ]);
  });
  it("div", function() {
    testCase(this, [
      [ 10, -3, -3 ],
      [ 10,  0, 10 ],
      [ 10,  3,  3 ],
    ]);
  });
  it("pow", function() {
    testCase(this, [
      [ 2, -2, 0.25 ],
      [ 2, -1, 0.5 ],
      [ 2,  0, 1 ],
      [ 2,  1, 2 ],
      [ 2,  2, 4 ],
    ]);
  });
  it("min", function() {
    testCase(this, [
      [ 1, 0, 0 ],
      [ 1, 1, 1 ],
      [ 1, 2, 1 ],
      [ 0, 1, 0 ],
      [ 1, 1, 1 ],
      [ 2, 1, 1 ],
    ]);
  });
  it("max", function() {
    testCase(this, [
      [ 1, 0, 1 ],
      [ 1, 1, 1 ],
      [ 1, 2, 2 ],
      [ 0, 1, 1 ],
      [ 1, 1, 1 ],
      [ 2, 1, 2 ],
    ]);
  });
  it("bitAnd", function() {
    testCase(this, [
      [ 14, 0, 0 ],
      [ 14, 1, 0 ],
      [ 14, 2, 2 ],
      [ 14, 3, 2 ],
    ]);
  });
  it("bitOr", function() {
    testCase(this, [
      [ 14, 0, 14 ],
      [ 14, 1, 15 ],
      [ 14, 2, 14 ],
      [ 14, 3, 15 ],
    ]);
  });
  it("bitXor", function() {
    testCase(this, [
      [ 14, 0, 14 ],
      [ 14, 1, 15 ],
      [ 14, 2, 12 ],
      [ 14, 3, 13 ],
    ]);
  });
  it("lcm", function() {
    testCase(this, [
      [ -42, -24, 168 ],
      [ -42,   0,   0 ],
      [ -42, +24, 168 ],
      [   0, -24,   0 ],
      [   0,   0,   0 ],
      [   0, +24,   0 ],
      [ +42, -24, 168 ],
      [ +42,   0,   0 ],
      [ +42, +24, 168 ],
    ]);
  });
  it("gcd", function() {
    testCase(this, [
      [ -42, -24,  6 ],
      [ -42,   0, 42 ],
      [ -42, +24,  6 ],
      [   0, -24, 24 ],
      [   0,   0,  0 ],
      [   0, +24, 24 ],
      [ +42, -24,  6 ],
      [ +42,   0, 42 ],
      [ +42, +24,  6 ],
    ]);
  });
  it("round", function() {
    testCase(this, [
      [ -31.4, -1.5, -31.5 ],
      [ -31.4,  0.0, -31.4 ],
      [ -31.4, +1.5, -31.5 ],
      [   0.0, -1.5,   0.0 ],
      [   0.0,  0.0,   0.0 ],
      [   0.0, +1.5,   0.0 ],
      [ +31.4, -1.5,  31.5 ],
      [ +31.4,  0.0,  31.4 ],
      [ +31.4, +1.5,  31.5 ],
    ]);
  });
  it("roundUp", function() {
    testCase(this, [
      [ -31.4, -1.5, -31.5 ],
      [ -31.4,  0.0, -31.4 ],
      [ -31.4, +1.5, -30.0 ],
      [   0.0, -1.5,   0.0 ],
      [   0.0,  0.0,   0.0 ],
      [   0.0, +1.5,   0.0 ],
      [ +31.4, -1.5,  30.0 ],
      [ +31.4,  0.0,  31.4 ],
      [ +31.4, +1.5,  31.5 ],
    ]);
  });
  it("trunc", function() {
    testCase(this, [
      [ -31.4, -1.5, -30.0 ],
      [ -31.4,  0.0, -31.4 ],
      [ -31.4, +1.5, -31.5 ],
      [   0.0, -1.5,   0.0 ],
      [   0.0,  0.0,   0.0 ],
      [   0.0, +1.5,   0.0 ],
      [ +31.4, -1.5,  31.5 ],
      [ +31.4,  0.0,  31.4 ],
      [ +31.4, +1.5,  30.0 ],
    ]);
  });
  it("atan2", function() {
    testCase(this, [
      [ -31.4, -1.5, -1.6185307388920 ],
      [ -31.4,  0.0, -1.5707963267949 ],
      [ -31.4, +1.5, -1.5230619146978 ],
      [   0.0, -1.5,  3.1415926535898 ],
      [   0.0,  0.0,  0.0 ],
      [   0.0, +1.5,  0.0 ],
      [ +31.4, -1.5,  1.6185307388920 ],
      [ +31.4,  0.0,  1.5707963267949 ],
      [ +31.4, +1.5,  1.5230619146978 ],
    ], { closeTo: 1e-6 });
  });
  it("hypot", function() {
    testCase(this, [
      [ -31.4, -1.5, 31.435807608522 ],
      [ -31.4,  0.0, 31.4 ],
      [ -31.4, +1.5, 31.435807608522 ],
      [   0.0, -1.5,  1.5 ],
      [   0.0,  0.0,  0.0 ],
      [   0.0, +1.5,  1.5 ],
      [ +31.4, -1.5, 31.435807608522 ],
      [ +31.4,  0.0, 31.4 ],
      [ +31.4, +1.5, 31.435807608522 ],
    ], { closeTo: 1e-6 });
  });
  it("hypotApx", function() {
    testCase(this, [
      [ -31.4, -1.5, 32.278679648042 ],
      [ -31.4,  0.0, 31.4 ],
      [ -31.4, +1.5, 32.278679648042 ],
      [   0.0, -1.5,  1.5 ],
      [   0.0,  0.0,  0.0 ],
      [   0.0, +1.5,  1.5 ],
      [ +31.4, -1.5, 32.278679648042 ],
      [ +31.4,  0.0, 31.4 ],
      [ +31.4, +1.5, 32.278679648042 ],
    ], { closeTo: 1e-6 });
  });
  it("leftShift", function() {
    testCase(this, [
      [ -31.4, -1.5, -16 ],
      [ -31.4,  0.0, -31 ],
      [ -31.4, +1.5, -62 ],
      [   0.0, -1.5,   0 ],
      [   0.0,  0.0,   0 ],
      [   0.0, +1.5,   0 ],
      [ +31.4, -1.5,  15 ],
      [ +31.4,  0.0,  31 ],
      [ +31.4, +1.5,  62 ],
    ]);
  });
  it("rightShift", function() {
    testCase(this, [
      [ -31.4, -1.5, -62 ],
      [ -31.4,  0.0, -31 ],
      [ -31.4, +1.5, -16 ],
      [   0.0, -1.5,   0 ],
      [   0.0,  0.0,   0 ],
      [   0.0, +1.5,   0 ],
      [ +31.4, -1.5,  62 ],
      [ +31.4,  0.0,  31 ],
      [ +31.4, +1.5,  15 ],
    ]);
  });
  it("unsignedRightShift", function() {
    testCase(this, [
      [ -31.4, -1.5, -62 ],
      [ -31.4,  0.0, -31 ],
      [ -31.4, +1.5, -16 ],
      [   0.0, -1.5,   0 ],
      [   0.0,  0.0,   0 ],
      [   0.0, +1.5,   0 ],
      [ +31.4, -1.5,  62 ],
      [ +31.4,  0.0,  31 ],
      [ +31.4, +1.5,  15 ],
    ]);
  });
  it("ring1", function() {
    testCase(this, [
      [ -31.4, -1.5,  15.7 ],
      [ -31.4,  0.0, -31.4 ],
      [ -31.4, +1.5, -78.5 ],
      [   0.0, -1.5,   0.0 ],
      [   0.0,  0.0,   0.0 ],
      [   0.0, +1.5,   0.0 ],
      [ +31.4, -1.5, -15.7 ],
      [ +31.4,  0.0,  31.4 ],
      [ +31.4, +1.5,  78.5 ],
    ], { closeTo: 1e-6 });
  });
  it("ring2", function() {
    testCase(this, [
      [ -31.4, -1.5,  14.2 ],
      [ -31.4,  0.0, -31.4 ],
      [ -31.4, +1.5, -77.0 ],
      [   0.0, -1.5,  -1.5 ],
      [   0.0,  0.0,   0.0 ],
      [   0.0, +1.5,   1.5 ],
      [ +31.4, -1.5, -17.2 ],
      [ +31.4,  0.0,  31.4 ],
      [ +31.4, +1.5,  80.0 ],
    ], { closeTo: 1e-6 });
  });
  it("ring3", function() {
    testCase(this, [
      [ -31.4, -1.5, -1478.94 ],
      [ -31.4,  0.0,     0.00 ],
      [ -31.4, +1.5,  1478.94 ],
      [   0.0, -1.5,     0.00 ],
      [   0.0,  0.0,     0.00 ],
      [   0.0, +1.5,     0.00 ],
      [ +31.4, -1.5, -1478.94 ],
      [ +31.4,  0.0,     0.00 ],
      [ +31.4, +1.5,  1478.94 ],
    ], { closeTo: 1e-6 });
  });
  it("ring4", function() {
    testCase(this, [
      [ -31.4, -1.5, -1408.29 ],
      [ -31.4,  0.0,     0.00 ],
      [ -31.4, +1.5,  1549.59 ],
      [   0.0, -1.5,     0.00 ],
      [   0.0,  0.0,     0.00 ],
      [   0.0, +1.5,     0.00 ],
      [ +31.4, -1.5, -1549.59 ],
      [ +31.4,  0.0,     0.00 ],
      [ +31.4, +1.5,  1408.29 ],
    ], { closeTo: 1e-6 });
  });
  it("difsqr", function() {
    testCase(this, [
      [ -31.4, -1.5, 983.71 ],
      [ -31.4,  0.0, 985.96 ],
      [ -31.4, +1.5, 983.71 ],
      [   0.0, -1.5,  -2.25 ],
      [   0.0,  0.0,   0.00 ],
      [   0.0, +1.5,  -2.25 ],
      [ +31.4, -1.5, 983.71 ],
      [ +31.4,  0.0, 985.96 ],
      [ +31.4, +1.5, 983.71 ],
    ], { closeTo: 1e-6 });
  });
  it("sumsqr", function() {
    testCase(this, [
      [ -31.4, -1.5, 988.21 ],
      [ -31.4,  0.0, 985.96 ],
      [ -31.4, +1.5, 988.21 ],
      [   0.0, -1.5,   2.25 ],
      [   0.0,  0.0,   0.00 ],
      [   0.0, +1.5,   2.25 ],
      [ +31.4, -1.5, 988.21 ],
      [ +31.4,  0.0, 985.96 ],
      [ +31.4, +1.5, 988.21 ],
    ], { closeTo: 1e-6 });
  });
  it("sqrsum", function() {
    testCase(this, [
      [ -31.4, -1.5, 1082.41 ],
      [ -31.4,  0.0,  985.96 ],
      [ -31.4, +1.5,  894.01 ],
      [   0.0, -1.5,    2.25 ],
      [   0.0,  0.0,    0.00 ],
      [   0.0, +1.5,    2.25 ],
      [ +31.4, -1.5,  894.01 ],
      [ +31.4,  0.0,  985.96 ],
      [ +31.4, +1.5, 1082.41 ],
    ], { closeTo: 1e-6 });
  });
  it("sqrdif", function() {
    testCase(this, [
      [ -31.4, -1.5,  894.01 ],
      [ -31.4,  0.0,  985.96 ],
      [ -31.4, +1.5, 1082.41 ],
      [   0.0, -1.5,    2.25 ],
      [   0.0,  0.0,    0.00 ],
      [   0.0, +1.5,    2.25 ],
      [ +31.4, -1.5, 1082.41 ],
      [ +31.4,  0.0,  985.96 ],
      [ +31.4, +1.5,  894.01 ],
    ], { closeTo: 1e-6 });
  });
  it("absdif", function() {
    testCase(this, [
      [ -31.4, -1.5, 29.9 ],
      [ -31.4,  0.0, 31.4 ],
      [ -31.4, +1.5, 32.9 ],
      [   0.0, -1.5,  1.5 ],
      [   0.0,  0.0,  0.0 ],
      [   0.0, +1.5,  1.5 ],
      [ +31.4, -1.5, 32.9 ],
      [ +31.4,  0.0, 31.4 ],
      [ +31.4, +1.5, 29.9 ],
    ]);
  });
  it("thresh", function() {
    testCase(this, [
      [ -31.4, -1.5,  0.0 ],
      [ -31.4,  0.0,  0.0 ],
      [ -31.4, +1.5,  0.0 ],
      [   0.0, -1.5,  0.0 ],
      [   0.0,  0.0,  0.0 ],
      [   0.0, +1.5,  0.0 ],
      [ +31.4, -1.5, 31.4 ],
      [ +31.4,  0.0, 31.4 ],
      [ +31.4, +1.5, 31.4 ],
    ]);
  });
  it("amclip", function() {
    testCase(this, [
      [ -31.4, -1.5,   0.0 ],
      [ -31.4,  0.0,   0.0 ],
      [ -31.4, +1.5, -47.1 ],
      [   0.0, -1.5,   0.0 ],
      [   0.0,  0.0,   0.0 ],
      [   0.0, +1.5,   0.0 ],
      [ +31.4, -1.5,   0.0 ],
      [ +31.4,  0.0,   0.0 ],
      [ +31.4, +1.5,  47.1 ],
    ], { closeTo: 1e-6 });
  });
  it("scaleneg", function() {
    testCase(this, [
      [ -31.4, -1.5, -47.1 ],
      [ -31.4,  0.0,   0.0 ],
      [ -31.4, +1.5,  47.1 ],
      [   0.0, -1.5,   0.0 ],
      [   0.0,  0.0,   0.0 ],
      [   0.0, +1.5,   0.0 ],
      [ +31.4, -1.5,  31.4 ],
      [ +31.4,  0.0,  31.4 ],
      [ +31.4, +1.5,  31.4 ],
    ], { closeTo: 1e-6 });
  });
  it("clip2", function() {
    testCase(this, [
      [ -31.4, -1.5,  1.5 ],
      [ -31.4,  0.0,  0.0 ],
      [ -31.4, +1.5, -1.5 ],
      [   0.0, -1.5,  1.5 ],
      [   0.0,  0.0,  0.0 ],
      [   0.0, +1.5,  0.0 ],
      [ +31.4, -1.5,  1.5 ],
      [ +31.4,  0.0,  0.0 ],
      [ +31.4, +1.5,  1.5 ],
      [   2.0,  1.0,  1.0 ],
      [  -2.0,  1.0, -1.0 ],
    ]);
  });
  it("fold2", function() {
    testCase(this, [
      [ -31.4, -1.5, -1.6 ],
      [ -31.4,  0.0,  0.0 ],
      [ -31.4, +1.5, -1.4 ],
      [   0.0, -1.5, -3.0 ],
      [   0.0,  0.0,  0.0 ],
      [   0.0, +1.5,  0.0 ],
      [ +31.4, -1.5, -4.4 ],
      [ +31.4,  0.0,  0.0 ],
      [ +31.4, +1.5,  1.4 ],
      [   2.0,  1.0,  0.0 ],
      [  -2.0,  1.0,  0.0 ],
    ], { closeTo: 1e-6 });
  });
  it("wrap2", function() {
    testCase(this, [
      [ -31.4, -1.5, -1.4 ],
      [ -31.4,  0.0,  0.0 ],
      [ -31.4, +1.5, -1.4 ],
      [   0.0, -1.5,  0.0 ],
      [   0.0,  0.0,  0.0 ],
      [   0.0, +1.5,  0.0 ],
      [ +31.4, -1.5,  1.4 ],
      [ +31.4,  0.0,  0.0 ],
      [ +31.4, +1.5,  1.4 ],
      [   2.0,  1.0,  0.0 ],
      [  -2.0,  1.0,  0.0 ],
    ], { closeTo: 1e-6 });
  });
  it("excess", function() {
    testCase(this, [
      [ -31.4, -1.5, -32.9 ],
      [ -31.4,  0.0, -31.4 ],
      [ -31.4, +1.5, -29.9 ],
      [   0.0, -1.5,  -1.5 ],
      [   0.0,  0.0,   0.0 ],
      [   0.0, +1.5,   0.0 ],
      [ +31.4, -1.5,  29.9 ],
      [ +31.4,  0.0,  31.4 ],
      [ +31.4, +1.5,  29.9 ],
    ]);
  });
  it("firstArg", function() {
    testCase(this, [
      [ 1, 0, 1 ],
      [ 2, 0, 2 ],
    ]);
  });
  it("rrand", function() {
    testCase(this, [
      [ 1, 2, 1.8575514554977 ],
    ], { randSeed: 0, closeTo: 1e-6 });
  });
  it("exprand", function() {
    testCase(this, [
      [ 1, 2, 1.8119605359594 ],
    ], { randSeed: 0, closeTo: 1e-6 });
  });
  it("clip", function() {
    testCase(this, [
      [ -20, -1, 2, -1 ],
      [ -15, -1, 2, -1 ],
      [ -10, -1, 2, -1 ],
      [  -5, -1, 2, -1 ],
      [  -4, -1, 2, -1 ],
      [  -3, -1, 2, -1 ],
      [  -2, -1, 2, -1 ],
      [  -1, -1, 2, -1 ],
      [   0, -1, 2,  0 ],
      [   1, -1, 2,  1 ],
      [   2, -1, 2,  2 ],
      [   3, -1, 2,  2 ],
      [   4, -1, 2,  2 ],
      [   5, -1, 2,  2 ],
      [  10, -1, 2,  2 ],
      [  15, -1, 2,  2 ],
      [  20, -1, 2,  2 ],
    ]);
  });
  it("iwrap", function() {
    testCase(this, [
      [ -20, -1, 2,  0 ],
      [ -15, -1, 2,  1 ],
      [ -10, -1, 2,  2 ],
      [  -5, -1, 2, -1 ],
      [  -4, -1, 2,  0 ],
      [  -3, -1, 2,  1 ],
      [  -2, -1, 2,  2 ],
      [  -1, -1, 2, -1 ],
      [   0, -1, 2,  0 ],
      [   1, -1, 2,  1 ],
      [   2, -1, 2,  2 ],
      [   3, -1, 2, -1 ],
      [   4, -1, 2,  0 ],
      [   5, -1, 2,  1 ],
      [  10, -1, 2,  2 ],
      [  15, -1, 2, -1 ],
      [  20, -1, 2,  0 ],
    ]);
  });
  it("wrap", function() {
    testCase(this, [
      [ +0.0, -0.2, -0.2, -0.2 ],
      [ -0.2, -0.2, +0.2, -0.2 ],
      [ +0.2, -0.2, +0.2, -0.2 ],
      [ +1.0, -0.8, +0.8, -0.6 ],
      [ +3.0, -0.8, +0.8, -0.2 ],
      [ -1.0, -0.8, +0.8, +0.6 ],
      [ -3.0, -0.8, +0.8, +0.2 ],
      [ -0.0, -0.8, +0.8, -0.0 ],
      [ +9.1, -0.2, +0.2, -0.1 ],
    ], { closeTo: 1e-6 });
  });
  it("ifold", function() {
    testCase(this, [
      [ -20, -1, 2,  0 ],
      [ -15, -1, 2,  1 ],
      [ -10, -1, 2,  2 ],
      [  -5, -1, 2,  1 ],
      [  -4, -1, 2,  2 ],
      [  -3, -1, 2,  1 ],
      [  -2, -1, 2,  0 ],
      [  -1, -1, 2, -1 ],
      [   0, -1, 2,  0 ],
      [   1, -1, 2,  1 ],
      [   2, -1, 2,  2 ],
      [   3, -1, 2,  1 ],
      [   4, -1, 2,  0 ],
      [   5, -1, 2, -1 ],
      [  10, -1, 2,  0 ],
      [  15, -1, 2,  1 ],
      [  20, -1, 2,  2 ],
    ]);
  });
  it("fold", function() {
    testCase(this, [
      [ +0.0, -0.2, -0.2, -0.2 ],
      [ -0.2, -0.2, +0.2, -0.2 ],
      [ +0.2, -0.2, +0.2, +0.2 ],
      [ +1.0, -0.8, +0.8, +0.6 ],
      [ +3.0, -0.8, +0.8, -0.2 ],
      [ -1.0, -0.8, +0.8, -0.6 ],
      [ -3.0, -0.8, +0.8, +0.2 ],
      [ -0.2, -0.8, +0.8, -0.2 ],
      [ +9.1, -0.2, +0.2, +0.1 ],
    ], { closeTo: 1e-6 });
  });
  it("clip_idx", function() {
    testCase(this, [
      [ -4, 4, 0 ],
      [ -3, 4, 0 ],
      [ -2, 4, 0 ],
      [ -1, 4, 0 ],
      [  0, 4, 0 ],
      [  1, 4, 1 ],
      [  2, 4, 2 ],
      [  3, 4, 3 ],
      [  4, 4, 3 ],
    ]);
  });
  it("wrap_idx", function() {
    testCase(this, [
      [ -4, 4, 0 ],
      [ -3, 4, 1 ],
      [ -2, 4, 2 ],
      [ -1, 4, 3 ],
      [  0, 4, 0 ],
      [  1, 4, 1 ],
      [  2, 4, 2 ],
      [  3, 4, 3 ],
      [  4, 4, 0 ],
    ]);
  });
  it("fold_idx", function() {
    testCase(this, [
      [ -4, 4, 2 ],
      [ -3, 4, 3 ],
      [ -2, 4, 2 ],
      [ -1, 4, 1 ],
      [  0, 4, 0 ],
      [  1, 4, 1 ],
      [  2, 4, 2 ],
      [  3, 4, 3 ],
      [  4, 4, 2 ],
    ]);
  });
});