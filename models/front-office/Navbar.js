const mongoose = require('mongoose');
const { Schema, Document, Types, SchemaTypes } = mongoose;

const NavbarItemsSchema = new Schema({
    tipo: {
        type: String,
        required: true,
        enum: ['link', 'dropdown', 'button'],
    },
    label: {
        type: String,
        required: true,
    },
    url: String, // só pro link
    items: [this], // só pro dropdown
    action: String, // só pro botão
    ativo: {
        type: Boolean,
        default: true,
        default: true
    },
});

/* const NavbarSchema = new Schema({    
    navbar_items: NavbarItemsSchema,

}); */

module.exports = mongoose.model('Navbar', NavbarItemsSchema);
