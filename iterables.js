// Generación y extracción de valores con un Generator y un iterator.

function *algo(){
    "use strict";
    var siguienteValor;
    while(true){
        if (siguienteValor === undefined){
            siguienteValor = 1;
        }
        else {
            siguienteValor = (3*siguienteValor)+6;
        }
        yield siguienteValor;
    }
}

var it = algo();
var valor;
for (var x= 0; x<11; x++){
    valor = it.next().value;
    console.log(x + ' : ' + valor);
}

// La manera más fácil es con el nuevo bucle for...of 
// que opera sobre iterables.

for (v of algo()){
    console.log(v);
    if (v>10000){
        break;
    }
}