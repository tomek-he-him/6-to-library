var fs = require('fs');
var path = require('path');

var to5 = require('6to5');
var list = require('dirs');
var isDirectory = require('is-directory');
var test = require('tape');


test('fixtures', function (tape) {
    var fixtures = list(path.join(__dirname, 'fixtures'))
        .filter(isDirectory)
        ;

    fixtures.forEach(function (fixturePath) {
        var fixtureName = path.basename(fixturePath).replace(/-/g, ' ');
        var prettyName = fixtureName.charAt(0).toUpperCase() + fixtureName.slice(1);
        tape.equal
            ( to5.transformFileSync
                ( path.join(fixturePath, 'actual.js')
                , {modules: '.'}
                ).code
            , fs.readFileSync(path.join(fixturePath, 'expected.js')).toString()
            , prettyName
            );
        });

    tape.end();
    });
