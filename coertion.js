var co = require('co')
var año
var a

a=null

año = (!a) ? (new Date).getFullYear() : a;

console.log(año + ' - typeof ' + typeof (año));


var cogenerador = co.wrap(
    function *siguePasos(texto1,texto2){
        "use strict";
        yield console.log(texto1);
        yield console.log(texto2);
    }
)

cogenerador('Paso1','Paso2')