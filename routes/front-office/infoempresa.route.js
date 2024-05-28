const express = require('express');
const router = express.Router();
const InfoEmpresa = require('../../models/front-office/InfoEmpresa');

router.post('/infoempresa', async(req, res) => {
    const { nome } = req.body;
    try {
        const info_empresa = new InfoEmpresa({ nome });
        await info_empresa.save();
        res.status(201).send(info_empresa);
    } catch (error) {
        console.log(error);
    }    
})

router.get('/infoempresa/:id?', async (req, res) => {
    
    try{
        let infoempresa;
        if(req.params.id != undefined) {
            infoempresa = await InfoEmpresa.findById(req.params.id);
        } else {
            infoempresa = await InfoEmpresa.find();            
        }
        res.status(200).send(infoempresa);
    } catch(error) {
        console.log(error)
    }
});

router.put('/infoempresa/:id', async (req, res) => {
    const { nome } = req.body;
    if(!nome) {
        return res.status(400).send('nome é obrigatório');
    }
    try {
        const infoempresa = await InfoEmpresa.findByIdAndUpdate(req.params.id, { nome });
        res.status(200).send(infoempresa);
    } catch (error) {
        console.log('erro ao atualizar infoempresa');
    }
});

router.delete('/infoempresa/:id', async (req, res) => {
    try {
        await InfoEmpresa.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.log('erro ao deletar infoempresa');
    }
});

router.post('/infoempresa', async (req, res) => {
    const { nome } = req.body;
    if(!nome) {
        return res.status(400).send('nome é obrigatório');
    }
    try {
        const infoempresa = await InfoEmpresa.create({ nome });
        res.status(201).send(infoempresa);
    } catch (error) {
        console.log('erro ao criar infoempresa');
    }
});

module.exports = router