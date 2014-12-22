6to5.web-umd
============

**A module formatter tailored for the browser. Works for AMD, CJS and simple globals.**




Installation
------------

```sh
> npm install 6to5.web-umd
```




Usage
-----

Through 6to5's CLI:

```sh
6to5 --modules 6to5.web-umd
```

Programatically:

```js
var to5 = require("6to5");
to5.transform('code();', {modules: '6to5.web-umd'});
```




License
-------

[MIT][] © [Tomek Wiszniewski][].


[MIT]: ./License.md
[Tomek Wiszniewski]: https://github.com/tomekwi
