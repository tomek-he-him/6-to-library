(function (global, factory) {
  var root, exportsName, factoryArguments;

  if (typeof define === "function" && define.amd) {
    define(AMD_ARGUMENTS, factory);
    }

  else {
    if (typeof module != "undefined" && typeof module.exports != "undefined") {
      factoryArguments = [module.exports, COMMON_ARGUMENTS];
      root = module;
      exportsName = "exports";
      }

    else {
      factoryArguments = [GLOBAL_EXPORTS, GLOBAL_IMPORTS];
      root = global;
      exportsName = GLOBAL_EXPORTS_NAME;
      }

    factory.apply(null, factoryArguments);

    if (  Object.keys(root[exportsName]).length == 1
       && root[exportsName].propertyIsEnumerable("default")
       )  {
      root[exportsName] = root[exportsName]["default"];
      }
    }
  });
