"use strict";

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  } else factory(global.actual = {}, global.foo);
})(this, function (exports, _foo) {
  (function (obj) {
    for (var i in obj) {
      exports[i] = obj[i];
    }
  })(_foo);

  exports.foo = _foo.foo;
  exports.foo = _foo.foo;
  exports.bar = _foo.bar;
  exports.bar = _foo.foo;
  exports["default"] = _foo.foo;
  exports["default"] = _foo.foo;
  exports.bar = _foo.bar;

  if (Object.keys(exports).length == 1 && exports.hasOwnProperty("default")) {
    exports = exports["default"];
  }
});
