(function(global) {
  "use strict";

  var C = {
    TAG_OBJ: 0,
    TAG_INT: 1,
    TAG_FLOAT: 2,
    TAG_SYM: 3,
    TAG_CHAR: 4,
    TAG_NIL: 5,
    TAG_BOOL: 6,
    TAG_STR: 7,
    TAG_FUNC: 8,
    TAG_ROUTINE: 9,

    STATE_INIT: 0,
    STATE_RUNNING: 3,
    STATE_SUSPENDED: 5,
    STATE_DONE: 6,
    STATE_BREAK: -1,

    NOP: 1,
    NIL: 2,
    TRUE: 3,
    FALSE: 4,

    ERRID_SUBCLASS_RESPONSIBILITY: 1,
    ERRID_DOES_NOT_UNDERSTAND: 2,
    ERRID_SHOULD_NOT_IMPLEMENT: 3,
    ERRID_NOT_YET_IMPLEMENTED: 4,
    ERRID_NOT_SUPPORTED: 5,
    ERRID_SHOULD_USE_LITERALS: 6
  };

  if (typeof global.sc !== "undefined") {
    Object.keys(C).forEach(function(key) {
      global.sc[key] = C[key];
    });
  }
  if (typeof module !== "undefined") {
    module.exports = C;
  }
})(this.self || global);
