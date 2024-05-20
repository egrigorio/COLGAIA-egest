const express = require('express');
const router = express.Router();
const Funcionario = require('../models/Funcionario');

router.post('/funcionario', async (req, res) => {
    let { nome, nif, cc, dataNascimento, entradaEmpresa, salario, genero, area } = req.body;
    try {
        dataNascimento = validarData(dataNascimento);
        entradaEmpresa = validarData(entradaEmpresa);
        if(!dataNascimento || !entradaEmpresa) {
            return res.status(400).send('data inválida');
        }
        const funcionario = new Funcionario({ nome, nif, cc, dataNascimento, entradaEmpresa, salario, genero, area });         
        if(!funcionario.validarNif(nif)) {
            return res.status(400).send('nif inválido');
        }
        if(!funcionario.validarCC(cc)) {
            return res.status(400).send('cc inválido');
        }
        await funcionario.save();
        res.status(201).send(funcionario);
    } catch (error) {
        console.log('erro ao criar funcionário' + error);
    }
});

router.put('/funcionario/:id', async (req, res) => {
    const { nome, nif, cc, dataNascimento, entradaEmpresa, salario, genero, area } = req.body;
    try {
        const funcionario = await Funcionario.findByIdAndUpdate(req.params.id, { nome, nif, cc, dataNascimento, entradaEmpresa, salario, genero, area }, { new: true });
        if(!funcionario) {
            return res.status(404).send('funcionário não encontrado');
        }
        res.status(200).send(funcionario);
    } catch (error) {
        console.log('erro ao atualizar funcionário' + error);
    }
});

router.delete('/funcionario/:id', async (req, res) => {
    try {
        const funcionario = await Funcionario.findByIdAndDelete(req.params.id);
        if(!funcionario) {
            return res.status(404).send('funcionário não encontrado');
        }
        res.status(200).send(funcionario);
    } catch (error) {
        console.log('erro ao deletar funcionário' + error);
    }
});

router.get('/funcionario', async (req, res) => {
    /* geral */
    try {
        let funcionarios;        
        if(Object.keys(req.query).length > 0){            
            funcionarios = await Funcionario.find(req.query);
        } else {
            
            funcionarios = await Funcionario.find();
        }
        res.status(200).send(funcionarios);
    } catch (error) {
        console.log(error);
    }    
});

router.get('/salario', async (req, res) => {
    try {
        switch (req.query.operacao) {
            case 'gt': // maior que
                const funcionarios = await Funcionario.find({ salario: { $gt: req.query.valor } });
                res.status(200).send(funcionarios);
                break;
            case 'lt': // menor que
                const funcionarios2 = await Funcionario.find({ salario: { $lt: req.query.valor } });
                res.status(200).send(funcionarios2);
                break;
            case 'eq': // igual a
                const funcionarios3 = await Funcionario.find({ salario: { $eq: req.query.valor } });
                res.status(200).send(funcionarios3);
                break;
            case 'lw':  // mandar lw para pegar o menor
                const funcionarios4 = await Funcionario.find().sort({ salario: 1 }).limit(1); // 1 para crescente e -1 para decrescente
                res.status(200).send(funcionarios4);
                break;
            case 'hw':  // mandar hw para pegar o maior
                const funcionarios5 = await Funcionario.find().sort({ salario: -1 }).limit(1); // 1 para crescente e -1 para decrescente
                res.status(200).send(funcionarios5);
                break;
            default:
                res.status(400).send('operação inválida');
                break;
        }
    } catch (error) {
        console.log(error);
    }
});

function validarData(dateString) {
    const data = new Date(dateString);
    if (data.toString() === 'Invalid Date') {
        return false;
    }
    return data;
}

module.exports = router;