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

  var baz = _interopRequire(_foo);

  var bar = _interopRequire(_foo);

  if (Object.keys(exports).length == 1 && exports.propertyIsEnumerable("default")) {
    exports = exports["default"];
  }
});
