'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var AsuntoSchema = require('./model2');


const ExpedienteSchema = new Schema({

    archivado: {
            type: Boolean,
            index: true,
            default: false},

    serie:{ type: String,
            set: aMayusculas, trim:true,
            validate: {
                validator: function validadorSerie(s){
                    "use strict";
                    // Si es una cadena vacía (caso frecuente) se valida rápido.
                    if(s=='') return true;
                    // Si no, solo admitimos String.
                    if (typeof(s)== 'string') {
                        // Y solo admitimos un carácter, si tiene más no vale.
                        if (s.length>1) return false;
                        // Por último solo admitimos las letras A-Z.
                        return /[A-Z]/i.test(s)
                    }
                    else {
                        return false
                    }
                },
                message: '{VALUE} no es una serie válida. Debe ser una letra entre A y Z, o ninguna.'
            },
            index: true
    },

    año: {  type: Number,
            validate: {
                validator: function validadorAño(a) {
                    "use strict";
                    // Si es una cadena vacía (caso frecuente), validado automáticamente. Se usará el año actual.
                    if (a == '') return true
                    // Si no, sólo admitimos números.
                    if(typeof(a)=='number'){
                        // Que estén entre 0 y 9999.
                        return ((a >=0) && (a<=9999))
                    } else {
                        return false
                    }
                },
            message: '{VALUE} no es un año válido. Debe ser un número entre 0 y 9999 o vacío (año actual)'
            },
            index: true
    },

    numero: {
            type: Number,
            index: true},

    asunto: AsuntoSchema,

    cliente: [{ type: Schema.ObjectId, ref: 'Persona' }], // Ref.a ID de un documento en otra colección.

    fechaApertura  : { type : Date} // Default no que se actualizaría
}, // OPCIONES DEL SCHEMA
    { runSettersOnQuery: true, // Usa los setters en los Query.
        getters: true, // Usa los getters siempre.
        validateBeforeSave: false, // Sin validación automática, sólo manual.
        timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion'}, // AÑade campos timestamp automáticamente, con esos nombre.
        strict: false, // Al hacer update y findoneandUpdate actualiza el schema padre y el hijo, no solo el padre.
    });

ExpedienteSchema.statics = {

   /**
    * Asigna Referencia
    *
    * @param - {String, Number,Number} Serie, Año, Número
    * @api private
    * */

dameNum: function(serie,año){
    return this.find({'serie': serie,'año': año},'numero').sort({numero:-1}).limit(1).then (
        function(recs){
            if (recs.length == 0){
                return 1
            }else{
                return recs[0].numero+1
            }

        })
   },
    /**
     * Cuenta Vivos / Archivados o no.
     *
     * @param {Boolean} archivado
     * @api private
     */

    cuentaExpts: function (archivado) {
        return this.count({archivado: archivado}).exec(); //  TODO Callback para gestionar errores o logs.
    },

    /**
     * Find article by id
     *
     * @param {ObjectId} id
     * @api private
     */

    load: function (_id) {
        return this.findOne({ _id }) // Es una Promise
            .populate('usuario asunto cliente contrario')
            .exec(); //  TODO Callback para gestionar errores o logs.
    },

    /**
     * List articles by referencia
     *
     * @param {Object} options
     * @api private
     */

    list: function (options) {
        const criteria = options.criteria || {};
        const page = options.page || 0;
        const limit = options.limit || 30;
        return this.find(criteria)
            .populate('cliente', 'nombreOrazon')
            .populate('asunto', 'asunto')
            .sort({ referencia: -1 })
            .limit(limit)
            .skip(limit * page)
            .exec();
    }
};


ExpedienteSchema.methods = {

    /**
     * Save expediente
     *
     * @param {Object} images
     * @api private
     */

    Guardar: function () {
        const err = this.validateSync();
        if (err && err.toString()) throw new Error(err.toString());
        return this.save();
    },

    /**
     * Añadir actuación
     *
     * @param {Date} fecha
     * @param {String} acción
     * @api private
     */

    añadeActuacion: function (fecha, accion) {
        this.actuaciones.push({
            fecha: fecha,
            accion: accion
        });
        return this.save();
    },

    /**
     * Remove comment
     *
     * @param {commentId} String
     * @api private
     */

    eliminaActuacion: function (actuacionId) {
        const index = this.actuaciones
            .map(actuacion => actuacion.id)
            .indexOf(actuacionId);

        if (~index) this.actuaciones.splice(index, 1);
        else throw new Error('Actuación no encontrada');
        return this.save();
    }
};

function aMayusculas(v){
    return v.toUpperCase();
}

function aminusculas(v){
    return v.toLowerCase();
}

mongoose.model('Expediente', ExpedienteSchema);
