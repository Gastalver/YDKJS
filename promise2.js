var superagente = require('superagent')
function p1(url) {
    return new Promise(
        function (resolve, reject) {
            superagente
                .get(url)
                .set('accept', 'html')
                .end(function (err, response) {
                    if (!err) {
                        resolve(response.text);
                    }
                    else reject(err);
                });
        }
    )
}

var codigo = p1('google.com');
codigo.then(
    function fulfilled(codigo){
        console.log('Código recibido:\n' + codigo)
},
    function rejected(err){
        "use strict";
        console.log('Error detectado:\n' + err)
    }
)
