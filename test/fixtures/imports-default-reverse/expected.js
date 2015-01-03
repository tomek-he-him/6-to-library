"use strict";

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  } else factory(global.actual = {}, global.foo);
})(this, function (exports, _foo) {
  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  var bar = _interopRequire(_foo);

  var baz = _foo["default"];

  if (Object.keys(exports).length == 1 && exports.hasOwnProperty("default")) {
    exports = exports["default"];
  }
});
