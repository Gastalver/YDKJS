const busca= require('./buscaCadena');
var codigo = "Metemos el <title>Titulo ficticio...</title> y seguimos metiendo más morralla";
var titulo = busca.titulo(codigo);
console.log('El titulo es: ' + titulo);

