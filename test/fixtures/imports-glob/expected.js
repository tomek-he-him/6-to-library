(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  } else factory(global.actual = {}, global.foo);
})(this, function (exports, _foo) {
  "use strict"

  var foo = _foo;
  if (Object.keys(exports).length == 1 && exports.propertyIsEnumerable("default")) {
    exports = exports["default"];
  }
});
