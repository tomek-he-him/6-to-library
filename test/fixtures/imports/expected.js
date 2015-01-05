(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo", "foo-bar", "./directory/foo-bar"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"), require("foo-bar"), require("./directory/foo-bar"));
  } else factory(global.actual = {}, global.foo, global.fooBar, global.directoryFooBar);
})(this, function (exports, _foo, _fooBar, _directoryFooBar) {
  "use strict"

  if (Object.keys(exports).length == 1 && exports.propertyIsEnumerable("default")) {
    exports = exports["default"];
  }
});
