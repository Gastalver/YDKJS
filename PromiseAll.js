//Ejemplo de Promise.All

var fs = require('fs');

var t1 = new Promise(function(resolve,reject){
    "use strict";
    fs.readFile('texto.txt',function(err,txt){
        if(!err) resolve(txt)
        else reject(err)
    })
})

var t2 = new Promise(function(resolve,reject){
    "use strict";
    fs.readFile('texto2.txt',function(err,txt){
        if(!err) resolve(txt)
        else reject(err)
    })
})

Promise.all([t1,t2])
    .then(
        //Leidos los dos archivos asíncronamente, entonces...
    function fulfilled(texto){
        "use strict";
        console.log('En el primer archivo pone: ' + texto[0] + '\n' + 'Y en el segundo: ' + texto[1]);
        return Promise.resolve(texto); // Se envia una nueva promise para encadenar el FLOW
    },
        function rejected(err){
        "use strict";
        console.log('Se ha producido el error: ' + err);
        return Promise.reject(err)
        }
    )
    .then(
        function fulfilled(toxto){ // Se recibe la nueva promise con los mismos valores resueltos.
            "use strict";
            console.log(Object.prototype.toString.call(toxto)); // Recibimos un objecto array.
            console.log(toxto.length) // De dos elementos.
            console.log(toxto[1].toString()); // ¿Por qué ahora tenemos que pasar a string, y antes no?
            
        }
    )

fs.appendFile('texto.txt','\nCadena de texto añadida','utf8',function(err,file){
    "use strict";
    if (!err) {
        console.log('Ejecutada la escritura');
        console.log(typeof file)
    }

})

