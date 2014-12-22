var util = require('6to5/lib/6to5/util');


// Override default templates.
util.templates = require('./templates.json');

// Export the otherwise unchanged module.
module.exports = util;
