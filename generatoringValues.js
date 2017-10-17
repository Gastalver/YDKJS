var gimmeSomething = (function(){  // Función envoltorio que crea scope. Ejecutada inmediatamente.
    "use strict";
    var nextVal;  // Variable del scope de la funcion envoltorio.
    return function(){  // Devuelve una función con closure a la función envoltorio. Es lo que se asigna a gimmeSomething.
        if(nextVal=== undefined){  // Si no hay nada en NextVal le asignamos el valor 1 para empezar.
            nextVal = 1;
        }
        else {
            nextVal = (3 * nextVal) + 6;
        }
        console.log(nextVal);
        return nextVal;
    }
})();

gimmeSomething();
gimmeSomething();
gimmeSomething();
gimmeSomething();
