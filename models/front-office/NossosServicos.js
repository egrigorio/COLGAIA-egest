const mongoose = require('mongoose');
const { Schema, Document, Types, SchemaTypes } = mongoose;

const NossosServicosSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        
    },
    descricao: {
        type: String,
        required: true,
        
    },
    imagem: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('NossosServicos', NossosServicosSchema);
