'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PersonaSchema = new Schema({

        nombre: {type: String,
            set: aMayusculas,
            validate:{
                validator: function validadorNombreCliente(p){
                    "use strict";
                    // Solo admitimos cadenas de texto
                    if (typeof(p)=='string'){
                        // Que no estén vacías
                        if (p.length == 0) return false
                        // Y que no contengan caracteres distintos a letras de A a Z o barra o espacio en blanco o punto o guion medio
                        return !(/[^a-zA-ZáéíóúÁÉÍÓÚ//\s.,-]+/i.test(p))
                    }
                    else {
                        return false
                    }
                },
                message: '{VALUE} no es un nombre válido. Sólo admite letras, espacio, /, y .'
            }
        },

        direccion: {type: String} // TODO completar campos

    }, // OPCIONES DEL SCHEMA
    { runSettersOnQuery: true, // Usa los setters en los Query.
        getters: true, // Usa los getters siempre.
        validateBeforeSave: false, // Sin validación automática, sólo manual.
        strict: false, // Al hacer update y findoneandUpdate actualiza el schema padre y el hijo, no solo el padre.
    });

AsuntoSchema.statics = {
};

AsuntoSchema.methods = {
};

function aMayusculas(v){
    return v.toUpperCase();
}

function aminusculas(v){
    return v.toLowerCase();
}

mongoose.model('Asunto', AsuntoSchema)

// mongoose.model('Asunto', AsuntoSchema); Generamos el modelo en el archivo coGeneratorPromisesMongoDB.js

module.exports = AsuntoSchema;

