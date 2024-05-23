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
        const token = JWT.sign({ username: user.username }, jwtSecret);         
        res.cookie('authToken', token, { httpOnly: false, secure: false }, maxage = (3600000 * 24 * 7)); // 7 dias
        res.status(200).send('login efetuado com sucesso');
    } catch (error) {
        console.log('erro ao buscar user')
    }
})

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

