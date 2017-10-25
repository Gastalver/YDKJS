'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PersonaSchema = new Schema({

        nombre: {
            type: String,
            set: aMayusculas,
            validate: {
                validator: function validadorNombreCliente(p) {
                    "use strict";
                    // Solo admitimos cadenas de texto
                    if (typeof(p) === 'string') {
                        // Que no estén vacías
                        if (p.length === 0) return false;
                        // Y que no contengan caracteres distintos a letras de A a Z o barra o espacio en blanco o punto o guión medio
                        return !(/[^a-zA-ZáéíóúÁÉÍÓÚ/\s.,-]+/i.test(p))
                    }
                    else {
                        return false
                    }
                },
                message: '{VALUE} no es un nombre válido. Sólo admite letras, espacio, /, y .'
            },
            unique: true,
            required: true,
            trim: true,
            index:true
        },
        tipoPersona: {
            type: String,
            enum: ['Cliente','Contrario','Abogado','Procurador'],
            required: true,
            index: true
        },
        direccion: {
            type: String
        },
        cp: {
            type: Number
        },
        localidad: {
            type: String,
            trim: true},
        email: {
            type: String,
            trim: true
        },
        telefonos: [{
            tipo: String,
            num: Number,
        }]
    }, // OPCIONES DEL SCHEMA
    {
        runSettersOnQuery: true, // Usa los setters en los Query.
        getters: true, // Usa los getters siempre.
        validateBeforeSave: true, // Con validación automática.
        strict: false, // Al hacer update y find one and Update actualiza el schema padre y el hijo, no solo el padre.
    });

// noinspection JSValidateJSDoc
PersonaSchema.statics = {

    /**
     * Comprueba si existe tipopersona con nombre dado y sino lo crea, devolviendo una promise por el ID.
     * @param {string} tipopersona
     * @param {string} nombre
     * @returns {Promise}
     */
    dameID: function (tipopersona, nombre) {
        const self = this;
        return self.findOne({tipoPersona: tipopersona, nombre: nombre}).exec()
            .then(
                function (resultado) {
                    console.log('El tipo del resultado del primer then de dameID es ' + typeof(resultado));
                    console.log('El valor del primer then de dameID es ' + resultado);
                    if (resultado) {
                        console.log('Hemos encontrado un cliente con ese nombre. Su id es :' + resultado.id);
                        return (resultado.id)
                    }
                    else {
                        console.log('No hemos encontrado a nadie con ese nombre. Creamos una nueva persona.');
                        return self.create({tipoPersona: tipopersona,nombre: nombre})
                            .then(
                                function(nuevaPersona){
                                    console.log('Creado el cliente ' + nombre + '. Tiene el id ' + nuevaPersona.id);
                                    return nuevaPersona.id
                                }
                            )
                    }
                }
            )
    }
};
PersonaSchema.methods = {};

/**
 * Convierte a Mayúsculas
 * @param v
 * @returns {string}
 */

function aMayusculas(v) {
    return v.toUpperCase();
}

/**
 * Convierte a minúsculas
 * @param v
 * @returns {string}
 */
function aminusculas(v) {
    return v.toLowerCase();
}

mongoose.model('Persona', PersonaSchema);

module.exports = PersonaSchema;

