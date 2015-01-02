(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  } else factory(global.actual = {}, global.foo);
})(this, function (exports, _foo) {
  "use strict";

  var bar = _foo.bar;
  var bar = _foo.bar;
  var baz = _foo.baz;
  var baz = _foo.bar;
  var baz = _foo.bar;
  var xyz = _foo.xyz;

  if (Object.keys(exports).length == 1 && exports.hasOwnProperty("default")) {
    exports = exports["default"];
  }
});
