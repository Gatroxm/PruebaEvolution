var mongoose = require('mongoose');

var prioridades = {
    values: ['Alta', 'Media', 'Baja'],
    message: '{PATH} no es una prioridad permitida'
}

const TaskModelSchema = new mongoose.Schema({

    nombre:{
        type: String,
        required: [true, 'El Nombre es Requerido']
    },
    prioridad:{
        type: String,
        required: [true, 'La prioridad es Requerida'],
        enum: prioridades
    },
    fechaVncimiento: {
        type: String,
        required: [true, 'Debe Agregar una fecha de vencimiento']
    },
    completada: {
        type: Boolean,
        default: false
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'usuarios',
        required: true
    }

},
{ 
    collection: 'tareas' 
}, 
{
    timestamps: true
});

module.exports = mongoose.model('Tasks',TaskModelSchema);