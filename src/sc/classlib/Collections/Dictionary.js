SCScript.install(function(sc) {
  "use strict";

  require("./Association");
  require("./Set");

  var slice = [].slice;
  var $  = sc.lang.$;
  var fn = sc.lang.fn;

  sc.lang.klass.refine("Dictionary", function(spec, utils) {
    var $nil   = utils.$nil;
    var $true  = utils.$true;
    var $false = utils.$false;
    var $int_1 = utils.$int_1;
    var SCSet  = $("Set");
    var SCArray = $("Array");
    var SCAssociation = $("Association");

    spec.$new = fn(function($n) {
      return this.__super__("new", [ $n ]);
    }, "n=8");

    spec.valueOf = function() {
      var obj;
      var array, i, imax;

      obj = {};

      array = this._$array._;
      for (i = 0, imax = array.length; i < imax; i += 2) {
        if (array[i] !== $nil) {
          obj[array[i].valueOf()] = array[i + 1].valueOf();
        }
      }

      return obj;
    };

    spec.$newFrom = fn(function($aCollection) {
      var $newCollection;

      $newCollection = this.new($aCollection.size());
      $aCollection.$("keysValuesDo", [ $.Function(function() {
        return [ function($k, $v) {
          $newCollection.put($k, $v);
        } ];
      }) ]);

      return $newCollection;
    }, "aCollection");

    spec.at = fn(function($key) {
      return this._$array.at(this.scanFor($key).__inc__());
    }, "key");

    spec.atFail = fn(function($key, $function) {
      var $val;

      $val = this.at($key);
      if ($val === $nil) {
        $val = $function.value();
      }

      return $val;
    }, "key; function");

    spec.matchAt = fn(function($key) {
      var ret = null;

      this.keysValuesDo($.Function(function() {
        return [ function($k, $v) {
          if ($k.matchItem($key).__bool__()) {
            ret = $v;
            this.break();
          }
        } ];
      }));

      return ret || $nil;
    }, "key");

    spec.trueAt = fn(function($key) {
      var $ret;

      $ret = this.at($key);

      return $ret !== $nil ? $ret : $false;
    }, "key");

    spec.add = fn(function($anAssociation) {
      this.put($anAssociation.$("key"), $anAssociation.$("value"));
      return this;
    }, "anAssociation");

    spec.put = fn(function($key, $value) {
      var $array, $index;

      if ($value === $nil) {
        this.removeAt($key);
      } else {
        $array = this._$array;
        $index = this.scanFor($key);
        $array.put($index.__inc__(), $value);
        if ($array.at($index) === $nil) {
          $array.put($index, $key);
          this._incrementSize();
        }
      }

      return this;
    }, "key; value");

    spec.putAll = function() {
      var $this = this;
      var func;

      func = $.Function(function() {
        return [ function($key, $value) {
          $this.put($key, $value);
        } ];
      });

      slice.call(arguments).forEach(function($dict) {
        $dict.keysValuesDo(func);
      }, this);

      return this;
    };

    spec.putPairs = fn(function($args) {
      var $this = this;

      $args.$("pairsDo", [ $.Function(function() {
        return [ function($key, $val) {
          $this.put($key, $val);
        } ];
      }) ]);

      return this;
    }, "args");

    spec.getPairs = fn(function($args) {
      var $this = this;
      var $result;

      if ($args === $nil) {
        $args = this.keys();
      }

      $result = $nil;
      $args.do($.Function(function() {
        return [ function($key) {
          var $val;
          $val = $this.at($key);
          if ($val !== $nil) {
            $result = $result.add($key).add($val);
          }
        } ];
      }));

      return $result;
    }, "args");

    spec.associationAt = fn(function($key) {
      var $res;
      var array, index;

      array = this._$array._;
      index = this.scanFor($key).__int__();

      /* istanbul ignore else */
      if (index >= 0) {
        $res = SCAssociation.new(array[index], array[index + 1]);
      }

      return $res || /* istanbul ignore next */ $nil;
    }, "key");

    spec.associationAtFail = fn(function($argkey, $function) {
      var $index, $key;

      $index = this.scanFor($argkey);
      $key   = this._$array.at($index);

      if ($key === $nil) {
        return $function.value();
      }

      return SCAssociation.new($key, this._$array.at($index.__inc__()));
    }, "argKey; function");

    spec.keys = fn(function($species) {
      var $set;

      if ($species === $nil) {
        $species = SCSet;
      }

      $set = $species.new(this.size());
      this.keysDo($.Function(function() {
        return [ function($key) {
          $set.add($key);
        } ];
      }));

      return $set;
    }, "species");

    spec.values = function() {
      var $list;

      $list = $("List").new(this.size());
      this.do($.Function(function() {
        return [ function($value) {
          $list.add($value);
        } ];
      }));

      return $list;
    };

    spec.includes = fn(function($item1) {
      var $ret = null;

      this.do($.Function(function() {
        return [ function($item2) {
          if ($item1 ["=="] ($item2).__bool__()) {
            $ret = $true;
            this.break();
          }
        } ];
      }));

      return $ret || $false;
    }, "item1");

    spec.includesKey = fn(function($key) {
      return this.at($key).notNil();
    }, "key");

    spec.removeAt = fn(function($key) {
      var $array;
      var $val, $index, $atKeyIndex;

      $array = this._$array;
      $index = this.scanFor($key);
      $atKeyIndex = $array.at($index);
      if ($atKeyIndex === $nil) {
        return $nil;
      }

      $val = $array.at($index.__inc__());
      $array.put($index, $nil);
      $array.put($index.__inc__(), $nil);

      this._size -= 1;

      // this.fixCollisionsFrom($index);

      return $val;
    }, "key");

    spec.removeAtFail = fn(function($key, $function) {
      var $array;
      var $val, $index, $atKeyIndex;

      $array = this._$array;
      $index = this.scanFor($key);
      $atKeyIndex = $array.at($index);

      if ($atKeyIndex === $nil) {
        return $function.value();
      }

      $val = $array.at($index.__inc__());
      $array.put($index, $nil);
      $array.put($index.__inc__(), $nil);

      this._size -= 1;

      // this.fixCollisionsFrom($index);

      return $val;
    }, "key; function");

    spec.remove = function() {
      throw new Error("shouldNotImplement");
    };

    spec.removeFail = function() {
      throw new Error("shouldNotImplement");
    };

    spec.keysValuesDo = fn(function($function) {
      this.keysValuesArrayDo(this._$array, $function);
      return this;
    }, "function");

    spec.keysValuesChange = fn(function($function) {
      var $this = this;

      this.keysValuesDo($.Function(function() {
        return [ function($key, $value, $i) {
          $this.put($key, $function.value($key, $value, $i));
        } ];
      }));

      return this;
    }, "function");

    spec.do = fn(function($function) {
      this.keysValuesDo($.Function(function() {
        return [ function($key, $value, $i) {
          $function.value($value, $i);
        } ];
      }));
      return this;
    }, "function");

    spec.keysDo = fn(function($function) {
      this.keysValuesDo($.Function(function() {
        return [ function($key, $val, $i) {
          $function.value($key, $i);
        } ];
      }));
      return this;
    }, "function");

    spec.associationsDo = fn(function($function) {
      this.keysValuesDo($.Function(function() {
        return [ function($key, $val, $i) {
          var $assoc = SCAssociation.new($key, $val);
          $function.value($assoc, $i);
        } ];
      }));
      return this;
    }, "function");

    spec.pairsDo = fn(function($function) {
      this.keysValuesArrayDo(this._$array, $function);
      return this;
    }, "function");

    spec.collect = fn(function($function) {
      var $res;

      $res = this.class().new(this.size());
      this.keysValuesDo($.Function(function() {
        return [ function($key, $elem) {
          $res.put($key, $function.value($elem, $key));
        } ];
      }));

      return $res;
    }, "function");

    spec.select = fn(function($function) {
      var $res;

      $res = this.class().new(this.size());
      this.keysValuesDo($.Function(function() {
        return [ function($key, $elem) {
          if ($function.value($elem, $key).__bool__()) {
            $res.put($key, $elem);
          }
        } ];
      }));

      return $res;
    }, "function");

    spec.reject = fn(function($function) {
      var $res;

      $res = this.class().new(this.size());
      this.keysValuesDo($.Function(function() {
        return [ function($key, $elem) {
          if (!$function.value($elem, $key).__bool__()) {
            $res.put($key, $elem);
          }
        } ];
      }));

      return $res;
    }, "function");

    spec.invert = function() {
      var $dict;

      $dict = this.class().new(this.size());
      this.keysValuesDo($.Function(function() {
        return [ function($key, $val) {
          $dict.put($val, $key);
        } ];
      }));

      return $dict;
    };

    spec.merge = fn(function($that, $func, $fill) {
      var $this = this;
      var $commonKeys, $myKeys, $otherKeys;
      var $res;

      $res = this.class().new();

      $myKeys    = this.keys();
      $otherKeys = $that.keys();

      if ($myKeys ["=="] ($otherKeys).__bool__()) {
        $commonKeys = $myKeys;
      } else {
        $commonKeys = $myKeys.sect($otherKeys);
      }

      $commonKeys.do($.Function(function() {
        return [ function($key) {
          $res.put($key, $func.value($this.at($key), $that.at($key), $key));
        } ];
      }));

      if ($fill.__bool__()) {
        $myKeys.difference($otherKeys).do($.Function(function() {
          return [ function($key) {
            $res.put($key, $this.at($key));
          } ];
        }));
        $otherKeys.difference($myKeys).do($.Function(function() {
          return [ function($key) {
            $res.put($key, $that.at($key));
          } ];
        }));
      }

      return $res;
    }, "that; func; fill=true");

    // TODO: implements blend

    spec.findKeyForValue = fn(function($argValue) {
      var $ret = null;

      this.keysValuesArrayDo(this._$array, $.Function(function() {
        return [ function($key, $val) {
          if ($argValue ["=="] ($val).__bool__()) {
            $ret = $key;
            this.break();
          }
        } ];
      }));

      return $ret || $nil;
    }, "argValue");

    spec.sortedKeysValuesDo = fn(function($function, $sortFunc) {
      var $this = this;
      var $keys;

      $keys = this.keys(SCArray);
      $keys.sort($sortFunc);

      $keys.do($.Function(function() {
        return [ function($key, $i) {
          $function.value($key, $this.at($key), $i);
        } ];
      }));

      return this;
    }, "$function; $sortFunc");

    spec.choose = function() {
      var $array;
      var $size, $index;

      if (this.isEmpty().__bool__()) {
        return $nil;
      }

      $array = this._$array;
      $size  = $array.size() [">>"] ($int_1);

      do {
        $index = $size.rand() ["<<"] ($int_1);
      } while ($array.at($index) === $nil);

      return $array.at($index.__inc__());
    };

    spec.order = fn(function($func) {
      var $assoc;

      if (this.isEmpty().__bool__()) {
        return $nil;
      }

      $assoc = $nil;
      this.keysValuesDo($.Function(function() {
        return [ function($key, $val) {
          $assoc = $assoc.add($key.$("->", [ $val ]));
        } ];
      }));

      return $assoc.sort($func).collect($.Function(function() {
        return [ function($_) {
          return $_.$("key");
        } ];
      }));
    }, "func");

    spec.powerset = function() {
      var $this = this;
      var $keys, $class;

      $keys  = this.keys().asArray().powerset();
      $class = this.class();

      return $keys.collect($.Function(function() {
        return [ function($list) {
          var $dict;

          $dict = $class.new();
          $list.do($.Function(function() {
            return [ function($key) {
              $dict.put($key, $this.at($key));
            } ];
          }));

          return $dict;
        } ];
      }));
    };

    spec.transformEvent = fn(function($event) {
      return $event.$("putAll", [ this ]);
    }, "event");

    // TODO: implements embedInStream
    // TODO: implements asSortedArray
    // TODO: implements asKeyValuePairs

    spec.keysValuesArrayDo = function($argArray, $function) {
      var $key, $val;
      var array, j, i, imax;

      array = this._$array._;
      for (i = j = 0, imax = array.length; i < imax; i += 2, ++j) {
        $key = array[i];
        if ($key !== $nil) {
          $val = $argArray.$("at", [ $.Integer(i + 1) ]);
          $function.value($key, $val, $.Integer(j));
        }
      }
    };

    // TODO: implements grow
    // TODO: implements fixCollisionsFrom

    /* istanbul ignore next */
    spec.scanFor = function($argKey) {
      var array, i, imax;
      var $elem;

      array = this._$array._;
      imax  = array.length;

      for (i = 0; i < imax; i += 2) {
        $elem = array[i];
        if ($elem ["=="] ($argKey).__bool__()) {
          return $.Integer(i);
        }
      }
      for (i = 0; i < imax; i += 2) {
        $elem = array[i];
        if ($elem === $nil) {
          return $.Integer(i);
        }
      }

      return $.Integer(-2);
    };

    // TODO: implements storeItemsOn
    // TODO: implements printItemsOn

    spec._incrementSize = function() {
      this._size += 1;
      if (this._$array.size().__inc__() < this._size * 4) {
        this.grow();
      }
    };
  });

  sc.lang.klass.refine("IdentityDictionary", function(spec, utils) {
    var $nil = utils.$nil;

    utils.setProperty(spec, "<>", "proto");
    utils.setProperty(spec, "<>", "parent");
    utils.setProperty(spec, "<>", "know");

    spec.$new = fn(function($n, $proto, $parent, $know) {
      return this.__super__("new", [ $n ])
        .proto_($proto).parent_($parent).know_($know);
    }, "n=8; proto; parent; know=false");

    spec.putGet = fn(function($key, $value) {
      var $array, $index, $prev;

      $array = this._$array;
      $index = this.scanFor($key);
      $prev  = $array.at($index.__inc__());
      $array.put($index.__inc__(), $value);
      if ($array.at($index) === $nil) {
        $array.put($index, $key);
        this._incrementSize();
      }

      return $prev;
    }, "key; value");

    spec.findKeyForValue = fn(function($argValue) {
      var $ret = null;

      this.keysValuesArrayDo(this._$array, $.Function(function() {
        return [ function($key, $val) {
          if ($argValue === $val) {
            $ret = $key;
            this.break();
          }
        } ];
      }));

      return $ret || $nil;
    }, "argValue");

    /* istanbul ignore next */
    spec.scanFor = function($argKey) {
      var array, i, imax;
      var $elem;

      array = this._$array._;
      imax  = array.length;

      for (i = 0; i < imax; i += 2) {
        $elem = array[i];
        if ($elem === $argKey) {
          return $.Integer(i);
        }
      }
      for (i = 0; i < imax; i += 2) {
        $elem = array[i];
        if ($elem === $nil) {
          return $.Integer(i);
        }
      }

      return $.Integer(-2);
    };

    // TODO: implements freezeAsParent
    // TODO: implements insertParent
    // TODO: implements storeItemsOn
    // TODO: implements doesNotUnderstand
    // TODO: implements nextTimeOnGrid
    // TODO: implements asQuant
    // TODO: implements timingOffset
  });

});
