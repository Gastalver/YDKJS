exports.titulo = function(codigo){
    "use strict";
    var inicio = codigo.indexOf('<title>') + 7;
    var fin = codigo.indexOf('</title>');
    return codigo.slice(inicio,fin);
}