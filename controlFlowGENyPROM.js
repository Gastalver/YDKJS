var superagent = require('superagent');

// CONTROL FLOW CON PROMESAS

var p = new Promise(
    function(resolve,reject){
    superagent
        .get('https://www.gastalverabogados.com')
        .set('accept', 'html')
        .end(function(err,response){
        if (!err) {
            resolve(response);
        }
        else reject(err);
    });
    }
);

p.then(
    function fulfilled(response){
        "use strict";
        console.log('Request por medio de promesa:\n'  + response.text);
    },
    function rejected(err){
        "use strict";
        console.log('Se recibió el error: \n',err);
    }
);


// CONTROL FLOW CON GENERATOR.

function requiere(url){
    "use strict";
    superagent
        .get(url)
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
        var codigo = yield requiere('https://www.gastalverabogados.com');
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


