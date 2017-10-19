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
                    if (typeof(p) == 'string') {
                        // Que no estén vacías
                        if (p.length == 0) return false;
                        // Y que no contengan caracteres distintos a letras de A a Z o barra o espacio en blanco o punto o guion medio
                        return !(/[^a-zA-ZáéíóúÁÉÍÓÚ//\s.,-]+/i.test(p))
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
        validateBeforeSave: false, // Sin validación automática, sólo manual.
        strict: false, // Al hacer update y findoneandUpdate actualiza el schema padre y el hijo, no solo el padre.
    });

PersonaSchema.statics = {

    /**
     * Comprueba si la persona ya existe. Si existe devuelve el id, si no existe la graba y devuelve el id.
     *
     * @param {String} persona - Nombre o razón social de la nueva persona
     * @api private
     */

    dameID: function (tipopersona, persona) { // TODO Recodificar con Promise para gestionar asincronicidad correctamente.
        var self = this;
        var personaID = this.findOne({nombre: persona}, function (error, resultado) {
            if (error) throw error;
            console.log('Comprobando si la persona ya existe...');
            if (resultado) {
                console.log('Ya existe una persoba con el nombre ' + persona + '. Su _id es ' + resultado._id);
                return resultado._id;
            }
            else {

                console.log('No existe. Creando nueva persona...');

                self.create({
                    tipoPersona: tipopersona,
                    nombre: persona
                }, function (error, nuevaPersona) {
                    if (error) throw error;
                    console.log('Nueva persona creada, su Id es ' + nuevaPersona.id);
                    return nuevaPersona._id;
                });
            }
        });
        return personaID;
    }
}

PersonaSchema.methods = {};

function aMayusculas(v) {
    return v.toUpperCase();
}

function aminusculas(v) {
    return v.toLowerCase();
}

mongoose.model('Persona', PersonaSchema);

module.exports = PersonaSchema;

