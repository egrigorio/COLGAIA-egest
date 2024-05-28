const mongoose = require('mongoose');
const { Schema, Document, Types, SchemaTypes } = mongoose;

const InfoEmpresa = new Schema({
    nome: {
        type: String,
        required: true,        
    },    
});

module.exports = mongoose.model('InfoEmpresa', InfoEmpresa);
