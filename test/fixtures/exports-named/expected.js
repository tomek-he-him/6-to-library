"use strict";

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else factory(global.actual = {});
})(this, function (exports) {
  exports.foo = foo;
  exports.foo = foo;
  exports.bar = bar;
  exports.bar = foo;
  exports["default"] = foo;
  exports["default"] = foo;
  exports.bar = bar;

  if (Object.keys(exports).length == 1 && exports.propertyIsEnumerable("default")) {
    exports = exports["default"];
  }
});
