// Imports
// -------------------------------------------------------------------------------------------------

var AMDFormatter = require('6to5/lib/6to5/transformation/modules/amd');
var util = require('./lib/util');


// Main
// -------------------------------------------------------------------------------------------------

// Extend AMDFormatter.
var self = function WebUMDFormatter () {
    AMDFormatter.apply(this, arguments);
    };
util.inherits(self, AMDFormatter);

// Override the method transform. This is mostly the code of the original UMDFormatter.
self.prototype.transform = function (ast) {
  var program = ast.program;
  var body    = program.body;

  // build an array of module names

  var names = [];
  _.each(this.ids, function (id, name) {
    names.push(t.literal(name));
  });

  // factory

  var ids  = _.values(this.ids);
  var args = [t.identifier("exports")].concat(ids);

  var factory = t.functionExpression(null, args, t.blockStatement(body));

  // runner

  var defineArgs = [t.arrayExpression([t.literal("exports")].concat(names))];
  var moduleName = this.getModuleName();
  if (moduleName) defineArgs.unshift(t.literal(moduleName));

  var runner = util.template("umd-runner-body", {
    AMD_ARGUMENTS: defineArgs,

    COMMON_ARGUMENTS: names.map(function (name) {
      return t.callExpression(t.identifier("require"), [name]);
    })
  });

  //

  var call = t.callExpression(runner, [factory]);
  program.body = [t.expressionStatement(call)];
};



// Export
// -------------------------------------------------------------------------------------------------

module.exports = self;
