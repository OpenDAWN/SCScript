SCScript.install(function(sc) {
  "use strict";

  require("./Stream");

  var $ = sc.lang.$;
  var $nil = $.nil;

  sc.lang.klass.define("UnaryOpStream : Stream", function(builder, _) {
    builder.addClassMethod("new", function($operator, $a) {
      return _.newCopyArgs(this, {
        operator: $operator,
        a: $a
      });
    });

    builder.addMethod("next", {
      args: "inval"
    }, function($inval) {
      var $vala;

      $vala = this._$a.next($inval);
      if ($vala === $nil) {
        return $nil;
      }

      return $vala.perform(this._$operator);
    });

    builder.addMethod("reset", function() {
      this._$a.reset();
      return this;
    });
    // TODO: implements storeOn
  });

  sc.lang.klass.define("BinaryOpStream : Stream", function(builder, _) {
    builder.addClassMethod("new", function($operator, $a, $b) {
      return _.newCopyArgs(this, {
        operator: $operator,
        a: $a,
        b: $b
      });
    });

    builder.addMethod("next", {
      args: "inval"
    }, function($inval) {
      var $vala, $valb;

      $vala = this._$a.next($inval);
      if ($vala === $nil) {
        return $nil;
      }

      $valb = this._$b.next($inval);
      if ($valb === $nil) {
        return $nil;
      }

      return $vala.perform(this._$operator, $valb);
    });

    builder.addMethod("reset", function() {
      this._$a.reset();
      this._$b.reset();
      return this;
    });
    // TODO: implements storeOn
  });

  sc.lang.klass.define("BinaryOpXStream : Stream", function(builder, _) {
    builder.addMethod("__init__", function() {
      this.__super__("__init__");
      this._$vala = $nil;
    });

    builder.addClassMethod("new", function($operator, $a, $b) {
      return _.newCopyArgs(this, {
        operator: $operator,
        a: $a,
        b: $b
      });
    });

    builder.addMethod("next", {
      args: "inval"
    }, function($inval) {
      var $valb;

      if (this._$vala === $nil) {
        this._$vala = this._$a.next($inval);
        if (this._$vala === $nil) {
          return $nil;
        }
        $valb = this._$b.next($inval);
        if ($valb === $nil) {
          return $nil;
        }
      } else {
        $valb = this._$b.next($inval);
        if ($valb === $nil) {
          this._$vala = this._$a.next($inval);
          if (this._$vala === $nil) {
            return $nil;
          }
          this._$b.reset();
          $valb = this._$b.next($inval);
          if ($valb === $nil) {
            return $nil;
          }
        }
      }

      return this._$vala.perform(this._$operator, $valb);
    });

    builder.addMethod("reset", function() {
      this._$vala = $nil;
      this._$a.reset();
      this._$b.reset();
      return this;
    });
    // TODO: implements storeOn
  });

  sc.lang.klass.define("NAryOpStream : Stream", function(builder, _) {
    var $nil = $.nil;

    builder.addClassMethod("new", function($operator, $a, $arglist) {
      return _.newCopyArgs(this, {
        operator: $operator,
        a: $a
      }).arglist_($arglist);
    });

    builder.addMethod("arglist_", function($list) {
      this._arglist = Array.isArray($list._) ? $list._ : /* istanbul ignore next */ [];
      this._isNumeric = this._arglist.every(function($item) {
        return $item.__tag === sc.TAG_SYM || $item.isNumber().__bool__();
      });
      return this;
    });

    builder.addMethod("next", {
      args: "inval"
    }, function($inval) {
      var $vala, $break;
      var values;

      $vala = this._$a.next($inval);
      if ($vala === $nil) {
        return $nil;
      }

      if (this._isNumeric) {
        values = this._arglist;
      } else {
        values = this._arglist.map(function($item) {
          var $res;

          $res = $item.next($inval);
          if ($res === $nil) {
            $break = $nil;
            return $nil;
          }

          return $res;
        });
        if ($break) {
          return $break;
        }
      }

      return $vala.perform.apply($vala, [ this._$operator ].concat(values));
    });

    builder.addMethod("reset", function() {
      this._$a.reset();
      this._arglist.forEach(function($item) {
        $item.reset();
      });
      return this;
    });
    // TODO: implements storeOn
  });
});
