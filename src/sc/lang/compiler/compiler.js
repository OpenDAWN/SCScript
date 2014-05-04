(function(sc) {
  "use strict";

  require("./sc");

  var compiler = {};

  compiler.Token = {
    CharLiteral: "Char",
    EOF: "<EOF>",
    FalseLiteral: "False",
    FloatLiteral: "Float",
    Identifier: "Identifier",
    IntegerLiteral: "Integer",
    Keyword: "Keyword",
    Label: "Label",
    NilLiteral: "Nil",
    Punctuator: "Punctuator",
    StringLiteral: "String",
    SymbolLiteral: "Symbol",
    TrueLiteral: "True"
  };

  compiler.Syntax = {
    AssignmentExpression: "AssignmentExpression",
    BinaryExpression: "BinaryExpression",
    BlockExpression: "BlockExpression",
    CallExpression: "CallExpression",
    FunctionExpression: "FunctionExpression",
    GlobalExpression: "GlobalExpression",
    Identifier: "Identifier",
    ListExpression: "ListExpression",
    Label: "Label",
    Literal: "Literal",
    ObjectExpression: "ObjectExpression",
    Program: "Program",
    ThisExpression: "ThisExpression",
    UnaryExpression: "UnaryExpression",
    VariableDeclaration: "VariableDeclaration",
    VariableDeclarator: "VariableDeclarator"
  };

  compiler.Message = {
    ArgumentAlreadyDeclared: "argument '%0' already declared",
    InvalidLHSInAssignment: "invalid left-hand side in assignment",
    NotImplemented: "not implemented %0",
    UnexpectedEOS: "unexpected end of input",
    UnexpectedIdentifier: "unexpected identifier",
    UnexpectedChar: "unexpected char",
    UnexpectedLabel: "unexpected label",
    UnexpectedNumber: "unexpected number",
    UnexpectedString: "unexpected string",
    UnexpectedSymbol: "unexpected symbol",
    UnexpectedToken: "unexpected token %0",
    VariableAlreadyDeclared: "variable '%0' already declared",
    VariableNotDefined: "variable '%0' not defined"
  };

  compiler.Keywords = {
    var: "keyword",
    arg: "keyword",
    const: "keyword",
    this: "function",
    thisThread: "function",
    thisProcess: "function",
    thisFunction: "function",
    thisFunctionDef: "function",
  };

  sc.lang.compiler = compiler;

  var SCScript = sc.SCScript;

  SCScript.tokenize = function(source, opts) {
    opts = opts || /* istanbul ignore next */ {};
    opts.tokens = true;
    return sc.lang.parser.parse(source, opts).tokens || /* istanbul ignore next */ [];
  };

  SCScript.parse = function(source, opts) {
    return sc.lang.parser.parse(source, opts);
  };

  SCScript.compile = function(source, opts) {
    var ast = SCScript.parse(source, opts);
    return sc.lang.codegen.compile(ast, opts);
  };

})(sc);
