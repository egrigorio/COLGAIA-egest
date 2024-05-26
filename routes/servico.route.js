const express = require('express');
const router = express.Router();
const Servico = require('../models/Servico');

router.post('/servico', async (req, res) => {
    let { nome, descricao, preco, duracao, funcionario } = req.body;
    try {
        const servico = new Servico({ nome, descricao, preco, duracao, funcionario });
        await servico.save();
        res.status(201).send(servico);
    } catch (error) {
        console.log('erro ao criar serviço' + error);
    }
});

router.get('/servico/:id?', async (req, res) => {
    try {
        let servicos;
        if(Object.keys(req.params).id != undefined) {
            servicos = await Servico.findById(req.params.id);
        } else {
            servicos = await Servico.find();
        }
        res.status(200).send(servicos);
    } catch (error) {
        console.log('erro ao buscar serviço' + error);
    }
});

router.get('/servico/filtro/user/:email', async (req, res) => {
    
    try {
        const servicos = await Servico.find({ funcionario: req.params.email });
        res.status(200).send(servicos);
    } catch (error) {
        console.log('erro ao buscar serviço' + error);
    }
});

router.put('/servico/:id', async (req, res) => {    
    const id = req.params.id;    
    if(!id) {
        return res.status(400).send('id inválido');
    }
    const { nome, descricao, preco, duracao, funcionario } = req.body;
    
    try {
        const servico = await Servico.findByIdAndUpdate(req.params.id, { nome, descricao, preco, duracao, funcionario }, { new: true });
        if(!servico) {
            return res.status(404).send('serviço não encontrado');
        }
        res.status(200).send(servico);
    } catch (error) {
        console.log('erro ao atualizar serviço' + error);
    }
});

router.delete('/servico/:id', async (req, res) => {
    try {
        const servico = await Servico.findByIdAndDelete(req.params.id);
        if(!servico) {
            return res.status(404).send('serviço não encontrado');
        }
        res.status(200).send(servico);
    } catch (error) {
        console.log('erro ao deletar serviço' + error);
    }
});

module.exports = router;