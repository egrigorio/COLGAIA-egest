const express = require('express');
const JWT = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const jwtSecret = process.env.JWT_SECRET;

router.get('/teste', (req, res) => {
    res.send('teste');
})

router.post('/login', async (req, res) => {    
    
    const username = req?.body.username;
    const password = req?.body.password;
    try {
        const user = await User.findOne({ username: username });
        if (!user) 
        {            
            return res.status(404).send('user não encontrado');
        }
        const isValid = await user.isValidPassword(password);
        if (!isValid) {
            return res.status(401).send('senha incorreta');
        }
        const token = JWT.sign({ username: user.username, cargo: user.tipo, email: user.email }, jwtSecret);         
        res.cookie('authToken', token, { httpOnly: false, secure: false }, maxage = (3600000 * 24 * 7)); // 7 dias
        res.status(200).send('login efetuado com sucesso');
    } catch (error) {
        console.log('erro ao buscar user')
    }
})

router.get('/user/:id?', async (req, res) => {
    try {
        let user;
        if(Object.keys(req.query).length > 0) {
            user = await User.find(req.query);
        } else {
            user = await User.find();
        }
        res.status(200).send(user);
    } catch (error) {
        console.log('erro ao buscar users');
    }
});

router.get('/user/filtro/codigo', async (req, res) => {
    try {
        const user = await User.find({ tipo: 'funcionário'}).select('username');
        res.status(200).send(user);
    } catch (error) {
        console.log('erro ao buscar users' + error);
    }
});

router.get('/user/filtro/email', async (req, res) => {
    try {
        const user = await User.find({ tipo: 'Funcionário'}).select('email');
        res.status(200).send(user);
    } catch (error) {
        console.log('erro ao buscar users' + error);
    }
});

router.post('/user', async (req, res) => {
    const { username, password, tipo, email } = req.body;
    if(!username || !password) {
        return res.status(400).send('username e password são obrigatórios');
    }
    const userExists = await User.findOne({ username: username });
    if(userExists) return res.status(400).send({ message: 'user já existe'});
    try {
        const user = await User.create({ username, password, tipo, email });
        res.status(201).send(user);
    } catch (error) {
        console.log(error)
        console.log('erro ao criar user');
    }
});

router.delete('/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            return res.status(404).send('user não encontrado');
        }
        res.status(200).send(user);
    } catch (error) {
        console.log('erro ao deletar user');
    }
});

router.put('/user/:id', async (req, res) => {
    const id = req.params.id;
    if(!id) {
        return res.status(400).send('id inválido');
    }
    const { username, password, tipo, email } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { username, password, tipo, email }, { new: true });
        if(!user) {
            return res.status(404).send('user não encontrado');
        }
        res.status(200).send(user);
    } catch (error) {
        console.log('erro ao atualizar user');
    }
});

router.post('/registar', async (req, res) => {    
    const { username, password, confirmar_password, cargo } = req.body;
    if (password !== confirmar_password) {
        return res.status(400).send('senhas não conferem');
    }
    const userExists = await User.findOne({ username: username });
    if(userExists) return res.status(400).send({ message: 'user já existe'});
    try {
        const user = await User.create({ username, password });
        const token = JWT.sign({ username: user.username }, jwtSecret);
        res.cookie('authToken', token, { httpOnly: false, secure: false }, maxage = (3600000 * 24 * 7)); // 7 dias        
        res.status(201).send(user);
    } catch (error) {
        console.log('erro ao criar user');
    }
});

module.exports = router;

