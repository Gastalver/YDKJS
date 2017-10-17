// Conexión a MongoDB con el nuevo mongoclient de Mongoose
// Dependencias
var mongoose = require('mongoose');
// Enchufamos la libreria Promise que vamos usar, ya que mpromise de mongoose está anticuada
mongoose.Promise = global.Promise; // En este caso ES6, la que tenemos por defecto en node.
// Creamos nuestra propia conexión, no usamos la conexión por defecto directamente con mongoose.connect
// además le damos nuestros parámetros.
var uri = 'mongodb://localhost/YDKJS';
var options = {
    useMongoClient: true
}
var conxMongo = mongoose.createConnection(uri,options)

conxMongo  // Activamos la conexión directamente, y escuchamos eventos. Otra posibilidad es usar then.
    .on('connected',function(){
        "use strict";
        console.log("Mongoose: Conexión a " + uri + " operativa.")
    })
    .on('error',function(err){
        "use strict";
        console.log('Mongoose: Capturado error.: ' + err)
    })
    .on('disconnected', function(){
        "use strict";
        console.log('Mongoose: Desconectado de ' + uri)
    })

function borraColeccion(c){
    "use strict";
    conxMongo.dropCollection(c).then(
        function fulfilled(){
            console.log('Coleccion ' + c + ' borrada')
            conxMongo.close();
        },
        function rejected(err){
            console.log('Error al tratar de eliminar ' + c + ': ' + err);
        }
    )
}

borraColeccion('expedientes')
