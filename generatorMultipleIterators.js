function *foo(){
    "use strict";
    var x = yield 2;
    z++;
    var y = yield(x * z);
    console.log(x,y,z);
}
var z = 1;
var it1 = foo();
var it2 = foo();

var val1 = it1.next().value; //2
var val2 = it2.next().value; //2

val1= it1.next(val2*10).value; //
val2 = it2.next(val1*5).value; //

it1.next(val2/2);
it2.next(val1/4);
