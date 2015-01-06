(function (global, factory) {
  var root, exportsName, factoryArguments;
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else {
    if (module && typeof module.exports !== "undefined") {
      factoryArguments = [module.exports];
      root = module;
      exportsName = "exports";
    } else {
      factoryArguments = [global.actual = {}];
      root = global;
      exportsName = "actual";
    }
    factory.apply(null, factoryArguments);

    if (Object.keys(root[exportsName]).length == 1 && root[exportsName].propertyIsEnumerable("default")) {
      root[exportsName] = root[exportsName]["default"];
    }
  }
})(this, function (exports) {
  "use strict"

  exports.foo7 = foo7;
  var foo = exports.foo = 1;
  var foo = exports.foo = 1;
  var bar = exports.bar = 2;
  var foo2 = exports.foo2 = function () {};
  var foo3 = exports.foo3 = undefined;
  var foo4 = exports.foo4 = 2;
  var foo5 = exports.foo5 = undefined;
  var foo6 = exports.foo6 = 3;
  function foo7() {}
  var foo8 = function foo8() {};

  exports.foo8 = foo8;
});
