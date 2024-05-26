const express = require('express');
const router = express.Router();
const Area = require('../models/Area');

router.get('/area/:id?', async (req, res) => {
    
    try{
        let area;
        if(Object.keys(req.params).id != undefined) {
            area = await Area.findById(req.params.id);
        } else {
            area = await Area.find();            
        }
        res.status(200).send(area);
    } catch(error) {
        console.log(error)
    }    
});

router.get('/area/filtro/nome', async (req, res) => {
    try {
        const area = await Area.find().select('nome');
        res.status(200).send(area);
    } catch (error) {
        console.log('erro ao buscar areas');
    }
});

router.post('/area', async (req, res) => {
    const { nome } = req.body;
    if(!nome) {
        return res.status(400).send('nome é obrigatório');
    }
    try {
        const area = await Area.create({ nome });
        res.status(201).send(area);
    } catch (error) {
        console.log('erro ao criar area');
    }
});

router.put('/area/:id', async (req, res) => {
    const { nome } = req.body;
    if(!nome) {
        return res.status(400).send('nome é obrigatório');
    }
    try {
        const area = await Area.findByIdAndUpdate(req.params.id, { nome });
        res.status(200).send(area);
    } catch (error) {
        console.log('erro ao atualizar area');
    }
});

router.delete('/area/:id', async (req, res) => {
    try {
        await Area.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.log('erro ao deletar area');
    }
});

module.exports = router;