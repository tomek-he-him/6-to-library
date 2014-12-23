import "foo";
import "foo-bar";
import "./directory/foo-bar";
import baz from "foo";
import * as baz from "foo";
import {bar} from "foo";
import {foo as bar} from "foo";

export {test};
export var test = 5;

export default test;
