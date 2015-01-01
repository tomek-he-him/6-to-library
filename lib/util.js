var util = require('6to5/lib/6to5/util');
var assign = require('101/assign');


// Extend default templates.
assign( util.templates
      , require('./templates.json')
      );

// Export the module, otherwise unchanged.
module.exports = util;
