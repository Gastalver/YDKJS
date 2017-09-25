var x = 1;

// DEFINICIÓN del generador. Sintaxis alternativas:
// function *foo() == function* foo() == function*foo()

function *foo(){
    "use strict";
    x++;
    yield; // Pausa. De entre los diversos significados veo que cuadran n. RENDIMIENTO vt. CEDER EL PASO.
    console.log("x: ", x );
}

function bar(){
    "use strict";
    x++;
}

foo();

// CREACIÓN DEL ITERATOR, que controlará el flujo del GENERATOR.

var it = foo();
it.next();
bar();
it.next();


// Ejemplo de GENERATOR con INPUT
function *fooInput(x,y){
    "use strict";
    yield(x+y); // Ejemplo de YIELD con OUTPUT.
    return x*y
}

var ite = fooInput(6,7);

// EJEMPLO DE ITERATOR CON OUTPUT, RECOGIDO POR UNA VARIABLE.
var resultado = ite.next();

console.log(resultado.value);

var resultado2 = ite.next();

console.log(resultado2.value);







