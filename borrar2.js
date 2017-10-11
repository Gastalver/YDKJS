var serie;

function validadorSerie(serie){
    "use strict";
    // Si no es una cadena vacía o una sola letra entre la A y la Z devuelve false.
        return (((serie.length < 2) && /[A-Z]/i.test(serie)) || (serie ===''));
}

serie = "";

console.log(validadorSerie(serie)||'No supera la validación de serie');

function validadorAño(año){
    "use strict";
    // Si no es un número de uno a cuatro dígitos devuelve false.
    return ((año === '')|| /^\d{1,4}$/.test(año));

}

año = '';
console.log(validadorAño(año)||'No supera la validación de año');

console.log(
    (new Date()).getFullYear()
);

console.log((new Date()).toLocaleDateString())