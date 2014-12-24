var util = require('6to5/lib/6to5/util');
var assign = require('101-es6/assign');


// Extend default templates.
assign( util.templates
      , require('./templates.json')
      );

// Export the otherwise unchanged module.
module.exports = util;
