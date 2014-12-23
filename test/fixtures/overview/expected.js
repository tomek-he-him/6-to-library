(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo", "foo-bar", "./directory/foo-bar"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"), require("foo-bar"), require("./directory/foo-bar"));
  } else factory((global.actual = {}), global.foo, global.fooBar, global.directoryFooBar);
})(this, function (exports, _foo, _fooBar, _directoryFooBar) {
  "use strict";

  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  var baz = _interopRequire(_foo);

  var baz = _foo;
  var bar = _foo.bar;
  var bar = _foo.foo;
  exports.test = test;
  var test = exports.test = 5;

  exports["default"] = test;
});
