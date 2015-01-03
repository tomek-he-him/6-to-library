var fs = require("fs");
var path = require("path");

var clone = require("101/clone");
var util = require("6to5/lib/6to5/util");
var traverse = require("6to5/lib/6to5/traverse");
var t = require("6to5/lib/6to5/types");
var basename = require("basename");
var mapToObject = require("map-to/object");

var template, templates;


module.exports = template = function template (name, nodes) {
  var node;
  var theTemplate = templates[name];
  if (!theTemplate) throw new ReferenceError("unknown template " + name);
  theTemplate = clone(theTemplate);

  if (nodes && Object.keys(nodes).length) {
    traverse(theTemplate,
      { enter: function (node) {
          if (t.isIdentifier(node) && nodes.hasOwnProperty(node.name)) {
            return nodes[node.name];
            }
          }
      });
    }

  node = theTemplate.body[0];
  if (t.isExpressionStatement(node)) node = node.expression;

  return node;
  };


template.templates = templates = (function gettingTemplates () {
  var templatesDir = path.join(__dirname, "templates");

  return mapToObject
    ( fs.readdirSync(templatesDir).map(function (filename) {
      if (filename.charAt(0) == ".") return null;

      var location = path.join(templatesDir, filename);
      var code = fs.readFileSync(location, "utf8");

      return (
        { key: basename(filename)
        , value: util.parseTemplate(location, code)
        });
      })
    );
  })();
