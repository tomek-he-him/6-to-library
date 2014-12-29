var fs = require('fs');
var path = require('path');

var to5 = require('6to5');
var list = require('dirs');
var isDirectory = require('is-directory');
var test = require('tape');
var trim = require('trimmer');


test('fixtures', function (tape) {
  var fixtures = list(path.join(__dirname, 'fixtures'))
    .filter(isDirectory)
    ;

  fixtures.forEach(function (fixturePath) {
    var fixtureName = path.basename(fixturePath).replace(/-/g, ' ');
    var prettyName = fixtureName.charAt(0).toUpperCase() + fixtureName.slice(1);
    var transformed = to5.transformFileSync
      ( path.join(fixturePath, 'actual.js')
      , {modules: 'web-umd.6to5'}
      ).code;
    fs.writeFileSync(path.join(fixturePath, 'output.js'), transformed);

    tape.equal
      ( trim(fs.readFileSync(path.join(fixturePath, 'output.js')).toString())
      , trim(fs.readFileSync(path.join(fixturePath, 'expected.js')).toString())
      , prettyName
      );
    });

  tape.end();
  });
