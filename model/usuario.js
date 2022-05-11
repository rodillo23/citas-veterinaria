const {Schema, model, default: mongoose} = require('mongoose')

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio.']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio.']
    },
    estado: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        required: [true, 'El role es obligatorio'],
        enum: ["ADMIN_ROLE", "USER_ROLE"]
    },
    fecha_alta: {
        type: Date
    }
})

module.exports = mongoose.model('Usuario', usuarioSchema)