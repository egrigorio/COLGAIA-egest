const express = require('express');
const router = express.Router();
const NossosServicos = require('../../models/front-office/NossosServicos');

router.post('/nossos-servicos', async(req, res) => {    
    const { titulo, descricao, imagem, preco } = req.body;
    try {
        const nossosServicos = await NossosServicos.create({ titulo: titulo, descricao: descricao, imagem: imagem, preco: preco });
        console.log('nossos serviços criado');
        res.status(201).send(nossosServicos);
    } catch (error) {
        console.log(error);
        return res.status(400).send('erro ao criar');
    }
})

router.get('/nossos-servicos/:id?', async (req, res) => {
    
    if(Object.keys(req.query).length > 0) {
        try {
            let query = {};
            let sort = {};
            
            for (let key in req.query) {
                if (key === 'ordem') {
                    let parts = req.query[key].split('%');
                    if (parts.length === 2) {
                        let field = parts[0];
                        let order = parts[1] === 'asc' ? 1 : -1;
                        sort[field] = order;
                    }
                } else {
                    query[key] = req.query[key];
                }
                
            }
            const nossos_servicos = await NossosServicos.find(query).sort(sort);
            res.status(200).send(nossos_servicos);
        } catch (error) {
            console.log(error);
            res.status(400).send('erro ao buscar');
        }
    } else {
        try {
            let nossos_servicos;
            if(req.params.id != undefined) {
                nossos_servicos = await NossosServicos.findById(req.params.id);
            } else {
                nossos_servicos = await NossosServicos.find();
            }
            res.status(200).send(nossos_servicos);
        } catch (error) {
            console.log(error);
        }
    }

});

router.get('/nossos-servicos/busca/:busca', async (req, res) => {
    const busca = req.params.busca;
    
    if(Object.keys(req.query).length > 0) {
        try {
            let query = {};
            let sort = {};                     
            for (let key in req.query) {
                console.log(key)
                if (key === 'ordem') {
                    let parts = req.query[key].split('%');
                    if (parts.length === 2) {
                        let field = parts[0];
                        let order = parts[1] === 'asc' ? 1 : -1;
                        sort[field] = order;
                    }
                } else {
                    query[key] = req.query[key];
                }
                
            }
            const nossos_servicos = await NossosServicos.find({ 
                $and: [
                    { $or: [
                        {titulo: { $regex: busca, $options: 'i' } },
                        {descricao: { $regex: busca, $options: 'i' }}
                    ]},
                    query
                ]
            }).sort(sort);
            res.status(200).send(nossos_servicos);
        } catch (error) {
            console.log(error);
            res.status(400).send('erro ao buscar');
        }
    } else {
        try {            
            const nossos_servicos = await NossosServicos.find({ 
                $or: [
                    {titulo: { $regex: busca, $options: 'i' } },
                    {descricao: { $regex: busca, $options: 'i' }}
                ]
            });
            res.status(200).send(nossos_servicos);
        } catch (error) {
            console.log(error);
        }
    }
});

router.put('/nossos-servicos/:id', async (req, res) => {
    const id = req.params.id;
    if(!id) {
        return res.status(400).send('id inválido');
    }
    const { titulo, descricao, imagem, preco } = req.body;
    try {
        const nossos_servicos = await NossosServicos.findByIdAndUpdate(req.params.id, { titulo: titulo, descricao: descricao, imagem: imagem, preco: preco }, { new: true });
        if(!nossos_servicos) {
            return res.status(404).send('nossos servicos não encontrado');
        }
        res.status(200).send(nossos_servicos);
    } catch (error) {
        console.log(error);
        return res.status(400).send('erro ao atualizar');
    }       
});

router.delete('/nossos-servicos/:id', async (req, res) => {
    try {
        const nossos_servicos = await NossosServicos.findByIdAndDelete(req.params.id);
        if(!nossos_servicos) {
            return res.status(404).send('nossos servicos não encontrado');
        }
        res.status(200).send(nossos_servicos);
    } catch (error) {
        console.log(error);
        return res.status(400).send('erro ao deletar');
    }
});

module.exports = router;