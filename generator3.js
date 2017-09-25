// La comunicación de mensajes via yield y next es en AMBOS SENTIDOS.

function *foo(x){
    "use strict";
    var y = x * (yield "Hello"); // PRODUCE un output
    return y;
}

var it = foo(6);

var res = it.next(); // Inicia el iterator / Recoge el output de yield. // res.value='Hello'

console.log(res.value);

res = it.next(7) // produce un INPUT que reemplazará el valor inicial de yield en el generator.

console.log(res.value) // res.value = 42