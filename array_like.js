// Se puede usar un método de Array -que no modifique internamente los datos - sobre una
// variable que no sea Array. Se invoca y ejecuta el método del prototipo.
function foo(){
    "use strict";
    var arr = Array.prototype.slice.call(arguments); // slice como un array.
    arr.push("Pushed como en un array con un préstamo de método");
    console.log(arr);
}
foo('palabra');


// El type primitivo String no es igual a Arrays.
var a="palabra";
var b= ['p','a','l','a','b','r','a'];
console.log("El tipo string y el array...");
console.log('Tienen la misma propiedad lengh: ' + a.length + ' - ' + b.length);
console.log('Pero string no tiene join ni map, aunque se pueden tomar prestados.');

// Ejemplo de préstamo de métodos
// console.log(a.join("-")); // TypeError: a.join is not a function
var c = Array.prototype.join.call(a,'-');
console.log('Join de string con un literal con un préstamo de método: ' + c);
// Adviertase que directamente convierte a del tipo String al tipo Array.

var d = Array.prototype.map.call(a, function(v){
    "use strict";
    return v.toUpperCase();
});
console.log(d);

// String no tiene el método reverse de Array
console.log(b.reverse());
// console.log(a.reverse()); // TypeError: a.reverse is not a function
// Y tampoco se puede tomar prestado porque modifica el array.
// var e= Array.prototype.reverse.call(a);
// console.log(e); // TypeError: Cannot assign to read only property '0' of object '[object String]'
// Y ello porque los strings son inmutables.

//PARA LOGRAR EL REVERSE PRIMERO HAY QUE CONVERTIR EN ARRAY CON SPLIT, APLICAR REVERSE Y LUEGO JOIN.
var f = a.split('').reverse().join('');
console.log(f);
var g = a.split('').join('-');
console.log(g);


