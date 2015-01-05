 [![Build status](https://img.shields.io/travis/tomekwi/6-to-library.js/master.svg?style=flat-square)](https://travis-ci.org/tomekwi/6-to-library.js)
 [![Code climate](https://img.shields.io/codeclimate/github/tomekwi/6-to-library.js.svg?style=flat-square)](https://codeclimate.com/github/tomekwi/6-to-library.js)
 [![David](https://img.shields.io/david/tomekwi/6-to-library.js.svg?style=flat-square)](https://david-dm.org/tomekwi/6-to-library.js)

6-to-library
============

**The 6to5 formatter for library authors.**

[“Author in ES6, distribute everywhere.”][ryan] Seamlessly target NPM and browsers.


[ryan]: http://ryanflorence.com/2013/es6-modules-and-browser-app-delivery/ "“ES6 Modules, Build Tools and Browser App Delivery” by Ryan Florence"




Installation
------------

```sh
> npm install 6-to-library
```




Usage
-----

Through the 6to5 CLI:

```sh
6to5 --modules 6-to-library ...
```

Programatically:

```js
var to5 = require("6to5");
to5.transform('...', {modules: '6-to-library'});
```

In your transpiled files you get a variation of the [UMD][] module definition, tailor-cut to support CommonJS, AMD and globals.

##### Input

```js
// my-module.js

import {foo as bar} from "./foo/foo";
import baz from "bar";

export default baz[bar];
```

##### Output

```js
(function (global, factory) {
  var exportedKeys;

  // AMD
  if (typeof define === "function" && define.amd) {
    define(["exports", "./foo/foo", "bar"], factory);

  // CommonJS
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./foo/foo"), require("bar"));

  // Globals
  } else factory(global.myModule = {}, global.fooFoo, global.baz);

})(this, function (exports, _fooFoo, _bar) {
  "use strict";

  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  var bar = _fooFoo.foo;
  var baz = _interopRequire(_bar);

  exports["default"] = baz[bar];

  if (Object.keys(exports).length == 1 && exports.hasOwnProperty("default")) {
    exports = exports["default"];
  }
});
```

_(Comments and whitespace added for clarity.)_


[UMD]: https://github.com/umdjs/umd




License
-------

[MIT][] © [Tomek Wiszniewski][].


[MIT]: ./License.md
[Tomek Wiszniewski]: https://github.com/tomekwi
