const express = require('express');
const router = express.Router();
const Navbar = require('../../models/front-office/Navbar');

router.post('/navbar', async(req, res) => {
    const tipo = req.body.tipo;    
    console.log(tipo)
    switch (tipo) {
        case 'link': {
            const { url, label } = req.body;
            const linkItem = {
                tipo: tipo,
                label: label,
                url: url,
            }
            try {
                const navbar = new Navbar({ tipo: tipo, label: label, url: url});
                await navbar.save();
                console.log('link criado');
                res.status(201).send('item criado');
            } catch (error) {
                console.log(error);
                res.status(400).send('erro ao criar');
            }
            break;
        }
        case 'dropdown': {
            const { label, items } = req.body;
            const dropdownItem = {
                tipo: tipo,
                label: label,
                items: items,
            };
            try {
                const navbar = new Navbar({ tipo: tipo, label: label, items: items});
                await navbar.save();
                console.log('dropdown criado');
                res.status(201).send('item criado');
            } catch (error) {
                console.log(error);
                res.status(400).send('erro ao criar');
            }
            break;
        }
        case 'button': {
            const { label, action } = req.body;
            const buttonItem = {
                tipo: tipo,
                label: label,
                action: action,
            };
            try {
                const navbar = new Navbar({ tipo: tipo, label: label, action: action });
                await navbar.save();
                console.log('botão criado');
                res.status(201).send('item criado');
            } catch (error) {
                console.log(error);
                res.status(400).send('erro ao criar');            
            }
            break;
        }
    }
    

})

router.get('/navbar/:id?', async (req, res) => {
    try {
        let navbar;
        if(req.params.id != undefined) {
            navbar = await Navbar.findById(req.params.id);
        } else {
            navbar = await Navbar.find();
        }
        res.status(200).send(navbar);
    } catch (error) {
        console.log(error);
    }
});

router.put('/navbar/:id', async (req, res) => {
    const id = req.params.id;    
    if(!id) {
        return res.status(400).send('id inválido');
    }
    const { tipo } = req.body;
    switch (tipo) {
        case 'link': {
            const { url, label } = req.body;            
            try {
                const navbar = await Navbar.findByIdAndUpdate(req.params.id, { tipo: tipo, label: label, url: url }, { new: true });
                if(!navbar) {
                    return res.status(404).send('navbar não encontrado');
                }
                
                res.status(201).send('item atualizado');
            } catch (error) {
                console.log(error);
                res.status(400).send('erro ao atualizar');
            }
            break;
        }
        case 'button': {
            const { label, action } = req.body;            
            try {
                const navbar = await Navbar.findByIdAndUpdate(req.params.id, { tipo: tipo, label: label, action: action }, { new: true });
                if(!navbar) {
                    return res.status(404).send('navbar não encontrado');
                }
                
                res.status(201).send('item atualizado');
            } catch (error) {
                console.log(error);
                res.status(400).send('erro ao atualizado');
            }
            break;
        }
    }
        
});

module.exports = router;