const mongoose = require('mongoose');

const TiendaSchema = mongoose.Schema({
    
    tienda: {
        type: String,
        require: true
    },
    departamento: {
        type: String,
        require: true
    },
    distrito: {
        type: String,
        require: true
    },
    latitud: {
        type: String,
        require: true
    },
    longitud: {
        type: String,
        require: true
    },
    cantidad: {
        type: Number,
        require: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Tienda', TiendaSchema)