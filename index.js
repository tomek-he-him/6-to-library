// Imports
// -------------------------------------------------------------------------------------------------

var AMDFormatter = require('6to5/lib/6to5/transformation/modules/amd');
var t = require('6to5/lib/6to5/types');
var asArray = require('101-es6/as-array');
var pluck = require('101-es6/pluck');
var basename = require('basename');

var util = require('./lib/util');


// Main
// -------------------------------------------------------------------------------------------------

// Extend AMDFormatter.
var self = function WebUMDFormatter () {
  AMDFormatter.apply(this, arguments);
  this.exportsNamespace = t.toIdentifier(basename(this.file.opts.filename));
  };
util.inherits(self, AMDFormatter);

// Override the method transform. This is mostly the code of the original UMDFormatter.
self.prototype.transform = function (ast) {
  var program = ast.program;
  var body = program.body;

  // Build an array of module names.
  var ids  = asArray(this.ids).map(pluck('value'));
  var names = ids.map(function (module) {
    return t.literal(module.name);
    });
  var specifiers = ids.map(function (module) {
    return t.literal(module.specifierName);
    });

  // Create the factory.
  var args = [t.identifier("exports")].concat(ids);
  var factory = t.functionExpression(null, args, t.blockStatement(body));

  // Create the runner.
  var defineArgs = [t.arrayExpression([t.literal("exports")].concat(names))];
  var moduleName = this.getModuleName();
  if (moduleName) defineArgs.unshift(t.literal(moduleName));

  var runner = util.template("web-umd.runner-body",
    { AMD_ARGUMENTS: defineArgs
    , COMMON_ARGUMENTS: names.map(function (name) {
      return t.callExpression(t.identifier("require"), [name]);
      })
    , GLOBAL_EXPORTS: [util.template("web-umd.global-exports",
      { EXPORTS_NAMESPACE: this.exportsNamespace
      })]
    , GLOBAL_IMPORTS: []
    });

  // Finish off.
  var call = t.callExpression(runner, [t.thisExpression(), factory]);
  program.body = [t.expressionStatement(call)];
  };


// Export
// -------------------------------------------------------------------------------------------------

module.exports = self;
