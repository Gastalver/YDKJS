var mongoose = require('mongoose');
var Schema = mongoose.Schema


var childSchema = new Schema({ name: 'string' });

var parentSchema = new Schema({
    // Single nested subdocuments. Caveat: single nested subdocs only work
    // in mongoose >= 4.2.0
    child: childSchema
});

var Parent = mongoose.model('Parent', parentSchema); // Modelo Instancia del Modelo.
var parent = new Parent({ child: { name: 'Matt' }}) // Documento basado en Modelo.
console.log(parent.child.name)

// `parent.children[0].save()` is a no-op, it triggers middleware but
// does **not** actually save the subdocument. You need to save the parent
// doc.
//parent.save(callback);