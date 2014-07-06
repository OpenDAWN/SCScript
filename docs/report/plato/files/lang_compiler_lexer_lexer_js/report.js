__report = {"info":{"file":"src/sc/lang/compiler/lexer/lexer.js","fileShort":"lang/compiler/lexer/lexer.js","fileSafe":"lang_compiler_lexer_lexer_js","link":"files/lang_compiler_lexer_lexer_js/index.html"},"complexity":{"aggregate":{"line":1,"complexity":{"sloc":{"physical":233,"logical":154},"cyclomatic":27,"halstead":{"operators":{"distinct":26,"total":458,"identifiers":["__stripped__"]},"operands":{"distinct":110,"total":534,"identifiers":["__stripped__"]},"length":992,"vocabulary":136,"difficulty":63.10909090909091,"volume":7030.763138520338,"effort":443705.0700691653,"bugs":2.3435877128401126,"time":24650.281670509183},"params":13}},"functions":[{"name":"<anonymous>","line":1,"complexity":{"sloc":{"physical":233,"logical":29},"cyclomatic":1,"halstead":{"operators":{"distinct":8,"total":99,"identifiers":["__stripped__"]},"operands":{"distinct":36,"total":105,"identifiers":["__stripped__"]},"length":204,"vocabulary":44,"difficulty":11.666666666666666,"volume":1113.7240502020086,"effort":12993.447252356766,"bugs":0.3712413500673362,"time":721.858180686487},"params":1}},{"name":"Lexer","line":14,"complexity":{"sloc":{"physical":24,"logical":15},"cyclomatic":6,"halstead":{"operators":{"distinct":10,"total":43,"identifiers":["__stripped__"]},"operands":{"distinct":21,"total":57,"identifiers":["__stripped__"]},"length":100,"vocabulary":31,"difficulty":13.571428571428573,"volume":495.41963103868756,"effort":6723.552135525046,"bugs":0.16513987701289584,"time":373.5306741958359},"params":2}},{"name":"get","line":40,"complexity":{"sloc":{"physical":3,"logical":1},"cyclomatic":1,"halstead":{"operators":{"distinct":3,"total":4,"identifiers":["__stripped__"]},"operands":{"distinct":3,"total":4,"identifiers":["__stripped__"]},"length":8,"vocabulary":6,"difficulty":2,"volume":20.67970000576925,"effort":41.3594000115385,"bugs":0.006893233335256416,"time":2.2977444450854723},"params":0}},{"name":"Lexer.addLexMethod","line":45,"complexity":{"sloc":{"physical":3,"logical":1},"cyclomatic":1,"halstead":{"operators":{"distinct":3,"total":4,"identifiers":["__stripped__"]},"operands":{"distinct":5,"total":7,"identifiers":["__stripped__"]},"length":11,"vocabulary":8,"difficulty":2.0999999999999996,"volume":33,"effort":69.29999999999998,"bugs":0.011,"time":3.849999999999999},"params":2}},{"name":"<anonymous>.tokenize","line":49,"complexity":{"sloc":{"physical":13,"logical":7},"cyclomatic":3,"halstead":{"operators":{"distinct":10,"total":16,"identifiers":["__stripped__"]},"operands":{"distinct":10,"total":14,"identifiers":["__stripped__"]},"length":30,"vocabulary":20,"difficulty":7,"volume":129.65784284662087,"effort":907.6048999263461,"bugs":0.043219280948873624,"time":50.42249444035256},"params":0}},{"name":"<anonymous>.collectToken","line":63,"complexity":{"sloc":{"physical":17,"logical":9},"cyclomatic":3,"halstead":{"operators":{"distinct":8,"total":24,"identifiers":["__stripped__"]},"operands":{"distinct":10,"total":26,"identifiers":["__stripped__"]},"length":50,"vocabulary":18,"difficulty":10.4,"volume":208.4962500721156,"effort":2168.3610007500024,"bugs":0.06949875002403853,"time":120.4645000416668},"params":0}},{"name":"<anonymous>.lex","line":81,"complexity":{"sloc":{"physical":15,"logical":9},"cyclomatic":1,"halstead":{"operators":{"distinct":5,"total":28,"identifiers":["__stripped__"]},"operands":{"distinct":9,"total":34,"identifiers":["__stripped__"]},"length":62,"vocabulary":14,"difficulty":9.444444444444445,"volume":236.05600516757144,"effort":2229.417826582619,"bugs":0.07868533505585715,"time":123.85654592125661},"params":0}},{"name":"<anonymous>.unlex","line":97,"complexity":{"sloc":{"physical":6,"logical":4},"cyclomatic":1,"halstead":{"operators":{"distinct":2,"total":12,"identifiers":["__stripped__"]},"operands":{"distinct":8,"total":17,"identifiers":["__stripped__"]},"length":29,"vocabulary":10,"difficulty":2.125,"volume":96.33591475173351,"effort":204.7138188474337,"bugs":0.03211197158391117,"time":11.37298993596854},"params":1}},{"name":"<anonymous>.advance","line":104,"complexity":{"sloc":{"physical":19,"logical":14},"cyclomatic":2,"halstead":{"operators":{"distinct":9,"total":33,"identifiers":["__stripped__"]},"operands":{"distinct":15,"total":35,"identifiers":["__stripped__"]},"length":68,"vocabulary":24,"difficulty":10.5,"volume":311.7774500490387,"effort":3273.663225514906,"bugs":0.1039258166830129,"time":181.87017919527256},"params":0}},{"name":"<anonymous>.createMarker","line":124,"complexity":{"sloc":{"physical":3,"logical":1},"cyclomatic":1,"halstead":{"operators":{"distinct":3,"total":3,"identifiers":["__stripped__"]},"operands":{"distinct":4,"total":5,"identifiers":["__stripped__"]},"length":8,"vocabulary":7,"difficulty":1.875,"volume":22.458839376460833,"effort":42.11032383086406,"bugs":0.007486279792153611,"time":2.3394624350480036},"params":1}},{"name":"<anonymous>.skipComment","line":128,"complexity":{"sloc":{"physical":21,"logical":17},"cyclomatic":7,"halstead":{"operators":{"distinct":14,"total":48,"identifiers":["__stripped__"]},"operands":{"distinct":17,"total":49,"identifiers":["__stripped__"]},"length":97,"vocabulary":31,"difficulty":20.176470588235293,"volume":480.55704210752697,"effort":9695.945026051868,"bugs":0.160185680702509,"time":538.6636125584371},"params":0}},{"name":"<anonymous>.scan","line":150,"complexity":{"sloc":{"physical":3,"logical":1},"cyclomatic":1,"halstead":{"operators":{"distinct":3,"total":5,"identifiers":["__stripped__"]},"operands":{"distinct":3,"total":4,"identifiers":["__stripped__"]},"length":9,"vocabulary":6,"difficulty":2,"volume":23.264662506490403,"effort":46.529325012980806,"bugs":0.007754887502163467,"time":2.584962500721156},"params":0}},{"name":"<anonymous>.selectScanner","line":154,"complexity":{"sloc":{"physical":17,"logical":8},"cyclomatic":8,"halstead":{"operators":{"distinct":8,"total":30,"identifiers":["__stripped__"]},"operands":{"distinct":17,"total":30,"identifiers":["__stripped__"]},"length":60,"vocabulary":25,"difficulty":7.0588235294117645,"volume":278.63137138648347,"effort":1966.8096803751773,"bugs":0.09287712379549448,"time":109.26720446528763},"params":0}},{"name":"<anonymous>.scanWithFunc","line":172,"complexity":{"sloc":{"physical":14,"logical":10},"cyclomatic":3,"halstead":{"operators":{"distinct":9,"total":41,"identifiers":["__stripped__"]},"operands":{"distinct":21,"total":49,"identifiers":["__stripped__"]},"length":90,"vocabulary":30,"difficulty":10.5,"volume":441.6201536047667,"effort":4637.01161285005,"bugs":0.14720671786825557,"time":257.61175626944726},"params":1}},{"name":"<anonymous>.makeToken","line":187,"complexity":{"sloc":{"physical":9,"logical":6},"cyclomatic":1,"halstead":{"operators":{"distinct":5,"total":11,"identifiers":["__stripped__"]},"operands":{"distinct":9,"total":19,"identifiers":["__stripped__"]},"length":30,"vocabulary":14,"difficulty":5.277777777777778,"volume":114.22064766172811,"effort":602.8311959924539,"bugs":0.038073549220576035,"time":33.490621999580775},"params":3}},{"name":"<anonymous>.EOFToken","line":197,"complexity":{"sloc":{"physical":3,"logical":1},"cyclomatic":1,"halstead":{"operators":{"distinct":3,"total":5,"identifiers":["__stripped__"]},"operands":{"distinct":6,"total":7,"identifiers":["__stripped__"]},"length":12,"vocabulary":9,"difficulty":1.75,"volume":38.03910001730775,"effort":66.56842503028857,"bugs":0.012679700005769252,"time":3.6982458350160314},"params":0}},{"name":"<anonymous>.getLocItems","line":201,"complexity":{"sloc":{"physical":3,"logical":1},"cyclomatic":1,"halstead":{"operators":{"distinct":3,"total":5,"identifiers":["__stripped__"]},"operands":{"distinct":5,"total":7,"identifiers":["__stripped__"]},"length":12,"vocabulary":8,"difficulty":2.0999999999999996,"volume":36,"effort":75.6,"bugs":0.012,"time":4.199999999999999},"params":0}},{"name":"<anonymous>.throwError","line":205,"complexity":{"sloc":{"physical":26,"logical":18},"cyclomatic":2,"halstead":{"operators":{"distinct":12,"total":45,"identifiers":["__stripped__"]},"operands":{"distinct":23,"total":63,"identifiers":["__stripped__"]},"length":108,"vocabulary":35,"difficulty":16.434782608695652,"volume":553.9625658300564,"effort":9104.254342772232,"bugs":0.1846541886100188,"time":505.79190793179066},"params":2}}],"maintainability":108.79644620393354,"params":0.7222222222222222,"module":"lang/compiler/lexer/lexer.js"},"jshint":{"messages":[]}}