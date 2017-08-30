function scope1(){
    "use strict";
    var aInScope1 = 8;
    function scope2(adenda){
        var resultado = aInScope1 + adenda;
        console.log(aInScope1 + ' + ' + adenda + ' = ' + resultado);
    }
    return scope2;  // Se entrega la propia función scope2 como valor.
}
var recibe = scope1(); // Hay que ejecutar scope1. Y la variable recibe la función scope2.
recibe(2);

// Otra manera de pasar una función

function foo(){
    "use strict";
    var a="Variable definida en scope exterior";
    function baz(){
        console.log(a);
    }
    bar(baz);
}
function bar(fn){
    "use strict";
    fn();
}

foo();