"use strict";

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else factory(global.actual = {});
})(this, function (exports) {
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

  if (Object.keys(exports).length == 1 && exports.propertyIsEnumerable("default")) {
    exports = exports["default"];
  }
});
