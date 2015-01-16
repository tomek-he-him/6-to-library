(function (global, factory) {
  var root, exportsName, factoryArguments;
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else {
    if (typeof module != "undefined" && typeof module.exports != "undefined") {
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

  exports["default"] = foo;
  exports["default"] = 42;
  exports["default"] = {};
  exports["default"] = [];
  exports["default"] = foo;
  exports["default"] = function () {};

  exports["default"] = function () {};

  function foo() {}
  var Foo = function Foo() {};

  exports["default"] = Foo;
});
