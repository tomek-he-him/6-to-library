(function (global, factory) {
  var root, exportsName, factoryArguments;
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else {
    if (typeof module != "undefined" && typeof module.exports != "undefined") {
      factoryArguments = [module.exports, require("foo")];
      root = module;
      exportsName = "exports";
    } else {
      factoryArguments = [global.actual = {}, global.foo];
      root = global;
      exportsName = "actual";
    }
    factory.apply(null, factoryArguments);

    if (Object.keys(root[exportsName]).length == 1 && root[exportsName].propertyIsEnumerable("default")) {
      root[exportsName] = root[exportsName]["default"];
    }
  }
})(this, function (exports, _foo) {
  "use strict"

  var foo = _foo;
});
