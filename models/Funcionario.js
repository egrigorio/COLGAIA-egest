const mongoose = require('mongoose');
const { Schema, Document, Types, SchemaTypes } = mongoose;

const FuncionarioSchema = new Schema({
    nome: {
        type: String,
        required: true,        
    },
    nif: {
        type: Number,
        required: true
    },
    cc: {
        type: String,
        required: true
    },
    dataNascimento: {
        type: Date,
        required: true        
    },
    entradaEmpresa: {
        type: Date,
        required: true        
    },
    salario: {
        type: Number,
        required: true        
    },
    genero: {
        type: String,
        required: true        
    },
    area: {
        type: String,
        required: true        
    },
    email: {
        type: String,
        required: true
    }
});

FuncionarioSchema.methods.validarNif = async function (nif) {
    if(!['1', '2', '3', '5', '6', '8'].includes(nif.substr(0,1)) && 
       !['45', '70', '71', '72', '77', '79', '90', '91', '98', '99'].includes(nif.substr(0,2)))
        return false;

    let total = nif[0] * 9 + nif[1] * 8 + nif[2] * 7 + nif[3] * 6 + nif[4] * 5 + nif[5] * 4 + nif[6] * 3 + nif[7] * 2;

    let modulo11 = total - parseInt(total / 11) * 11;
    let comparador = modulo11 == 1 || modulo11 == 0 ? 0 : 11 - modulo11;
    console.log(nif[8] == comparador)
    return nif[8] == comparador
};


FuncionarioSchema.methods.validarCC = async function (cc) {
    let letter_value = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16, H: 17, I: 18, J: 19, K: 20, L: 21, M: 22, N: 23, O: 24, P: 25, Q: 26, R: 27, S: 28, T: 29, U: 30, V: 31, W: 32, X: 33, Y: 34, Z: 35};
    let cc_number = cc.replace(/-|\s/g, ''); // remove space and -
    cc_number = cc_number.toUpperCase();
    cc_number = [...cc_number];
    cc_number = cc_number.reverse();
    cc_number[1] = letter_value[cc_number[1]];
    cc_number[2] = letter_value[cc_number[2]];
    let sum = 0;
    let dum = 0;
    cc_number.forEach((v, k) => {
        if ( k % 2 == 0) {
            dum = parseInt(v);
        }
        else {
            dum = parseInt(v) * 2;
            if (dum >= 10)
                dum -= 9;
        }
        sum += dum;
        /* console.log('k : '+ k + ' | sum : '+ sum); */
    });
    
    return (sum % 10 == 0) ? true : false;
}

module.exports = mongoose.model('Funcionario', FuncionarioSchema);
