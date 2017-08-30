// MODULE PATTERN

function foo(){
    "use strict";
    var algo = "acojonante";
    var otracosa = [1,2,3,4,5];
    function hazAlgo(){
        console.log(algo);
    }
    function hazOtraCosa(){
        console.log(otracosa.join(' - '));
    }

    return {      // CLOSURE. Sacamos las funciones como métodos del objeto, y conservan su lexical scope.
        hazAlgo: hazAlgo,  // Sacamos las funciones como tales, no el valor que devuelven si se ejecutan.
        hazOtraCosa: hazOtraCosa // Por eso no llevan () al final.
    }
}

var instancia = foo();

instancia.hazAlgo();
instancia.hazOtraCosa();

// MODULO CON PARÁMETROS.

function manipuladorPalabra(palabra){
    "use strict";
    var materia = palabra;
    function mayusculiza(){
        if (typeof materia === 'string'){
            materia = materia.toUpperCase();
            console.log('Pasando ' + palabra + ' a mayúsculas: ' + materia);
        } else {
            console.log(palabra + " no es una palabra, no se puede mayusculizar");
        }
    }
    return {
        mayusculiza: mayusculiza // Sacamos la función fuera de su lexical scope, pero lo recuerda.
    }
}

var Optimizador1 = manipuladorPalabra(1234);
Optimizador1.mayusculiza();
var Optimizador2 = manipuladorPalabra("Hola me llamo Miguel");
Optimizador2.mayusculiza();

// MODULO DE INSTANCIA ÚNICA. SE ASIGNA COMO IIFE A UNA VARIABLE.
// CFR. TAMBIEN EL RETORNO DE UN OBJETO DE NOMBRE API. ES OTRA FORMA MÁS EXPLÍCITA Y DOCUMENTADA.

var instanciaUnica = (
    function miModulo(id){
        "use strict";

        function cambiaMayMin(){
            if (API.identificate == identificate1 ) {
                API.identificate = identificate2;
            } else {
                API.identificate = identificate1;
            }
        }
        function identificate1() {
            console.log(id);
        }
        function identificate2() {
            console.log(id.toUpperCase());
        }

        var API = {
            identificate: identificate1,
            cambiaMayMin: cambiaMayMin
        }
        return API;
    }

)("Modulo de instancia única");

instanciaUnica.identificate();
instanciaUnica.cambiaMayMin();
instanciaUnica.identificate();
instanciaUnica.cambiaMayMin();
instanciaUnica.identificate();
instanciaUnica.cambiaMayMin();
instanciaUnica.identificate();