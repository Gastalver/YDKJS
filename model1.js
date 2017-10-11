'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ExpedienteSchema = new Schema({

    archivado: {type: Boolean, default: false},
    serie:{ type: String, default: '', trim:true,
        validate: {
        validator: function validadorSerie(s){
            "use strict";
            // Si no es una cadena vacía o una sola letra entre la A y la Z devuelve false.
            return (((s.length < 2) && /[A-Z]/i.test(s)) || (s ===''));
        },
        message: '{VALUE} no es una serie válida. Debe ser una letra entre A y Z, o ninguna.'
        }
        },
    año: { type: Number, default: (new Date()).getFullYear(),
        validate: {
        validator: function validadorAño(a) {
            "use strict";
            // Si no son cuatro dígitos devuelve false.
            return /^\d{1,4}$/.test(a);
        },
            message: '{VALUE}no es un año válido. Debe ser un número entre 0 y 9999 o vacío (año actual)'
        }
    },
    numero: {type: Number},
    asunto: { type: String, default: ''},
    fechaApertura  : { type : Date} // Default no que se actualizaría
});

ExpedienteSchema.statics = {

   /**
    * Asigna Referencia
    *
    * @param - {String, Number,Number} Serie, Año, Número
    * @api private
    * */

referencia: function(serie,año,numero){
    var s,a,n = null;
    // ¿Se nos indica serie?
       if(!!serie == null){
           s = null // Si no hay serie, la serie quedará vacía
       }
       else {
           this.findOne({'serie': serie}).exec().then( // Si hay serie, comprobar si ya hay una igual registrada.
               function(resultado){
                   if (!resultado) {
                       s = serie
                   }
               }
           )

       }

   },
    /**
     * Cuenta Vivos / Archivados
     *
     * @param - sin parámetros.
     * @api private
     */

    cuentaVivos: function () {
        return this.count({archivado: false})
            .exec(); //  TODO Callback para gestionar errores o logs.
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
        const err = this.validateSync();  // TODO Crear validación de campos Expediente en Schema.
        if (err && err.toString()) throw new Error(err.toString());
        return this.save();

        /*
         if (images && !images.length) return this.save();
         const imager = new Imager(imagerConfig, 'S3');

         imager.upload(images, function (err, cdnUri, files) {
         if (err) return cb(err);
         if (files.length) {
         self.image = { cdnUri : cdnUri, files : files };
         }
         self.save(cb);
         }, 'article');
         */
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



mongoose.model('Expediente', ExpedienteSchema);
