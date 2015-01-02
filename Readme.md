# web-umd

**A 6to5 module formatter tailored for the browser. Works for AMD, CJS and globals.**

[![Build status](https://img.shields.io/travis/tomekwi/web-umd.6to5.svg?style=flat-square)](https://travis-ci.org/tomekwi/web-umd.6to5) [![Code climate](https://img.shields.io/codeclimate/github/tomekwi/web-umd.6to5.svg?style=flat-square)](https://codeclimate.com/github/tomekwi/web-umd.6to5)

ES6 modules today – on the server or in the browser – with or without the overhead of a module system – even just as a `<script>` tag.

Leave these decisions to the user of your code.




Installation
------------

```sh
> npm install web-umd
```




Usage
-----

Through the 6to5 CLI:

```sh
6to5 --modules web-umd ...
```

Programatically:

```js
var to5 = require("6to5");
to5.transform('...', {modules: 'web-umd'});
```

In your transpiled files you get the [amdWeb][] module definition, modified to support CommonJS modules as well. The original proposal comes from the [UMD][] working group.

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




License
-------

[MIT][] © [Tomek Wiszniewski][].


[MIT]: ./License.md
[Tomek Wiszniewski]: https://github.com/tomekwi
