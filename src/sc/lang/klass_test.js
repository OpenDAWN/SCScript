"use strict";

require("./klass");

var $SC = sc.lang.$SC;

describe("sc.lang.klass", function() {
  var Object, Class, SuperClass, SubClass;
  describe("define", function() {
    function SCSuperClass() {
      this.__initializeWith__("Object");
    }
    function SCSubClass() {
      this.__initializeWith__("SuperClass");
    }
    it("should register class", function() {
      expect(function() {
        sc.lang.klass.get("SuperClass");
      }).to.throw("class 'SuperClass' not registered.");

      sc.lang.klass.define("SuperClass", "Object", {
        constructor: SCSuperClass,
        $methodDefinedInSuperClass: function() {
          return "SuperClass.methodDefinedInSuperClass";
        },
        $methodOverriddenInSubClass: function() {
          return "SuperClass.methodOverriddenInSubClass";
        },
        methodDefinedInSuperClass: function() {
          return "SuperClass#methodDefinedInSuperClass";
        },
        methodOverriddenInSubClass: function() {
          return "SuperClass#methodOverriddenInSubClass";
        },
        NotYetImplemented: [
          "$notYetImplemented",
          "notYetImplemented"
        ]
      });

      expect(function() {
        sc.lang.klass.get("SuperClass");
      }).to.not.throw("class 'SuperClass' not registered.");
    });
    it("should throw error when invalid classname", function() {
      expect(function() {
        sc.lang.klass.define("superclass", "Object");
      }).to.throw("classname should be CamelCase, but got 'superclass'");
    });
    it("should throw error when not have constructor", function() {
      expect(function() {
        sc.lang.klass.define("NotHaveConstructor", "Object");
      }).to.throw("class 'NotHaveConstructor' must have constructor.");
    });
    it("should throw error when extend from not registered class", function() {
      expect(function() {
        sc.lang.klass.define("TestClass", "NotRegisteredClass", {
          constructor: function() {}
        });
      }).to.throw("superclass 'NotRegisteredClass' is not registered.");
    });
    it("should throw error when redefine", function() {
      sc.lang.klass.define("SubClass", "SuperClass", {
        constructor: SCSubClass
      });
      expect(function() {
        sc.lang.klass.define("SubClass", "SuperClass", {
          constructor: SCSubClass
        });
      }).to.throw("class 'SubClass' is already registered.");
    });
    it("should not throw error when redefine with option.force is true", function() {
      expect(function() {
        sc.lang.klass.define("SubClass", "SuperClass", {
          constructor: SCSubClass
        }, { force: true });
      }).to.not.throw("class 'SubClass' is already registered.");
    });
  });
  describe("refine", function() {
    it("should append class/instance methods", function() {
      sc.lang.klass.refine("SubClass", {
        $methodOverriddenInSubClass: function() {
          return "SubClass.methodOverriddenInSubClass";
        },
        methodOverriddenInSubClass: function() {
          return "SubClass#methodOverriddenInSubClass";
        }
      });
    });
    it("should throw error when given classname not registered", function() {
      expect(function() {
        sc.lang.klass.refine("NotRegisteredClass", {});
      }).to.throw("class 'NotRegisteredClass' is not registered.");
    });
    it("should error when re-define method", function() {
      expect(function() {
        sc.lang.klass.refine("SubClass", {
          $methodOverriddenInSubClass: function() {
            return "SubClass.methodOverriddenInSubClass";
          }
        });
      }).to.throw("SubClass.methodOverriddenInSubClass is already defined.");
      expect(function() {
        sc.lang.klass.refine("SubClass", {
          methodOverriddenInSubClass: function() {
            return "SubClass#methodOverriddenInSubClass";
          }
        });
      }).to.throw("SubClass#methodOverriddenInSubClass is already defined.");
    });
    it("should not throw error when re-defin method with option.force is true", function() {
      expect(function() {
        sc.lang.klass.refine("SubClass", {
          methodOverriddenInSubClass: function() {
            return "SubClass#methodOverriddenInSubClass";
          }
        }, { force: true });
      }).to.not.throw("SubClass#methodOverriddenInSubClass is already defined.");
    });
  });
  describe("Class", function() {
    before(function() {
      Object     = sc.lang.klass.get("Object");
      Class      = sc.lang.klass.get("Class");
      SuperClass = sc.lang.klass.get("SuperClass");
      SubClass   = sc.lang.klass.get("SubClass");
    });
    describe("#new", function() {
      it("should return instance", sinon.test(function() {
        var spy = this.spy($SC, "Boolean");
        var instance = SuperClass.new();
        var test = instance.isMemberOf(SuperClass);

        expect(spy).to.be.calledWith(true);
        expect(spy).to.be.returned(test);

        spy.restore();
      }));
    });
    describe("#name", function() {
      it("should return class name", sinon.test(function() {
        var spy = this.spy($SC, "String");
        var test = SubClass.name();

        expect(spy).to.be.calledWith("SubClass");
        expect(spy).to.be.returned(test);

        spy.restore();
      }));
    });
    describe("#class", function() {
      it("should return Meta_Class when receiver is Class", sinon.test(function() {
        var spy = this.spy($SC, "Boolean");
        var instance = SubClass.class();
        var test = instance.isKindOf(Class);

        expect(spy).to.be.calledWith(true);
        expect(spy).to.be.returned(test);

        spy.restore();
      }));
      it("should return Class when receiver is Meta_Class", sinon.test(function() {
        var spy = this.spy($SC, "Boolean");
        var instance = SubClass.class().class();
        var test = instance.isKindOf(Class);

        expect(spy).to.be.calledWith(true);
        expect(spy).to.be.returned(test);

        spy.restore();
      }));
    });
    describe("#isClass", function() {
      it("should return true", sinon.test(function() {
        var spy = this.spy($SC, "True");
        var test = SubClass.isClass();

        expect(spy).to.be.calledWith(undefined);
        expect(spy).to.be.returned(test);

        spy.restore();
      }));
    });
  });
  describe("Object", function() {
    describe("#class", function() {
      it("should return class", sinon.test(function() {
        var spy = this.spy($SC, "Boolean");
        var instance = SubClass.new().class();
        var test = instance.isKindOf(Class);

        expect(spy).to.be.calledWith(true);
        expect(spy).to.be.returned(test);

        spy.restore();
      }));
    });
    describe("#isClass", function() {
      it("should return true", sinon.test(function() {
        var spy = this.spy($SC, "False");
        var test = SubClass.new().isClass();

        expect(spy).to.be.calledWith(undefined);
        expect(spy).to.be.returned(test);

        spy.restore();
      }));
    });
    describe("#isKindOf", function() {
      it("should return true when receiver is instance of given class", sinon.test(function() {
        var spy = this.spy($SC, "Boolean");
        var test = SuperClass.new().isKindOf(SuperClass);

        expect(spy).to.be.calledWith(true);
        expect(spy).to.be.returned(test);

        spy.restore();
      }));
      it("should return false when receiver is not instance of given class", sinon.test(function() {
        var spy = this.spy($SC, "Boolean");
        var test = SuperClass.new().isKindOf(SubClass);

        expect(spy).to.be.calledWith(false);
        expect(spy).to.be.returned(test);

        spy.restore();
      }));
    });
    describe("#isMemberOf", function() {
      it("should return true when receiver is directly instance of given class",
        sinon.test(function() {
          var spy = this.spy($SC, "Boolean");
          var test = SubClass.new().isMemberOf(SubClass);

          expect(spy).to.be.calledWith(true);
          expect(spy).to.be.returned(test);

          spy.restore();
        })
      );
      it("should return false when receiver is not directly instance of given class",
        sinon.test(function() {
          var spy = this.spy($SC, "Boolean");
          var test = SubClass.new().isMemberOf(SuperClass);

          expect(spy).to.be.calledWith(false);
          expect(spy).to.be.returned(test);

          spy.restore();
        })
      );
    });
  });
  describe("inheritance", function() {
    it("instance should be able to inherit behavior from superclass", function() {
      var test = SubClass.new().methodDefinedInSuperClass();
      expect(test).to.be.equal("SuperClass#methodDefinedInSuperClass");
    });
    it("instance should be able to override behavior in subclass", function () {
      var test = SubClass.new().methodOverriddenInSubClass();
      expect(test).to.be.equal("SubClass#methodOverriddenInSubClass");
    });
    it("class should be able to inherit behavior from superclass", function() {
      var test = SubClass.methodDefinedInSuperClass();
      expect(test).to.be.equal("SuperClass.methodDefinedInSuperClass");
    });
    it("class should be able to override behavior in subclass", function() {
      var test = SubClass.methodOverriddenInSubClass();
      expect(test).to.be.equal("SubClass.methodOverriddenInSubClass");
    });
    it("#_performWith should apply behavior for any instance", function() {
      var test = SubClass.new().__performWith__("SuperClass", "methodOverriddenInSubClass");
      expect(test).to.be.equal("SuperClass#methodOverriddenInSubClass");
    });
    it("#_performWith should apply behavior for any class when starts with $", function() {
      var test = SubClass.__performWith__("SuperClass", "$methodOverriddenInSubClass");
      expect(test).to.be.equal("SuperClass.methodOverriddenInSubClass");
    });
    describe("special method", function() {
      describe("<notYetImplemented>", function() {
        it("should bind function that throw NotYetImplemented error", function() {
          expect(function() {
            SuperClass.notYetImplemented();
          }).to.throw("NotYetImplemented: SuperClass.notYetImplemented");
          expect(function() {
            SuperClass.new().notYetImplemented();
          }).to.throw("NotYetImplemented: SuperClass#notYetImplemented");
        });
      });
    });
  });
  describe("$SC.Class", function() {
    it("should return class", function() {
      var test = $SC.Class("Object");
      expect(test).to.be.equal(Object);
    });
  });
});
