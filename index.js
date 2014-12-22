// Imports
// -------------------------------------------------------------------------------------------------

var UMDFormatter = require('6to5/lib/6to5/transformation/modules/umd');
var util = require('./lib/util');


// Main
// -------------------------------------------------------------------------------------------------

var self = function WebUMDFormatter () {
    UMDFormatter.apply(this, arguments);
    };
util.inherits(self, UMDFormatter);


// Export
// -------------------------------------------------------------------------------------------------

module.exports = self;
