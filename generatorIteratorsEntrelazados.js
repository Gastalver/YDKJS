var a = 1;
var b = 2;

function *foo(){
    "use strict";
    a++;
    yield;
    b = b * a;
    a = (yield b) + 3;
}

function *bar(){
    "use strict";
    b--;
    yield;
    a = (yield 8) + b;
    b = a * (yield 2);
}

function step(gen){
    "use strict";
    var it = gen();
    var last;
    return function(){  // Devuelve lo que haya recibido antes.
        last = it.next(last).value;
    }
}

var s1 = step(foo);  // Crea el iterator de foo y asigna a s1 la función.
var s2 = step(bar); // Crea el iterator de bar y asigna a s2 la función.

// Ahora podemos entrelazar las iteraciones.

s1();
s1();
s1(); // La última iteración no se ve. Los valores se devuelven por un presunto return.
s2();
s2();
s2();
s2();
console.log(a,b);
//
