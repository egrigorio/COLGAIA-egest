const mongoose = require('mongoose');
const { Schema, Document, Types, SchemaTypes } = mongoose;

const ServicoSchema = new Schema({
    nome: {
        type: String,
        required: true,        
    },
    preco: {
        type: Number,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    duracao: {
        type: Number,
        required: true
    },
    /* area: {
        type: String,
        required: true
    }, */
    funcionario: {
        type: String,
        required: true
    },    
});

module.exports = mongoose.model('Servico', ServicoSchema);