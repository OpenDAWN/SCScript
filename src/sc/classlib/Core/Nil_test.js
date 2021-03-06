describe("Core/Nil", function() {
  "use strict";

  var $$ = sc.test.object;
  var $  = sc.lang.$;
  var SCNil = $("Nil");

  describe("SCNil", function() {
    before(function() {
      this.createInstance = function() {
        return $.Nil();
      };
    });

    it("#__tag", function() {
      var instance, test;

      instance = this.createInstance();

      test = instance.__tag;
      expect(test).to.be.a("JSNumber").that.equals(sc.TAG_NIL);
    });

    it("#__num__", function() {
      var instance, test;

      instance = this.createInstance();
      test = instance.__num__();
      expect(test).to.be.a("JSNumber").that.equals(0);
    });

    it("#__bool__", function() {
      var instance, test;

      instance = this.createInstance();
      test = instance.__bool__();
      expect(test).to.be.a("JSBoolean").that.is.false;
    });

    it("#__sym__", function() {
      var instance, test;

      instance = this.createInstance();
      test = instance.__sym__();
      expect(test).to.be.a("JSString").that.equals("nil");
    });

    it("#toString", function() {
      var instance, test;

      instance = this.createInstance();
      test = instance.toString();
      expect(test).to.be.a("JSString").that.equals("nil");
    });

    it(".new", function() {
      expect(SCNil.new.__errorType).to.equal(sc.ERRID_SHOULD_USE_LITERALS);
    });

    it("#isNil", function() {
      var instance, test;

      instance = this.createInstance();
      test = instance.isNil();
      expect(test).to.be.a("SCBoolean").that.is.true;
    });

    it("#notNil", function() {
      var instance, test;

      instance = this.createInstance();
      test = instance.notNil();
      expect(test).to.be.a("SCBoolean").that.is.false;
    });

    it("#?", function() {
      var instance, test;
      var $obj = $$();

      instance = this.createInstance();

      test = instance ["?"] ($obj);
      expect(test).to.equal($obj);
    });

    it("#??", function() {
      var instance, test;
      var $obj = $$({ value: sc.test.func() });

      instance = this.createInstance();

      test = instance ["??"] ($obj);
      expect($obj.value).to.be.calledLastIn(test);
    });

    it("#!?", function() {
      var instance;

      instance = this.createInstance();
      expect(instance["!?"]).to.doNothing;
    });

    it("#asBoolean", function() {
      var instance, test;

      instance = this.createInstance();

      test = instance.asBoolean();
      expect(test).to.be.a("SCBoolean").that.is.false;
    });

    it("#booleanValue", function() {
      var instance, test;

      instance = this.createInstance();

      test = instance.booleanValue();
      expect(test).to.be.a("SCBoolean").that.is.false;
    });

    it("#push", function() {
      var instance, test;
      var $function = $$({ value: sc.test.func() });

      instance = this.createInstance();

      test = instance.push($function);
      expect($function.value).to.be.calledLastIn(test);
    });

    it("#appendStream", function() {
      var instance, test;
      var $stream = $$();

      instance = this.createInstance();

      test = instance.appendStream($stream);
      expect(test).to.equal($stream);
    });

    it("#pop", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.pop).to.doNothing;
    });

    it("#source", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.source).to.doNothing;
    });

    it("#source_", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.source_).to.doNothing;
    });

    it("#rate", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.rate).to.doNothing;
    });

    it("#numChannels", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.numChannels).to.doNothing;
    });

    it("#isPlaying", function() {
      var instance, test;

      instance = this.createInstance();

      test = instance.isPlaying();
      expect(test).to.be.a("SCBoolean").that.is.false;
    });

    it("#do", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.do).to.doNothing;
    });

    it("#reverseDo", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.reverseDo).to.doNothing;
    });

    it("#pairsDo", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.pairsDo).to.doNothing;
    });

    it("#collect", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.collect).to.doNothing;
    });

    it("#select", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.select).to.doNothing;
    });

    it("#reject", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.reject).to.doNothing;
    });

    it("#detect", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.detect).to.doNothing;
    });

    it("#collectAs", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.collectAs).to.doNothing;
    });

    it("#selectAs", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.selectAs).to.doNothing;
    });

    it("#rejectAs", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.rejectAs).to.doNothing;
    });

    it("#dependants", sinon.test(function() {
      var instance, test;
      var SCIdentitySet$new = this.spy(sc.test.func());

      instance = this.createInstance();
      this.stub(sc.lang.klass, "get").withArgs("IdentitySet").returns($$({
        new: SCIdentitySet$new
      }));

      test = instance.dependants();
      expect(SCIdentitySet$new).to.be.calledLastIn(test);
    }));

    it("#changed", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.changed).to.doNothing;
    });

    it("#addDependant", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.addDependant).to.doNothing;
    });

    it("#removeDependant", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.removeDependant).to.doNothing;
    });

    it("#release", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.release).to.doNothing;
    });

    it("#update", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.update).to.doNothing;
    });

    it("#transformEvent", function() {
      var instance, test;
      var $event = $$();

      instance = this.createInstance();

      test = instance.transformEvent($event);
      expect(test).to.equal($event);
    });

    it("#awake", function() {
      var instance, test;

      instance = this.createInstance();

      test = instance.awake();
      expect(test).to.be.a("SCNil");
    });

    it("#play", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.play).to.doNothing;
    });

    it("#nextTimeOnGrid", sinon.test(function() {
      var instance, test;
      var $clock = $$(null);

      instance = this.createInstance();

      test = instance.nextTimeOnGrid($clock);
      expect(test).to.be.a("SCNil");

      $clock = $$();
      $clock.nextTimeOnGrid = this.spy(sc.test.func());

      test = instance.nextTimeOnGrid($clock);
      expect(test).to.be.a("SCFunction");
      expect($clock.nextTimeOnGrid).to.be.not.called;

      test = test.value();
      expect($clock.nextTimeOnGrid).to.be.calledLastIn(test);
    }));

    it("#asQuant", sinon.test(function() {
      var instance, test;
      var SCQuant$default = this.spy(sc.test.func());

      instance = this.createInstance();
      this.stub(sc.lang.klass, "get").withArgs("Quant").returns($$({
        default: SCQuant$default
      }));

      test = instance.asQuant();
      expect(SCQuant$default).to.be.calledLastIn(test);
    }));

    it("#swapThisGroup", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.swapThisGroup).to.doNothing;
    });

    it("#performMsg", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.swapThisGroup).to.doNothing;
    });

    it("printOn", sinon.test(function() {
      var instance, test;
      var $stream = $$({
        putAll: this.spy()
      });

      instance = this.createInstance();

      test = instance.printOn($stream);
      expect($stream.putAll.args[0]).to.deep.equal($$([ "nil" ])._);
      expect(test).to.equal(instance);
    }));

    it("storeOn", sinon.test(function() {
      var instance, test;
      var $stream = $$({
        putAll: this.spy()
      });

      instance = this.createInstance();

      test = instance.storeOn($stream);
      expect($stream.putAll.args[0]).to.deep.equal($$([ "nil" ])._);
      expect(test).to.equal(instance);
    }));

    it("#matchItem", function() {
      var instance, test;

      instance = this.createInstance();
      test = instance.matchItem();
      expect(test).to.be.a("SCBoolean").that.is.true;
    });

    it("#add", function() {
      var instance, test;
      var $value = $$();

      instance = this.createInstance();

      test = instance.add($value);
      expect(test).to.be.a("SCArray").that.deep.equal([ $value ]);
    });

    it("#addAll", function() {
      var instance, test;
      var $array = $$();

      instance = this.createInstance();

      test = instance.addAll($array);
      expect(test).to.be.a("SCArray").that.deep.equal([ $array ]);
    });

    it("#++", function() {
      var instance, test;
      var $array = $$();

      instance = this.createInstance();

      test = instance ["++"] ($array);
      expect(test).to.be.a("SCArray").that.deep.equal([ $array ]);
    });

    it("#asCollection", function() {
      var instance, test;

      instance = this.createInstance();

      test = instance.asCollection();
      expect(test).to.be.a("SCArray").that.deep.equal([]);
    });

    it("#remove", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.remove).to.doNothing;
    });

    it("#set", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.set).to.doNothing;
    });

    it("#get", function() {
      var instance, test;
      var $prevVal = $$();

      instance = this.createInstance();

      test = instance.get($prevVal);
      expect(test).to.equal($prevVal);
    });

    it("#addFunc", sinon.test(function() {
      var instance, test, stub;
      var $arg1 = $$();
      var $arg2 = $$();
      var $arg3 = $$();

      instance = this.createInstance();
      stub = this.stub(sc.lang.klass, "get");
      stub.withArgs("FunctionList").returns($$({
        new: function(arg) {
          return arg;
        }
      }));

      test = instance.addFunc($arg1);
      expect(stub).to.be.not.called;
      expect(test).to.equal($arg1);

      instance = this.createInstance();
      test = instance.addFunc($arg1, $arg2, $arg3);
      expect(stub).to.be.called;
      expect(test).to.be.a("SCArray").that.deep.equal([ $arg1, $arg2, $arg3 ]);
    }));

    it("#removeFunc", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.removeFunc).to.doNothing;
    });

    it("#replaceFunc", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.replaceFunc).to.doNothing;
    });

    it("#seconds_", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.seconds_).to.doNothing;
    });

    it("#throw", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.throw).to.doNothing;
    });
    it.skip("#handleError", function() {
    });

    it("#archiveAsCompileString", function() {
      var instance, test;

      instance = this.createInstance();
      test = instance.archiveAsCompileString();
      expect(test).to.be.a("SCBoolean").that.is.true;
    });

    it("#asSpec", sinon.test(function() {
      var instance, test;
      var SCControlSpec$new = this.spy(sc.test.func());

      instance = this.createInstance();
      this.stub(sc.lang.klass, "get").withArgs("ControlSpec").returns($$({
        new: SCControlSpec$new
      }));

      test = instance.asSpec();
      expect(SCControlSpec$new).to.be.calledLastIn(test);
    }));

    it("#superclassesDo", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.superclassesDo).to.doNothing;
    });

    it("#shallowCopy", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.shallowCopy).to.doNothing;
    });
  });

});
