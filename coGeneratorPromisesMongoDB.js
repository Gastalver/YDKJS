// Dependencias
var mongoose = require('mongoose');
var co = require('co');

// Establecemos la libreria de Promises a utilizar por Mongoose. En este caso ES6, de node.
mongoose.Promise = global.Promise;

// Esquema / Modelo / Instancia modelo
// Requerimos modelos.

require('./model1') // Expediente. Parent Schema.;
require('./model2') // Asunto. Child Schema.
require('./model3') // Cliente

const Asunto = mongoose.model('Asunto') ; // Instanciamos el modelo Asunto.
const Expediente = mongoose.model('Expediente'); // Instanciamos el modelo Expediente.
const Persona = mongoose.model('Persona') // Instanciamos el modelo Persona.

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
        var s,a,n; // Serie, Año, Numero
        var as; // Asunto
        var tip, nom // Tipo de persona, Nombre
        s='c';
        a='';
        n='';
        as= 'matrimonio/divorcio/medidas/modificación';
        tip = 'Cliente'
        nom = 'tempompa ya, pepópn'

        //1º CREAMOS DOCUMENTO

        var nuevoExpte = new Expediente();

        //2º SCHEMA (DEFAULTS) Y NOSOTROS (INPUT) ASIGNAMOS VALORES a NUEVOS DOCUMENTOS

        nuevoExpte.serie = s,
        nuevoExpte.año = (!a) ? (new Date).getFullYear() : a; // Si no hay nada, el año en curso. Luego validaré.

        //3º VALIDAMOS CAMPOS serie, año
        // La validación intentaremos hacerla en el cliente aunque el servidor también controle, por seguridad.
        var erroresValidacionExpte,mensaje;
        erroresValidacionExpte= nuevoExpte.validateSync();
        //var erroresValidacionPersona,mensajeP
        //erroresValidacionPersona = nuevaPersona.validateSync();
        if (!erroresValidacionExpte){
            console.log('No hay errores de validación en Expediente');
        }else{
            console.log('Errores de validación. Recargamos el formulario con el siguiente mensaje:')
            if (erroresValidacionExpte.errors.serie) console.log('- ' + erroresValidacionExpte.errors.serie.message);
            if (erroresValidacionExpte.errors.año) console.log('- ' + erroresValidacionExpte.errors.año.message + '.Type: ' + typeof(a));
        }
        //if (!erroresValidacionPersona){
          //  console.log('No hay errores de validación en Cliente');
        //}else{
          //  console.log('Errores de validación. Recargamos el formulario con el siguiente mensaje:')
           // if (erroresValidacionPersona.errors.nombre) console.log('- ' + erroresValidacionExpte.errors.nombre.message);
        //}

        //4º BUSCAMOS NUMERO PARA LA SERIE Y AÑO DADOS.
        yield Expediente.dameNum(nuevoExpte.serie,nuevoExpte.año)
            .then (
                function(v){
                    nuevoExpte.numero = v
                } );

        //5º COMPROBAMOS SI LA PERSONA YA EXISTE Y SI NO CREAMOS UNA
        var nuevoCliente = yield Persona.dameID('Cliente',nom)
        nuevoExpte.cliente.push(nuevoCliente)

        //6º COMPROBAMOS SI EL ASUNTO EXISTE Y SI NO CREAMOS UNO
        var nuevoAsunto = yield Asunto.dameID(as);
        nuevoExpte.asunto = nuevoAsunto

        //yield nuevoExpte.save();
    }
    catch(err){
        console.log('Errores del generador capturados por CATCH: ' + err);
    }
    finally{
        console.log('Finalizado el generador creaExpte.\n');
        var registros = yield Expediente.list();
        console.log('Estos son los registros: \n' + registros)
        console.log('registros[0].cliente[0].nombre: ' + registros[0].cliente[0].nombre)
        console.log('registros[0].asunto.asunto: ' + registros[0].asunto.asunto)

    }

})


function dameNum(s,a) {
    "use strict";
    Expediente.find({'serie': s,'año': a},'numero').sort({numero:-1}).limit(1).exec()
    .then(
        function(resultado){
            if (resultado.length==0){
                return (1)
            } else {
                return resultado[0].numero+1
            }
        })
}


