// Dependencias
var mongoose = require('mongoose');
var co = require('co');

// Establecemos la libreria de Promises a utilizar por Mongoose. En este caso ES6, de node.
mongoose.Promise = global.Promise;

// Esquema / Modelo / Instancia modelo
require('./model1');
const Expediente = mongoose.model('Expediente');

// Conexión. Como es una promesa, usamos then para el control de flujo asíncrono, invocando un generator.
mongoose.connect('mongodb://localhost/YDKJS',{
    useMongoClient: true
}).then(
    function fulfilled(){
        "use strict";
        console.log("Conexión establecida con MongoDB");
        //buscanumero('',2017);
        Expediente.find({'serie': '','año': 2016},'numero').sort({numero:-1}).limit(1).exec().then(
            function fulfilled(v) {
                if (v.length==0){
                    console.log("No había, así que el número será 1")
                } else {
                    console.log(v[0].numero)
                }
            },
            function rejected(err){
                console.log(err)
            }
        )
    },
    function rejected(err){
        "use strict";
        console.log("Error de conexión: " +err);
    }
);

var buscanumero = co.wrap( function *buscaNumero(s,a){
    "use strict";
    var num = yield Expediente.find({'serie': s,'año': a},'numero').sort({numero:-1}).limit(1);
    console.log(num[0].numero);
}
);