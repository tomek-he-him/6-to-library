 [![Build status](https://img.shields.io/travis/tomekwi/6-to-library.js/master.svg?style=flat-square)](https://travis-ci.org/tomekwi/6-to-library.js)
 [![Code climate](https://img.shields.io/codeclimate/github/tomekwi/6-to-library.js.svg?style=flat-square)](https://codeclimate.com/github/tomekwi/6-to-library.js)
 [![David](https://img.shields.io/david/tomekwi/6-to-library.js.svg?style=flat-square)](https://david-dm.org/tomekwi/6-to-library.js)

6-to-library
============

**This library is deprecated.** It turns out, that the core 6to5 team was working on the same feature in parallel. Starting from version 2.7.0, 6to5 exports a module directly when only the `default` is exported.

***

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


##### 1. Write your library

Say your library should uppercase the first letter of a string. You write in ES6 in the file `es6/up-first-letter.js`:

```js
export default function (string) {
  return string.charAt(0).toLocaleUpperCase() + string.substr(1);
  }
```


##### 2. Transpile through 6to5's CLI

```sh
$ 6to5  --modules 6-to-library  --out-file index.js  es6/up-first-letter.js
```

Make sure `6to5` is installed globally, or run the local `node_modules/6to5/bin/6to5/index.js` instead.


#####  …or programatically:

Add the option `modules: "6-to-library"` to your `require("6to5").transform` call. You can also pass this option directly to [gulp-6to5][] or [grunt-6to5][].

[gulp-6to5]: https://www.npmjs.com/package/gulp-6to5
[grunt-6to5]: https://www.npmjs.com/package/grunt-6to5


##### 3. Publish your library

`npm publish`, `git push`, or whatever you normally do.


##### 4. Profit!

After your users install your library, they can do whatever they're used to. Without any transformer.

Using CommonJS in node:

```js
var upFirstLetter = require("up-first-letter");
upFirstLetter("ęéë");  // » "Ęéë"
```

Using globals in the browser:

```html
<script src="bower_components/up-first-letter/index.js"></script>
<script>
  upFirstLetter("ęéë");  // » "Ęéë"
</script>
```

Using AMD with RequireJS:

```js
require(["up-first-letter/index"], function (upFirstLetter) {
  upFirstLetter.default("ęéë");  // » "Ęéë"
  });
```

And using the shiny new ES6 modules:

```js
import upFirstLetter from "./up-first-letter/es6/up-first-letter";
upFirstLetter("ęéë");  // » "Ęéë"
```




Example
-------

You can have a look at the npm module [as][as.js], built using the 6-to-library formatter.

[as.js]: https://www.npmjs.com/package/as




How does it work
----------------

##### Export/import names

[“ECMAScript 6 favors the single/default export style, and gives the sweetest syntax to importing the default.”][david-herman] We do the same. If you only export the default, your library will work as seamlessly as in the examples above.

Otherwise you'll have to reference each export by its specifier:

```js
// original.js
export default 1;
export const two = 2;

// CommonJS
var one = require('original').default;
var two = require('original').two;

// Globals
var one = original.default;
var two = original.two;
```

[david-herman]: https://esdiscuss.org/topic/moduleimport#content-0


##### Global names

When neither AMD nor CommonJS is supported, properties of the global object will be used as namespaces for every individual file (usually `window` or `global`).

The name of the object _exported to_ the global scope is the basename of the module's file, camel-cased.

The name of an object _imported from_ the global scope is the specifier of the default import (only if you're using the syntax `import foo from "bar"`), or the camel-cased name of the referenced file.

```js
// my-module.js
import $ from "jquery";  // Maps to window.$
import {default as module} from "other-module";  // Maps to window.otherModule
export default "exported value";  // Maps to window.myModule
```


##### The inner workings

In your transpiled files you get a variation of the [UMD][] module definition, tailor-cut to support all endpoints seamlessly.

For the input file `my-module.js`:

```js
import {foo as bar} from "./foo-bar";
import baz from "bar";

export default baz[bar];
```

You get the following output:

```js
(function (global, factory) {
  var root, exportsName, factoryArguments;

  // AMD
  if (typeof define === "function" && define.amd) {
    define(["exports", "./foo-bar", "bar"], factory);

  } else {

    // CommonJS
    if (module && typeof module.exports !== "undefined") {
      factoryArguments = [module.exports, require("./foo-bar"), require("bar")];
      root = module;
      exportsName = "exports";

    // Globals
    } else {
      factoryArguments = [global.myModule = {}, global.fooBar, global.baz];
      root = global;
      exportsName = "myModule";
    }

    factory.apply(null, factoryArguments);

    // If only the default value is exported, may the good be done.
    if (Object.keys(root[exportsName]).length == 1 && root[exportsName].propertyIsEnumerable("default")) {
      root[exportsName] = root[exportsName]["default"];
    }
  }
})(this, function (exports, _fooBar, _baz) {
  "use strict";

  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  // Here comes your code. Not much of it in this example.
  var bar = _fooBar.foo;
  var baz = _interopRequire(_baz);

  exports["default"] = baz[bar];
});
```

_(Comments and whitespace added for clarity.)_


[UMD]: https://github.com/umdjs/umd




License
-------

[MIT][] © [Tomek Wiszniewski][].


[MIT]: ./License.md
[Tomek Wiszniewski]: https://github.com/tomekwi
