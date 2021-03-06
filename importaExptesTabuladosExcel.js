var mongoose = require('mongoose');
var fs = require('fs');
var co = require('co');

function leeArchivo(archivo){
    return new Promise(function(resolve,reject){
        fs.readFile(archivo,function(err,contenido){
            if(err) reject(err)
            resolve(contenido)
        })
    })
}

function convierteArchivoEnArrayObjetos(archivo){

    var cadenaconretornos = archivo.toString();
    var cadena = cadenaconretornos.replace(/\r/g,'');

    var lineas = cadena.split('\n');
    console.log('Hay ' + lineas.length + ' filas.')
    var registros = lineas.map(function(linea){
        return linea.split('\t')
    });
    var arrayExptes = registros.map(
        function convierteEnObjeto(registro){
            return {
                serie: registro[0].substr(0,1),
                año: registro[0].substr(2,4),
                numero: registro[0].substr(7,2),
                cliente: registro[1],
                asunto: registro[2],
                contrario: registro[3],
                órgano: registro[4],
                procedimiento: registro[5],
                autos: registro[6],
            }
        }
    )
    arrayExptes.splice(0,3);
    return arrayExptes;
}

// Iter

leeArchivo('ExpedientesUTF8.txt')  // Excel > guardar como texto (delimitado por tabulaciones) y luego NotePad++ > Codificación - Codificar en UTF8 sin BOM
    .then(
            function fulfilled(v){
                console.log(convierteArchivoEnArrayObjetos(v))
            },
        function rejected(err){
                console.log("Error al convertir en Array de Arrays: " + err)
        }
)
