(function (global, factory) {
  var root, exportsName, factoryArguments;
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo", "foo-bar", "./directory/foo-bar-baz"], factory);
  } else {
    if (typeof module != "undefined" && typeof module.exports != "undefined") {
      factoryArguments = [module.exports, require("foo"), require("foo-bar"), require("./directory/foo-bar-baz")];
      root = module;
      exportsName = "exports";
    } else {
      factoryArguments = [global.actual = {}, global.foo, global.fooBar, global.fooBarBaz];
      root = global;
      exportsName = "actual";
    }
    factory.apply(null, factoryArguments);

    if (Object.keys(root[exportsName]).length == 1 && root[exportsName].propertyIsEnumerable("default")) {
      root[exportsName] = root[exportsName]["default"];
    }
  }
})(this, function (exports, _foo, _fooBar, _directoryFooBarBaz) {
  "use strict"

  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  var foo = _interopRequire(_foo);

  var foo = _foo;
  var bar = _foo.bar;
  var bar = _foo.foo;
  exports.test = test;
  var test = exports.test = 5;

  exports["default"] = test;
});
