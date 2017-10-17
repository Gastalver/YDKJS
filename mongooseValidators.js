var serie,año,asunto;

function validadorSerie(serie){
    "use strict";
    // Si es una cadena vacía (caso frecuente) se valida.
    if(serie=='') return true;

    // Si no, solo admitimos String.
    if (typeof(serie)=== 'string') {

    // Solo admitimos un carácter
        if (serie.length>1) return false;

        // Solo admitimos las letras A-Z o cadena vacía ''.
        return /[A-Z]/i.test(serie)
    }
    else {

        return false
    }
}

function validadorAño(año){
    "use strict";
    // Si es una cadena vacía (caso frecuente), validado automáticamente. Se usará el año actual.
    if (año == ''){
        return true
    }
    // Si no, sólo admitimos números.
    if(typeof(año)=='number'){
        // Que estén entre 0 y 9999.
        return ((año >=0) && (año<=9999))
    } else {
        return false
    }
}

function validadorAsunto(asunto){
    "use strict";
    // Solo admitimos cadenas de texto
    if (typeof(asunto)=='string'){
        // Que no estén vacías
        if (asunto.length == 0) return false
        // Y que no contengan caracteres distintos a letras de A a Z o barra o espacio en blanco o punto o guion medio
        return !(/[^//a-zA-ZáéíóúÁÉÍÓÚ\s.-]+/i.test(asunto))
    }
    else {
        return false
    }

}

serie = 'd';
año = 4444;
asunto = 'HOLA/pajarito-sin cola pero con acentuación en Á'

if (validadorSerie(serie)){
    console.log('SERIE: EL valor ' + serie + ' que es de tipo ' + typeof(serie) + ' supera la validación.')
}
else {
    console.log('SERIE: EL valor ' + serie + ' que es de tipo ' + typeof(serie) + ' NO supera la validación.')
}

if (validadorAño(año)){
    console.log('AÑO: El valor ' + año + ' que es de tipo ' + typeof(año) + ' supera la validación.')
    if (año=='') console.log('Como año era una cadena vacía se sustituye por ' + (new Date()).getFullYear())
}
else {
    console.log('AÑO: El valor ' + año + ' que es de tipo ' + typeof(año) + ' NO supera la validación.')
}

if (validadorAsunto(asunto)){
    console.log('ASUNTO: El valor ' + asunto+ ' que es de tipo ' + typeof(asunto) + ' supera la validación.')
}
else {
    console.log('ASUNTO: El valor ' + asunto+ ' que es de tipo ' + typeof(asunto) + ' NO supera la validación.')
}

