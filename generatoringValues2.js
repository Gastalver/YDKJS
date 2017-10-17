// AHora con el añadido manual del interface NEXT de un ITERATOR.

var gimmeSomething = (function() {  // Función envoltorio que crea scope. Ejecutada inmediatamente.
    "use strict";
    var nextVal;  // Variable del scope de la funcion envoltorio.
    return {  // Devolvemos un objeto, con el método next. QUe a su vez es una función que devuelve otro objeto.
        // Necesario para los loops 'for..of'
        [Symbol.iterator]: function () { return this; },

        next: function () {
            if (nextVal === undefined) {  // Si no hay nada en NextVal le asignamos el valor 1 para empezar.
                nextVal = 1;
            }
            else {
                nextVal = (3 * nextVal) + 6;
            }
            //console.log(nextVal);
            return {done: false, value: nextVal};
        }
    };
})();

//gimmeSomething.next().value;
//gimmeSomething.next().value;
//gimmeSomething.next().value;
//gimmeSomething.next().value;


// Bucle for...of. Es una nueva estructura basada en ITERABLES.
for (var v of gimmeSomething){  // v toma en cada iteración el valor de gimmeSomething.next().value--NO ENTREGA VALOR
  console.log(v);
// Como nuestro iterado siempre devuelve done: false, es infinito, y hay que evitar que el bucle se eternice
   if (v > 500){
   break;
  }
}



var arr = [9,5,4,6,5,5,6,0,0];

for (v of arr){
    console.log(v);
}