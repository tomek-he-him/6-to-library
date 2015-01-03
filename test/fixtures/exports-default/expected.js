"use strict";

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else factory(global.actual = {});
})(this, function (exports) {
  exports["default"] = 42;
  exports["default"] = {};
  exports["default"] = [];
  exports["default"] = foo;
  exports["default"] = function () {};

  exports["default"] = function () {};

  function foo() {}
  exports["default"] = foo;
  var Foo = function Foo() {};

  exports["default"] = Foo;

  if (Object.keys(exports).length == 1 && exports.hasOwnProperty("default")) {
    exports = exports["default"];
  }
});
