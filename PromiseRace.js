// Utilidad para crear Promises cronometradas.
function retrasaPromise(delay, nombre){
    "use strict";
    return new Promise(function(resolve,reject){
        setTimeout(function () {
            resolve(nombre)
        }, delay)
    });
}
// Utilidad para crear un error TimeOut
function timeOutPromise(tiempoError){
    "use strict";
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            reject('¡TimeOut! Presunto fallo por haber tardado más de ' + tiempoError/1000 + 'segs.')
        },tiempoError)
    })
}


// Una carrera, la primera Promise que se resuelva gana.
Promise.race([
    retrasaPromise(1000,'Ganó la que salió con un segundo de ventaja'),
    retrasaPromise(3000,'Ganó la que salió tres segundos de ventaja'),
    retrasaPromise(5000,'Ganó la que salió con medio segundo de ventaja'),// Quitar un 0 para demostrar
    timeOutPromise(6000)
])
.then(
    function fulfilled(nombre){
        "use strict";
        // Y el ganador es...
        console.log(nombre);
    },
    function rejected(err){
        "use strict";
        // Por si hubiera errores
        console.log('Error: ' + err );
    }
)

// Este esquema se puede usar para establecer un TimeOut, haciendo competir lo que sea
// con una promise que al cabo de x tiempo, se rechaza. Para eso sirve timeOutPromise.
// Si gana la carrera es porque la otra Promise ha fallado o se ha quedado colgada.





