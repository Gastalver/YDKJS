function *generador(){
    "use strict";
    try{    // Utilizamos la estructura try/catch/finally y así capturamos errores y gestionamos cierre.
        var valor;
        while(true){  // Bucle infinito
            if (valor === undefined){ // Si todavía no se le ha asignado un valor y por lo tanto está indefinida...
                valor = 1;
            }
            else {
                valor = (3 * valor) + 6;
                // valor = valor.toUpperCase();  //-> Provocamos un error que capturará catch.
            }
            yield valor;
            console.log('Valor tras el yield, en el generador: ' + valor);
        }
    }
    catch(err) {
        console.log('Capturados errores: ' + err);
    }
    finally{
        console.log('Bucle finalizado. Realizadas labores finales.');
    }


}

var iterador = generador();
var valorNext;
valorNext= iterador.next().value;
valorNext= iterador.next().value;
valorNext= iterador.next().value;
valorNext= iterador.next().value;
valorNext= iterador.next().value;
console.log(iterador.return('Valor enviado via iterador.return').value);


// Como generador tiene un iterador podemos recorrerlo con un bucle for..of sobre el GENERADOR.

for (v of generador()){
    console.log(v);
    if (v > 1000000){
        break;
    }
}
