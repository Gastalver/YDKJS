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
        creaExpte(true); // Iniciamos el generator, con co.
    },
    function rejected(err){
        "use strict";
        console.log("Error de conexión: " +err);
    }
);




// CREA DOCUMENTO->ASIGNA DEFAULTS->VALIDA->GRABA

var creaExpte = co.wrap(function *itercreaExpte(){
    "use strict";

    try{
        // MOCK. Recibe Valores del formulario
        var s,a,n,as;
        s=78;
        a='ghk';
        n='';
        as= 45;

        //1º VALIDA, para consumir los mínimos recursos.
        //2º CREA DOCUMENTO.

        var nuevoExpte = new Expediente();

        //2º SCHEMA (DEFAULTS) Y NOSOTROS (INPUT) ASIGNAMOS VALORES a NUEVO DOCUMENTO

        nuevoExpte.serie = s,
        nuevoExpte.año = (!a) ? (new Date).getFullYear() : a; // Si no hay nada, el año en curso. Luego validaré.
        nuevoExpte.asunto = as;
        //nuevoExpte.numero =

        //3º FORZAMOS VALIDACIÓN
        var erroresValidacion,mensaje;
        erroresValidacion= nuevoExpte.validateSync()
        if (!erroresValidacion){
            console.log('No hay errores de validación');
        }else{
            console.log('Errores de validación. Recargamos el formulario con el siguiente mensaje:')
            if (erroresValidacion.errors.serie) console.log('- ' + erroresValidacion.errors.serie.message);
            if (erroresValidacion.errors.año) console.log('- ' + erroresValidacion.errors.año.message);
            if (erroresValidacion.errors.asunto) console.log('- ' + erroresValidacion.errors.asunto.message);
            //console.log('Errores de Validación: ', erroresValidacion.message)
        }
        //nuevoExpte.numero = yield Expediente.dameNum(s,a); // Función que me da el numero en base a la serie y el año.
    }
    catch(err){
        console.log('Errores del generador capturados por CATCH: ' + err);
    }
    finally{
        console.log('Finalizado el generador creaExpte.\n' + nuevoExpte);
    }

})




