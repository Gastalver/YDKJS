var fs = require('fs');

// Inputs y Outputs via Yield y Next

function *foo(x){
    "use strict";
    var y = x * (yield );
    return y;
}

var it = foo(6); // Crea el iterator del generator con el input 6.
it.next(); // Inicia el iterator.
var resultado = it.next(8); // Introducimos el input que representa yield, via next.
console.log(resultado.value);

