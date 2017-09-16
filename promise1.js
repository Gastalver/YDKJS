const fs = require('fs');

function leeDirectorio(directorio) {

    return new Promise(function (resolve, reject) {
        "use strict";
        fs.readdir(directorio, function (err, files) {
            if (!err) resolve(files)
            else reject(err)
        })
    })
}

leeDirectorio(__dirname).then(function(valores){
    "use strict";
    console.log(valores);
});

var o = {then: function(){}};

console.log(o instanceof Promise);
