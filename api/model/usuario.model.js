var mongoose = require('mongoose');

var UserModelSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El Correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'Es necesaria una contraseña']
    }

},
{
    collection: 'usuarios'
},
{
    timestamps: true
});

module.exports = mongoose.model('Usuarios', UserModelSchema);