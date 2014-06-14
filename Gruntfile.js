module.exports = function(grunt) {
  "use strict";

  var path = require("path");

  function clearRequireCache() {
    Object.keys(require.cache).forEach(function(filepath) {
      if (!/\/node_modules\//.test(filepath)) {
        delete require.cache[filepath];
      }
    });
  }

  function q(str) {
    return "\"" + str + "\"";
  }

  function s(obj) {
    return typeof obj === "undefined" ? "" : String(obj);
  }

  function loadNpmTasksIfNeeded(name) {
    if (loadNpmTasksIfNeeded[name]) {
      return;
    }
    loadNpmTasksIfNeeded[name] = true;
    grunt.loadNpmTasks(name);
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON("./package.json")
  });

  grunt.registerTask("default", [ "connect", "watch" ]);

  grunt.registerTask("connect", function() {
    loadNpmTasksIfNeeded("grunt-contrib-connect");

    grunt.config.data.connect = {
      server: {
        options: {
          port: process.env.PORT || 3000,
          hostname: "*"
        }
      }
    };

    grunt.task.run("connect");
  });

  grunt.registerTask("watch", function() {
    loadNpmTasksIfNeeded("grunt-este-watch");

    grunt.config.data.esteWatch = {
      options: {
        dirs: [ "src/**/", "bin/", "demo/" ]
      },
      js: function(file) {
        return [ "check:" + file ];
      }
    };

    grunt.task.run("esteWatch");
  });

  grunt.registerTask("lint", function(filter) {
    var list ,files, tests;

    loadNpmTasksIfNeeded("grunt-contrib-jshint");

    if (filter) {
      files = [];
      tests = [];
      list = grunt.file.expand([
        "src/sc/**/*.js", "bin/*.js", "demo/**/*.js"
      ]);
      list = filterFiles(list, filter, false);
      list.forEach(function(file) {
        if (!/_test\.js$/.test(file)) {
          files.push(file);
        } else {
          tests.push(file);
        }
      });
    } else {
      files = [
        "src/sc/**/*.js", "!src/sc/**/*_test.js",
        "bin/*.js", "demo/**/*.js", "gruntfile.js"
      ];
      tests = [ "src/sc/**/*_test.js" ];
    }

    grunt.config.data.jshint = {
      options: grunt.file.readJSON(".jshintrc")
    };

    if (files.length) {
      grunt.config.data.jshint.src = files;
    }

    if (tests.length) {
      grunt.config.data.jshint.test = {
        options: {
          expr    : true,
          loopfunc: true,
          globals: {
            sc        : true,
            context   : true,
            describe  : true,
            it        : true,
            chai      : true,
            sinon     : true,
            expect    : true,
            before    : true,
            beforeEach: true,
            afterEach : true,
            after     : true,
            esprima   : true
          }
        },
        files: {
          src: tests
        }
      };
    }

    grunt.task.run("jshint");
  });

  grunt.registerTask("jscs", [ "_jscs" ]);

  grunt.registerTask("_jscs", function(filter) {
    var list;

    loadNpmTasksIfNeeded("grunt-jscs-checker");

    list = grunt.file.expand("src/sc/**/*.js");
    if (filter) {
      list = filterFiles(list, filter, false);
    }

    grunt.config.data.jscs = {
      src: list,
      options: {
        config: ".jscsrc"
      }
    };

    grunt.task.run("jscs");
  });

  grunt.registerTask("typo", function(filter) {
    var files, C, checked, typo;

    clearRequireCache();

    checked = 0;
    typo = 0;
    C = require("./src/const");

    files = grunt.file.expand([ "src/sc/**/*.js" ]);
    if (filter) {
      files = filterFiles(files, filter, false);
    }

    files.forEach(function(file) {
      var code, re, m;

      code = grunt.file.read(file);
      re = /sc\.([A-Z0-9_]+)(?=\b)/g;

      while ((m = re.exec(code)) !== null) {
        if (m[1] !== "VERSION" && !C.hasOwnProperty(m[1])) {
          grunt.verbose.or.write("Typong " + file + "...");
          grunt.log.error();
          grunt.log.writeln("  C." + m[1]);
          typo += 1;
        }
      }
      checked += 1;
    });

    if (typo === 0) {
      grunt.log.ok(checked + " files typo free.");
      return true;
    }

    return false;
  });

  function trimExtJS(path) {
    var matches = /(sc\/.+?)(?:_test)?\.js$/.exec(path);

    if (matches) {
      return matches[1];
    }

    return path;
  }

  function resolveFilter(filter) {
    var related;

    related = grunt.file.readJSON("src/sc/test/related.json");

    filter = trimExtJS(filter);
    if (related[filter]) {
      filter = related[filter].join("|");
    }

    return filter;
  }

  function filterFiles(list, filter, replace) {
    var result;

    if (filter) {
      result = [];
      filter.split("|").forEach(function(filter) {
        if (replace) {
          filter = filter.replace(/(_test)?\.js$/, "");
        }
        result.push.apply(result, list.filter(function(file) {
          return file.indexOf(filter) !== -1;
        }));
      });
    } else {
      result = list;
    }

    return result;
  }

  function testSorter(a, b) {
    var r, p, cond = 0;

    p = { undefined: 1, lang: 2 };
    r = /^src\/sc\/(?:(.+?)\/)?(.+)\.js$/;
    a = r.exec(a);
    b = r.exec(b);

    cond = cond || (p[a[1]] || Infinity) - (p[b[1]] || Infinity);
    cond = cond || a[2].split("/").length - b[2].split("/").length;
    cond = cond || (a[2] < b[2] ? -1 : +1);

    return cond;
  }

  grunt.registerTask("test", function(filter, reporter, cover) {
    var Mocha = require("mocha");
    var chai = require("chai");
    var sinon = require("sinon");
    var istanbul = require("istanbul");
    var esprima = require("esprima");

    var mocha, done, tstFiles;
    var matchFn, coverageVar, instrumenter, transformer;

    chai.use(require("sinon-chai"));

    mocha = new Mocha();
    matchFn = {};

    filter = s(resolveFilter(filter));
    tstFiles = grunt.file.expand("src/sc/**/*.js");
    tstFiles = filterFiles(tstFiles, filter, true);
    tstFiles.sort(testSorter).forEach(function(file) {
      if (/_test\.js$/.test(file)) {
        mocha.addFile(file);
      } else if (!/^src\/sc\/test\//.test(file)) {
        matchFn[path.resolve(file)] = true;
      }
    });

    if (mocha.files.length === 0) {
      return;
    }

    clearRequireCache();

    global.expect = chai.expect;
    global.chai = chai;
    global.sinon = sinon;
    global.esprima = esprima;

    global.sc = {};
    require("./src/const");
    global.sc.VERSION = grunt.config.data.pkg.version;

    global.SCScript = {
      install: function(installer) {
        installer(global.sc);
      }
    };

    if (cover) {
      coverageVar = "$$cov_" + Date.now() + "$$";
      instrumenter = new istanbul.Instrumenter({ coverageVariable: coverageVar });
      transformer = instrumenter.instrumentSync.bind(instrumenter);
      istanbul.hook.hookRequire(function(file) { return matchFn[file]; }, transformer);
      global[coverageVar] = {};
    }

    require("./src/sc/test/utils");

    if (!reporter) {
      reporter = "spec";
    }

    done = this.async();

    mocha.reporter(reporter).run(function(failure) {
      var collector;

      if (cover) {
        collector = new istanbul.Collector();
        collector.add(global[coverageVar]);

        if (cover !== "text") {
          istanbul.Report.create(cover, { dir: "docs/report" }).writeReport(collector, true);
        }

        istanbul.Report.create("text").writeReport(collector, true);
      }

      done(!failure);
    });
  });

  grunt.registerTask("cover", function(filter) {
    grunt.task.run("test:" + s(filter) + ":nyan:lcov");
  });

  grunt.registerTask("report", function() {
    grunt.task.run([ "cover", "plato" ]);
    makeBrowserTest();
  });

  grunt.registerTask("check", function(filter) {
    grunt.task.run("typo:"  + s(filter));
    grunt.task.run("_jscs:" + s(filter));
    grunt.task.run("lint:"  + s(filter));
    grunt.task.run("test:"  + s(filter) + ":nyan:text");
  });

  grunt.registerTask("travis", function() {
    grunt.task.run("typo");
    grunt.task.run("jscs");
    grunt.task.run("lint");
    grunt.task.run("test::list:lcovonly");
  });

  grunt.registerTask("testem", function() {
    var done = this.async();
    var child = grunt.util.spawn({
      cmd: "testem",
      args: [ "ci", "--launch", "Chrome,Safari,Firefox,Opera" ]
    }, function() {
      done();
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  });

  function sortModules() {
    var result = [];

    function load(filepath) {
      var index, dir, src, re, m;

      index = result.indexOf(filepath);
      if (index !== -1) {
        result.splice(index, 1);
      }
      result.unshift(filepath);

      dir = path.dirname(filepath);
      src = grunt.file.read(filepath);

      re = /require\("(\.[^"]+)"\);/gm;
      while ((m = re.exec(src)) !== null) {
        load(path.join(dir, m[1]) + ".js");
      }
    }

    [].slice.call(arguments).forEach(load);

    return result;
  }

  function makeBrowserTest() {
    var tmpl, tests;

    tmpl = grunt.file.read("assets/index.tmpl");

    tests = grunt.file.expand("src/sc/**/*_test.js");
    tests = tests.sort(testSorter).map(function(filepath) {
      return "    <script src=\"../../../" + filepath + "\"></script>";
    });
    tmpl = tmpl.replace("#{TESTS}", tests.join("\n"));

    grunt.file.write("docs/report/test/index.html", tmpl);
  }

  function concat(files) {
    var C = require("./src/const");

    files = sortModules.apply(null, files);

    return files.map(function(filepath) {
      var src;

      src = grunt.file.read(filepath);

      Object.keys(C).forEach(function(key) {
        src = src.replace(new RegExp("sc." + key + "(?=\\b)", "g"), C[key]);
      });

      src = src.replace(/\s*['"]use strict['"];$/gm, "");
      src = src.replace(/^\s*require\("\.[^"]+"\);$/gm, "");
      src = src.replace(/(\s*\n){2,}/g, "\n\n");
      src = src.trim();

      if (src) {
        src = "\n// " + filepath + "\n" + src + "\n";
      }

      return src;
    });
  }

  grunt.registerTask("build", function() {
    var files, result;

    result = [];
    result.push(
      "(function(global) {\n",
      q("use strict") + ";\n\n",
      "var sc = { VERSION: " + q(grunt.config.data.pkg.version) + " };\n"
    );

    files = [ "src/sc/installer.js" ];
    result.push.apply(result, concat(files));
    result.push(
      "\n})(this.self||global);\n"
    );
    grunt.file.write("build/scscript.js", result.join("").trim());

    files  = grunt.file.expand([ "src/sc/classlib/**/*.js", "!src/sc/classlib/**/*_test.js" ]);
    result = concat(files);
    grunt.file.write("build/scscript-classlib.js", result.join("").trim());

    makeBrowserTest();
  });

  grunt.registerTask("plato", function() {
    loadNpmTasksIfNeeded("grunt-plato");

    grunt.config.data.plato = {
      options: {
        jshint: grunt.file.readJSON(".jshintrc"),
        complexity: {
          logicalor : true,
          switchcase: true,
          forin     : true,
          trycatch  : true
        }
      },
      dist: {
        files: {
          "docs/report/plato": [
            "src/sc/**/*.js", "!src/sc/test/*", "!src/**/*test*.js"
          ]
        }
      }
    };

    grunt.task.run("plato");
  });

};
