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
        var serie = '';
        var año = 2017;
        Expediente.dameNum(serie,año).then(
            function(v){
                console.log('Expediente.dameNum\(' + serie + ',' + año + '\) arroja el valor ' + v);
            }
        )
        Expediente.cuentaExpts(false).then(
            function(v){
                console.log('Total expedientes vivos: ' + v)
            }
            )
        Expediente.cuentaExpts(true).then(
            function(v){
                console.log('Total expedientes archivados: ' + v)
            }
        )


    },
    function rejected(err){
        "use strict";
        console.log("Error de conexión: " +err);
    }
);

var buscaNum = function buscaNumero(s,a){
    "use strict";
        var num = Expediente.find({'serie': s,'año': a},'numero').sort({'numero':-1}).limit(1).exec()
        num.then(
            function(resultado){
                if (resultado.length==0){
                    return (1)
                } else {
                    return resultado[0].numero+1
                }
    })
}
