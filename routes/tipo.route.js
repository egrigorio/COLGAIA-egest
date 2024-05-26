const express = require('express');
const router = express.Router();
const Tipo = require('../models/TipoUser');

router.get('/tipo/:id?', async (req, res) => {
    try {
        let tipo;        
        if(Object.keys(req.params).id != undefined) {
            tipo = await Tipo.findById(req.params.id);        
        } else {            
            tipo = await Tipo.find();
        }
        res.status(200).send(tipo);
    } catch (error) {
        console.log('erro ao buscar tipos');
    }
});

router.get('/tipo/filtro/tipo', async (req, res) => {
    try {
        const tipo = await Tipo.find().select('tipo');
        res.status(200).send(tipo);
    } catch (error) {
        console.log('erro ao buscar tipos');
    }
});

router.post('/tipo', async (req, res) => {
    const { tipo } = req.body;
    if(!tipo) {
        return res.status(400).send('nome é obrigatório');
    }
    try {
        const newtipo = await Tipo.create({ tipo });
        res.status(201).send(newtipo);
    } catch (error) {
        console.log('erro ao criar tipo');
    }
});

router.put('/tipo/:id', async (req, res) => {
    const { tipo } = req.body;
    if(!tipo) {
        return res.status(400).send('tipo é obrigatório');
    }
    try {
        const tipo = await Tipo.findByIdAndUpdate(req.params.id, { tipo });
        res.status(200).send(tipo);
    } catch (error) {
        console.log('erro ao atualizar tipo');
    }
});

router.delete('/tipo/:id', async (req, res) => {
    try {
        await Tipo.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.log('erro ao deletar tipo');
    }
});

module.exports = router;