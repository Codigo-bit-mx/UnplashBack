const {Schema, model} = require('mongoose');

const CaracteristicasSchema = Schema({

    titulo: {
        type: String,
        require: [true, 'El titulo se requiere']
    },
    nombre: {
        type: String, 
        require: [true, 'El nombre se requiere']
    },
    nombre_original: {
        type: String,
        require: [true, 'El nombre se requiere']
    },
    categoria: {
        type: String,
        require: [true, 'La categoria se requiere']
    },
    descripcion: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true,
    },
    creado: {
        type: Date, 
        default: Date.now()
    },
    ruta: {
        type: String,
        require: [ true, 'la ruta se requiere']
    }
    
});

module.exports = model('Caracteristicas', CaracteristicasSchema);