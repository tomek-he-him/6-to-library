(function (global, factory) {
  var root, exportsName, factoryArguments;
  if (typeof define === "function" && define.amd) {
    define(["exports", "./evens"], factory);
  } else {
    if (typeof module != "undefined" && typeof module.exports != "undefined") {
      factoryArguments = [module.exports, require("./evens")];
      root = module;
      exportsName = "exports";
    } else {
      factoryArguments = [global.actual = {}, global.evens];
      root = global;
      exportsName = "actual";
    }
    factory.apply(null, factoryArguments);

    if (Object.keys(root[exportsName]).length == 1 && root[exportsName].propertyIsEnumerable("default")) {
      root[exportsName] = root[exportsName]["default"];
    }
  }
})(this, function (exports, _evens) {
  "use strict"

  exports.nextOdd = nextOdd;
  var isEven = _evens.isEven;
  function nextOdd(n) {
    return isEven(n) ? n + 1 : n + 2;
  }

  var isOdd = exports.isOdd = (function (isEven) {
    return function (n) {
      return !isEven(n);
    };
  })(isEven);
});
