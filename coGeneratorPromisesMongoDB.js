var mongoose = require('mongoose');
require('./model1');
const Expediente = mongoose.model('Expediente');
mongoose.connect('mongodb://localhost/YDKJS').then(
    function fulfilled(){
        "use strict";
        console.log("Conexión establecida con MongoDB");
    },
    function rejected(err){
        "use strict";
        console.log("Error de conexión: " +err);
    }
)
// CREA DOCUMENTO->ASIGNA DEFAULTS->VALIDA->GRABA


var nuevoExpte = new Expediente();
nuevoExpte.serie='A';
nuevoExpte.año = '2016';
nuevoExpte.numero = '';
nuevoExpte.save();
