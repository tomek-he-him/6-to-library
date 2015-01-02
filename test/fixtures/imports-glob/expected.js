(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  } else factory(global.actual = {}, global.bar);
})(this, function (exports, _foo) {
  "use strict";

  var bar = _foo;

  if (Object.keys(exports).length == 1 && exports.hasOwnProperty("default")) {
    exports = exports["default"];
  }
});
