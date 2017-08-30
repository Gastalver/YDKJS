// En los tipos null, undefined, string, number y boolean, el cambio de referencia no cambia el valor del primitivo literal.
var a = 42
var b= a;
console.log('Antes de modificar referencia, a: ' + a); //42
b=37;
console.log('Despues de modificar referencia,a :' + a); // 42

// Pero OJO en los tipos Object, Array, Function... sí que cambian.

// Ejemplo ARRAY

var c = [1,2,3,4];
var d = c;
d.push(5);
console.log(c); // [ 1, 2, 3, 4, 5 ]
console.log(d); // [ 1, 2, 3, 4, 5 ]

// Ejemplos OBJETO

var e = {
    nombre: 'Ramon'
};
console.log(e.nombre);

var f=e;

f.nombre=f.nombre.toUpperCase();

console.log(e.nombre);

// Incluso si se asigna un nuevo valor directamente.

f.nombre='Antonio';

console.log(f.nombre); // Antonio
console.log(e.nombre); // Antonio

// Ejemplo FUNCION

var g = ['Miguel', 'Guillermo'];
function añade(array_dado){
    "use strict";
    console.log('Array Original: '+ array_dado);
    var referencia_al_array_dado = array_dado;
    console.log('Copia por Referencia: '+ referencia_al_array_dado);
    referencia_al_array_dado.push('Carmen');
    console.log('Copia por Referencia tras Push sobre él: '+ referencia_al_array_dado);
    console.log('Array Original tras Push sobre referencia: '+ array_dado);
    referencia_al_array_dado=['Rodrigo','Reyes'];
    console.log('Copia por referencia, tras nueva asignación directa:' + referencia_al_array_dado);
    console.log('Array Original tras nueva asignación sobre antigua referencia: '+ array_dado);
}

añade(g);


// Cómo modificar Array Original y Copia, por medio de una función.
var h = [1,2,3,4];
// Queremos cambiar el array que nos den como parámetro de una funcion, por otro distinto.

function sistemafallido(arrai){
    "use strict";
    console.log('arrai original: ' + arrai);
    arrai = [5,6,7,8];
    console.log('arrai despues de una asignación directa (en realidad asignación a variable parametro): '+arrai);
}

sistemafallido(h); // [ 5, 6, 7, 8 ]
console.log('Pero en realidad el arrai original sigue siendo ' + h + ' es decir, que la modificación de la referencia no ha cambiado el original');
function sistemaaficaz(arrai){
    "use strict";
    console.log('arrai antes de .lengh=0 y push sustitutivo: ' + arrai);
    arrai.length = 0;
    arrai.push(5,6,7,8);
    console.log('arrai despues de .lengh=0 y push sustitutivo: ' + arrai);
}

sistemaaficaz(h);
