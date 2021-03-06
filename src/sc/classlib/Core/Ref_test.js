describe("Core/Ref", function() {
  "use strict";

  var $$ = sc.test.object;
  var $  = sc.lang.$;
  var SCRef = $("Ref");

  describe("SCRef", function() {
    before(function() {
      this.createInstance = function(value) {
        return SCRef.new(value || $$(null));
      };
    });

    it("#valueOf", function() {
      var instance, test;
      var $value = $$();

      instance = this.createInstance($value);

      test = instance.valueOf();
      expect(test).to.equal($value);
    });

    it("<>value", function() {
      var instance, test;
      var $value = $$();

      instance = this.createInstance($value);

      test = instance.value_($$(null));
      expect(test).to.equal(instance);

      test = instance.value();
      expect(test).to.be.a("SCNil");
    });

    it(".new", function() {
      expect(function() {
        SCRef.new();
      }).to.not.throw();
    });

    it("#set", function() {
      var instance, test;

      instance = this.createInstance();

      test = instance.set();
      expect(test).to.equal(instance);
      expect(test._$value).to.be.a("SCNil");
    });

    it("#get", function() {
      var instance, test;
      var $value = $$();

      instance = this.createInstance($value);

      test = instance.get();
      expect(test).to.equal($value);
    });

    it("#dereference", function() {
      var instance, test;
      var $value = $$();

      instance = this.createInstance($value);

      test = instance.dereference();
      expect(test).to.equal($value);
    });

    it("#asRef", function() {
      var instance = this.createInstance();
      expect(instance.asRef).to.doNothing;
    });

    it("#valueArray", function() {
      var instance, test;
      var $value = $$();

      instance = this.createInstance($value);

      test = instance.valueArray();
      expect(test).to.equal($value);
    });

    it("#valueEnvir", function() {
      var instance, test;
      var $value = $$();

      instance = this.createInstance($value);

      test = instance.valueEnvir();
      expect(test).to.equal($value);
    });

    it("#valueArrayEnvir", function() {
      var instance, test;
      var $value = $$();

      instance = this.createInstance($value);

      test = instance.valueArrayEnvir();
      expect(test).to.equal($value);
    });

    it("#next", function() {
      var instance, test;
      var $value = $$();

      instance = this.createInstance($value);

      test = instance.next();
      expect(test).to.equal($value);
    });

    it("#asUGenInput", function() {
      var instance;

      instance = this.createInstance();
      expect(instance.asUGenInput).to.doNothing;
    });
    it.skip("#printOn", function() {
    });
    it.skip("#storeOn", function() {
    });

    it("#at", sinon.test(function() {
      var instance, test;
      var $value = $$({
        at: this.spy(sc.test.func())
      });

      instance = this.createInstance($value);

      test = instance.at(1);
      expect($value.at).to.be.calledWith(1);
      expect($value.at).to.be.calledLastIn(test);
    }));

    it("#put", sinon.test(function() {
      var instance, test;
      var $value = $$({
        put: this.spy(sc.test.func())
      });

      instance = this.createInstance($value);

      test = instance.put(1, 2);
      expect($value.put).to.be.calledWith(1, 2);
      expect($value.put).to.be.calledLastIn(test);
    }));
    it.skip("#seq", function() {
    });
    it.skip("#asControlInput", function() {
    });
    it.skip("#asBufWithValues", function() {
    });
    it.skip("#multichannelExpandRef", function() {
    });
  });

});
