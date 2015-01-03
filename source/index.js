// Imports
// -------------------------------------------------------------------------------------------------

var pluck = require('101/pluck');
var AMDFormatter = require('6to5/lib/6to5/transformation/modules/amd');
var t = require('6to5/lib/6to5/types');
var util = require('6to5/lib/6to5/util');
var mapToArray = require('map-to/array');
var basename = require('basename');

var template = require('./template');


// Main
// -------------------------------------------------------------------------------------------------

// Extend AMDFormatter.
var self = function SixToLibrary () {
  AMDFormatter.apply(this, arguments);
  this.globalExportId = t.toIdentifier(basename(this.file.opts.filename));
  this.globalImportIds = {};
  };
util.inherits(self, AMDFormatter);


// Override the method `transform`.
self.prototype.transform = function (ast) {
  var moduleName;
  var program = ast.program;
  var body = program.body;
  var globalImportIds = this.globalImportIds;

  // Parse module names.
  var ids = mapToArray(this.ids);
  var importIds = ids.map(function (id) {
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
  var runner = template('runner-body',
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
    , GLOBAL_EXPORTS: [template('global-exports',
        { EXPORTS_NAMESPACE: t.identifier(this.globalExportId)
        })]
    , GLOBAL_IMPORTS: importIds
    });

  // Finish off.
  var call = t.callExpression(runner, [t.thisExpression(), factory]);
  program.body = [t.expressionStatement(call)];
  };


// Override the method `importDeclaration`.
self.prototype.importDeclaration = function (declaration) {
  // Add the import's specifier.
  this._pushSpecifier(declaration);

  // Apply the super method.
  AMDFormatter.prototype.importDeclaration.apply(this, arguments);
  };


// Override the method `importSpecifier`.
self.prototype.importSpecifier = function (specifier, declaration) {
  // Add the import's specifier.
  this._pushSpecifier(declaration, specifier);

  // Apply the super method.
  AMDFormatter.prototype.importSpecifier.apply(this, arguments);
  };


self.prototype._pushSpecifier = function (declaration, specifier) {
  var name = declaration.source.value;
  var ids = this.globalImportIds;

  if (!ids[name]) ids[name] = template('global-import',
    { IMPORT_IDENTIFIER: t.identifier(t.toIdentifier(
      (  specifier && specifier.default && specifier.id && specifier.id.name
      || name
      )))
    });
  return ids[name];
  };


// Export
// -------------------------------------------------------------------------------------------------

module.exports = self;
