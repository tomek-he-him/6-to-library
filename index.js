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
  this.globalExportId = t.toIdentifier(basename(this.file.opts.filename));
  this.globalImportIds = {};
  };
util.inherits(self, AMDFormatter);


// Override the method transform. This is mostly the code of the original UMDFormatter.
self.prototype.transform = function (ast) {
  var moduleName;
  var program = ast.program;
  var body = program.body;
  var globalImportIds = this.globalImportIds;

  // Parse module names.
  var ids = asArray(this.ids);
  var importIds = asArray(this.ids).map(function (id) {
    return globalImportIds[id.key];
    });
  var importLocations = ids.map(function (id) {
    return t.literal(id.key);
    });

  // Create the factory.
  var factory = t.functionExpression
    ( null
    , [t.identifier('exports')].concat(ids.map(pluck('value')))
    , t.blockStatement(body)
    );

  // Create the runner.
  var runner = util.template('web-umd.runner-body',
    { AMD_ARGUMENTS: [t.arrayExpression(
      [].concat( (moduleName = this.getModuleName())
               ? t.literal(moduleName)
               : []
               )
        .concat(t.literal('exports'))
        .concat(importLocations)
      )]
    , COMMON_ARGUMENTS: importLocations.map(function (name) {
      return t.callExpression(t.identifier('require'), [name]);
      })
    , GLOBAL_EXPORTS: [util.template('web-umd.global-exports',
      { EXPORTS_NAMESPACE: this.globalExportId
      })]
    , GLOBAL_IMPORTS: importIds
    });

  // Finish off.
  var call = t.callExpression(runner, [t.thisExpression(), factory]);
  program.body = [t.expressionStatement(call)];
  };


self.prototype.import = function (node) {
  this._pushSpecifier(node);
  AMDFormatter.prototype.import.apply(this, arguments);
  };


self.prototype.importSpecifier = function (specifierNode) {
  this._pushSpecifier(specifierNode);
  AMDFormatter.prototype.importSpecifier.apply(this, arguments);
  };


self.prototype._pushSpecifier = function (node) {
  var name = ( node.type == 'ImportDeclaration'
             ? node.source.value
             : node._parent.source.value
             );
  var ids = this.globalImportIds;

  return (
    (  ids[name]
    || (ids[name] = util.template('web-umd.global-import',
          { IMPORT_IDENTIFIER: t.toIdentifier(
            ( node.default && node.id && node.id.name
            ? node.id.name
            : name
            ))
          })
       )
    ));
  };


// Export
// -------------------------------------------------------------------------------------------------

module.exports = self;
