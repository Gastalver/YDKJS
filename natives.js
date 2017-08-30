// Los valores primitivos son aquellos que no son objetos sino directamente String, Numbers. etc..
var primitivo = "Primitivo";
console.log(primitivo + ' es un primitivo de tipo: ' + typeof (primitivo));
var construidoconNativo = new String("COnstructo nativo");
console.log(construidoconNativo + ' en cambio es de tipo ' + typeof (construidoconNativo));


// Los nativos Son funciones del propio engine.
// String()

var a = 'palabra'; // primitivo literal
console.log(a+' - '+ typeof(a)); // String
var b = new String("palabra creada con Nativo String");
console.log(b+' - '+typeof(b)); // object
console.log(b instanceof String); // true
console.log(Object.prototype.toString.call(b)); // [object String]


// Todos los nativos (y los literales por efecto del wrapping) tienen su .prototype object.



// Método para obtener el atributo interno [[Class]] de los Objectos. Su object wrapper subtype.
console.log(Object.prototype.toString.call([1,2,3]));
console.log(Object.prototype.toString.call({nombre:'Miguel'}));
console.log(Object.prototype.toString.call(function(){}));
console.log(Object.prototype.toString.call(/regExliteral/));
console.log(Object.prototype.toString.call(null));
console.log(Object.prototype.toString.call(undefined));

// Los valores primitivos no tienen los métodos del prototipo de su respectivo tipo. Para ello
// se envuelven manual o automáticamente (BOXING) en un object.wrapper que se los adjunta. No es aconsejable
// el wrapping manual. Es mejor confiar en el automático.
var c = 42;
console.log(typeof(c));
Number.prototype.toString.call(c);
console.log(typeof(c));

//Array
var xx = new Array(1,2,3,4); // En el caso de los arrays, no hace falta indicar new. El resultado es igual.
console.log(xx);
console.log(typeof (xx));
console.log(Object.prototype.toString.call(xx));

// Date()
console.log('Date -- sin new');
var fecha = Date(); // sin new, devuelvue un string con la fecha.
console.log(fecha);
console.log(typeof(fecha));
console.log('Date -- sin new con método now()');
var fecha2 = Date.now(); // sin new, con método now, devuelve el núm. de segs. desde el 1 enero 1970.
console.log(fecha2);
console.log(typeof(fecha2));
console.log('Date -- con new');
var fecha3 = new Date(); // con new, devuelve un objeto fecha.
console.log(fecha3);
console.log(typeof(fecha3));
fecha3='1969-08-16';
console.log(fecha3);


// Error()
function generaerror(x){
    "use strict";
    var errores;
    if (!x){
        //throw new Error('Error para la consola');
        var errores = new Error('Error para una log de errores');
            }
    return errores;
}

console.log(generaerror());


