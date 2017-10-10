var busca = require('./buscaCadena');
var co = require('co');
var superagent = require('superagent');
var capturacodigo = function(url){
    "use strict";
    return new Promise(function(resolve,reject){
        superagent
            .get(url)
            .set('accept','html')
            .set('accept-charset','utf-8')
            .end(function(err,respuesta){
                if(!err){
                    resolve(
                        busca.titulo(respuesta.text)
                    )
                }
                else reject(err);
            })
    })
};
var fs = require('fs');
var leearchivo = function(file) {
    "use strict";
    return new Promise(function(resolve,reject){
        fs.readFile(
            file,
            function(err,resultado){
                if(err){
                    reject(err)
                }
                else {
                    resolve(resultado);
                }
            }
        )
    })
}
var extraetitulo = function(codigo){
    "use strict";

}

co(function *generador(){
    "use strict";
    var codigo1 = yield capturacodigo('www.forodivorcio.com');
    console.log('PROMESA UNO TERMINADA: ' + codigo1);
    var codigo2 = yield capturacodigo('www.gastalverabogados.com');
    console.log('PROMESA DOS TERMINADA: ' + codigo2);
    var codigo3 = yield leearchivo('texto2.txt');
    console.log('EJECUTADA FUNCION LEERARCHIVO: '+ codigo3);
}).catch(onerror);

function onerror(err){
    "use strict";
    console.log("GESTOR DE ERRORES: " + err.stack);
}