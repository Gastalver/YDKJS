// PROBLEMAS DERIVADOS DE LA IMPLEMENTACION DEL TYPE NUMBER COMO COMA FLOTANTE
var a = 0.1;
var b = 0.2;
console.log((a+b === 0.3));

// EPSILON, O MACHINE EPSILON es el margen de tolerancia que se admite para aceptar equivalencias.
// Para el type number se acepta convencionalmente 2 elevado a -52.
// En ES6 existe Number.EPSILON.
// Implementación en ES5:

if (!Number.EPSILON){
    Number.EPSILON = Math.pow(2,-52);
}

function sonrazonablementeiguales(num1,num2){
    "use strict";
    return (Math.abs(num1-num2) < Number.EPSILON);
}

console.log(sonrazonablementeiguales(a+b,0.3));

// El máximo número en coma flotante que puede representarse nos lo indica Number.MAX_VALUE
console.log('EL mayor número que admite Javscript ' + Number.MAX_VALUE);
// El mayor número entero representable con seguridad nos lo indica Number.MAX_SAFE_INTEGER
console.log('El mayor entero seguro ' + Number.MAX_SAFE_INTEGER);

