function mimodulo(palabra){

    var materia = palabra;

    function deletrea(){
        var enletras = palabra.split("");
        var cadena = "";
        for (let x = 0; x = enletras.length; x++) {
            cadena = cadena + enletras[x] + " - ";
        }
        console.log(cadena);
    }

    function mayusculiza(){
        materia = materia.toUpperCase();
        console.log(materia);
    }

    return {
        mayusculiza: mayusculiza,
        deletrea: deletrea
    }

}

export {mimodulo};