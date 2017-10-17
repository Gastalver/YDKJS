var fs = require('fs');

function leeArchivo(file){
    "use strict";
    fs.readFile(file, function(err,text){
        if (err) iterador.throw(err)
        else iterador.next(text)
    })
}


function *iter(){
    "use strict";
    try {
        var texto1 = yield leeArchivo('texto.txt');
        console.log('El primer archivo contiene el siguiente texto:\n' + texto1);
        var texto2 = yield leeArchivo('texto2.txt');
        console.log('El segundo archivo contiene el siguiente texto:\n' + texto2)
    }
    catch(err){
        console.log('Se ha producido el error:\n' + err);
    }
    finally {
        console.log('Hemos terminado. Apago la luz.')
    }
}

var iterador = iter();
iterador.next();