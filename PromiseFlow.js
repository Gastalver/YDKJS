var fs = require('fs');

var texto = new Promise(function(resolve,reject){
    "use strict";
    fs.readFile('texto.txt',function(err,txt){
        if (!err) resolve(txt);
        else reject(err);
    });

    });

texto.then(function fulfilled(txt){
    "use strict";
    console.log("En el archivo pone: " + txt);
    return Promise.resolve(txt);
},
    function rejected(err){
    "use strict";
    console.log("El proceso ha fallado con el error: ", err)
        return Promise.reject(err);
    })
    .then(function fulfilled(txt){
        "use strict";
        console.log(txt.toString().toUpperCase())
    })





