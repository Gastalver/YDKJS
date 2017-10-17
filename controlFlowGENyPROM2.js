var fs = require('fs');
var superagente = require('superagent');

function p1() {
    return new Promise(
        function (resolve, reject) {
            superagente
                .get('google.com')
                .end(function (err, response) {
                    if (err) reject(err)
                    else {
                        resolve(response.text)
                    }
                });
        }
    )
}

function p2(file){
    "use strict";
    return new Promise(function(resolve,reject){
        fs.readFile(file,function(err,contenido){
            if (err) reject(err)
            else {
                resolve(contenido)
            }
        })
    })
}


function *iter(){
    "use strict";
    try{
        var primero = yield p1();
        console.log('Primero hacemos el request http a Google para ver su código:\n' + primero);
        var segundo = yield p2('texto2.txt');
        console.log('Segundo leemos el sistema de archivos.El archivo contiene:\n' + segundo);
    }
    catch (err){
        console.log('Detectado el siguiente error:\n' + err)
    }
    finally{
        console.log('Hemos terminado. Apagamos la luz.')
    }


}

var iterador = iter();
var p1code = iterador.next().value;
p1code.then(
    function fulfilled(codigo){
        "use strict";
        iterador.next(codigo)
    },
    function rejected(err){
        "use strict";
        iterador.throw(err)
    }
)

p2code = iterador.next().value;

p2code.then(
    function fulfilled(texto){
        "use strict";
        iterador.next(texto)
    },
    function rejected(err){
        "use strict";
        iterador.throw(err)
    }
)
