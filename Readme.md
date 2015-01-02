# web-umd

**A 6to5 module formatter tailored for the browser. Works for AMD, CJS and globals.**

[![Build status](https://img.shields.io/travis/tomekwi/web-umd.6to5.svg?style=flat-square)](https://travis-ci.org/tomekwi/web-umd.6to5) [![Code climate](https://img.shields.io/codeclimate/github/tomekwi/web-umd.6to5.svg?style=flat-square)](https://codeclimate.com/github/tomekwi/web-umd.6to5)

Use ES6 modules today – with or without the overhead of a module system. Leave the decision to the user of your code.

Useful for libraries targeted at the browser.




What's inside
-------------

In your transpiled files you get the [amdWeb][] module definition, modified to support CommonJS modules as well. The original proposal comes from the [Universal Module Definition][] working group.

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
  } else {
    factory(global.myModule = {}, global.fooFoo, global.baz);
    exportedKeys = Object.keys(global.myModule);
    if (exportedKeys.length == 1 && exportedKeys[0] == 'default') {
      global.myModule = global.myModule.default;
    }
  }

})(this, function (exports, _fooFoo, _bar) {
  "use strict";

  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  var bar = _fooFoo.foo;
  var baz = _interopRequire(_bar);

  exports["default"] = baz[bar];
});
```

_(Comments and whitespace added for clarity.)_


[amdWeb]: https://github.com/umdjs/umd/blob/master/amdWeb.js
[Universal Module Definition]: https://github.com/umdjs/umd



Installation
------------

```sh
> npm install web-umd
```




Usage
-----

Through 6to5's CLI:

```sh
6to5 --modules web-umd
```

Programatically:

```js
var to5 = require("6to5");
to5.transform('code();', {modules: 'web-umd'});
```




License
-------

[MIT][] © [Tomek Wiszniewski][].


[MIT]: ./License.md
[Tomek Wiszniewski]: https://github.com/tomekwi
