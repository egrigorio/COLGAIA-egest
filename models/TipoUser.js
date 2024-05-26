const mongoose = require('mongoose');
const { Schema, Document, Types, SchemaTypes } = mongoose;

const TipoSchema = new Schema({
    tipo: {
        type: String,
        required: true,   
        unique: true     
    },
});

module.exports = mongoose.model('Tipo', TipoSchema);