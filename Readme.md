# web-umd [![Build status](https://img.shields.io/travis/tomekwi/web-umd.6to5.svg?style=flat-square)](https://travis-ci.org/tomekwi/web-umd.6to5) [![Code climate](https://img.shields.io/codeclimate/github/tomekwi/web-umd.6to5.svg?style=flat-square)](https://codeclimate.com/github/tomekwi/web-umd.6to5)

**A 6to5 module formatter tailored for the browser. Works for AMD, CJS and globals.**




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
