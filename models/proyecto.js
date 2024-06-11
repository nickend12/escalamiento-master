const { Schema, model} = require('mongoose')

const ProyectoSchema = Schema({
    numero : {
        type: String,
        required: [true, 'Número requerido'],
        unique: [true]
    },
    titulo : {
        type: String,
        unique: [true]
    },
    //TODO: resto de campos
    
    tipoProyecto : {
        type: Schema.Types.ObjectId,
        ref: 'TipoProyecto',
        required: true
    },
    cliente : {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },

    // TODO: RESTO DE LOS MODELOS
    
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
})

module.exports = model('Proyecto', ProyectoSchema)
