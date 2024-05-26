const mongoose = require('mongoose');
const { Schema, Document, Types, SchemaTypes } = mongoose;

const AreaSchema = new Schema({
    nome: {
        type: String,
        required: true,   
        unique: true     
    },
});

module.exports = mongoose.model('Area', AreaSchema);