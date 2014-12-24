(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  } else factory(global.actual = {}, global.bar);
})(this, function (exports, _foo) {
  "use strict";

  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  var bar = _interopRequire(_foo);

  var foo = _foo["default"];
});
