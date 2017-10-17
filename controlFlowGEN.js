var superagent = require('superagent');

// CONTROL FLOW CON GENERATOR.

function requiere(){
    superagent
        .get('https://www.gastalverabogados.com')
        .end(function(err,response){
            if (err) {
                iterador.throw(err);
            }
            else {
                iterador.next(response.text);
            }
        });
}

function *generadorFlow(){
    "use strict";
    try{
        var codigo = yield requiere();
        console.log('Request por medio de generator:\n' + codigo);
    }
    catch(err){
        console.log('Se recibió el error: \n',err);
    }
    finally {
        console.log('Finalmente, hacemos limpieza y apagamos la luz.');
    }
}

var iterador = generadorFlow();
iterador.next();


