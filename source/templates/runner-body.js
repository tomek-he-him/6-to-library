(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(AMD_ARGUMENTS, factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, COMMON_ARGUMENTS);
  } else factory(GLOBAL_EXPORTS, GLOBAL_IMPORTS);
});
