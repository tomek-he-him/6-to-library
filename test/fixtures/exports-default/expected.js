(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else factory(global.actual = {});
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
  if (Object.keys(exports).length == 1 && exports.propertyIsEnumerable("default")) {
    exports = exports["default"];
  }
});
