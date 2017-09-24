var x = 1;

// Construcción del generador. Sintaxis alternativas:
// function *foo() == function* foo() == function*foo()

function *foo(){
    "use strict";
    x++;
    yield; // Pausa. Yield significa
    console.log("x: ", x );
}

function bar(){
    "use strict";
    x++;
}

foo();

var it = foo();
it.next();
bar();
it.next();