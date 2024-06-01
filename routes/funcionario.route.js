const express = require('express');
const router = express.Router();
const Funcionario = require('../models/Funcionario');

router.post('/funcionario', async (req, res) => {
    let { nome, nif, cc, dataNascimento, entradaEmpresa, salario, genero, area, email } = req.body;
    try {
        dataNascimento = validarData(dataNascimento);
        entradaEmpresa = validarData(entradaEmpresa);        

        if(salario < 820) {
            return res.status(400).send('Salário deve ser maior que 820€, correspondente ao salário mínimo nacional');
        }

        if(dataNascimento < new Date('1900-01-01') || entradaEmpresa < new Date('1900-01-01') || dataNascimento > new Date('2008-01-01') || entradaEmpresa < dataNascimento) {
            return res.status(400).send('Data inválida');
        }

        if(!dataNascimento || !entradaEmpresa) {
            return res.status(400).send('Data inválida');
        }

        const funcionarioExistente = await Funcionario.findOne({ email: email });
        if(funcionarioExistente) {
            return res.status(400).send('Funcionário já existe');
        }

        const funcionario = new Funcionario({ nome, nif, cc, dataNascimento, entradaEmpresa, salario, genero, area, email });         
        if(!funcionario.validarNif(nif)) {
            return res.status(400).send('NIF inválido');
        }
        if(!funcionario.validarCC(cc)) {
            return res.status(400).send('CC inválido');
        }
        await funcionario.save();
        res.status(201).send(funcionario);
    } catch (error) {
        console.log('erro ao criar funcionário' + error);
    }
});

router.put('/funcionario/:id', async (req, res) => {    
    const id = req.params.id;    
    if(!id) {
        return res.status(400).send('id inválido');
    }
    const { nome, nif, cc, dataNascimento, entradaEmpresa, salario, genero, area, email } = req.body;
    
    try {
        const funcionario = await Funcionario.findByIdAndUpdate(req.params.id, { nome, nif, cc, dataNascimento, entradaEmpresa, salario, genero, area, email }, { new: true });
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

router.get('/funcionario/:id?', async (req, res) => {
        
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
            const funcionarios = await Funcionario.find(query).sort(sort);
            res.status(200).send(funcionarios);
        } catch (error) {
            console.log(error);
            res.status(400).send('erro ao buscar');
        }
    } else {
        try {
            let funcionarios;
            if(req.params.id != undefined) {
                funcionarios = await Funcionario.findById(req.params.id);
            } else {
                funcionarios = await Funcionario.find();
            }
            res.status(200).send(funcionarios);
        } catch (error) {
            console.log(error);
        }
    }        
});

router.get('/funcionario/busca/:busca', async (req, res) => {
    const busca = req.params.busca;
    
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
            const funcionario = await Funcionario.find({ 
                $and: [
                    { $or: [
                        {nome: { $regex: busca, $options: 'i' } },
                        {email: { $regex: busca, $options: 'i' }},
                        {area: { $regex: busca, $options: 'i' }}
                    ]},
                    query
                ]
            }).sort(sort);

            res.status(200).send(funcionario);
        } catch (error) {
            console.log(error);
            res.status(400).send('erro ao buscar');
        }
    } else {
        try {            
            const funcionario = await Funcionario.find({ 
                $or: [
                    {nome: { $regex: busca, $options: 'i' } },
                    {email: { $regex: busca, $options: 'i' }},
                    {area: { $regex: busca, $options: 'i' }}
                ]
            });
            
            res.status(200).send(funcionario);
        } catch (error) {
            console.log(error);
        }
    }
});

router.get('/funcionario/filtro/email', async (req, res) => {
    try {
        const funcionario = await Funcionario.find().select('email');
        res.status(200).send(funcionario);
    } catch (error) {
        console.log('erro ao buscar funcionarios' + error);
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