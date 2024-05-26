import api from './api/api';

const campos = (modulo) => {
    switch(modulo) { 
        case 'funcionario': {
            return [{
                "name": 'nome',
                "type": 'text',
                "placeholder": 'Nome',
                "label": 'Nome',                
            },
            {
                "name": 'nif',
                "type": 'text',
                "placeholder": 'nif',
                "label": 'NIF',          
            },
            {
                "name": 'cc',
                "type": 'text',
                "placeholder": 'cc',
                "label": 'CC',                
            },
            {
                "name": 'dataNascimento',
                "type": 'date',
                "placeholder": 'dataNascimento',
                "label": 'Data de Nascimento',                
            }, 
            {
                "name": 'entradaEmpresa',
                "type": 'date',
                "placeholder": 'entradaEmpresa',
                "label": 'Entrada na Empresa',                
            },
            {
                "name": 'salario',
                "type": 'number',
                "placeholder": 'salario',
                "label": 'Salário',                
            },
            {
                "name": 'genero',
                "type": 'select',
                "options": ['Masculino', 'Feminino'],
                "placeholder": 'genero',
                "label": 'Género',                
            },
            {
                "name": 'area',
                "type": 'select',
                "options": [],
                "placeholder": 'area',                
                "label": 'Área',                
            },
            {
                "name": 'email',
                "type": 'select',
                "placeholder": 'email',
                "label": 'Email',                
            }
        ];
        }
        case 'user': {
            return [{
                "name": 'username',
                "type": 'text',
                "placeholder": 'Username',
                "label": 'Username',                
            },
            {
                "name": 'email',
                "type": 'email',
                "placeholder": 'email',
                "label": 'Email',                
            },
            {
                "name": 'password',
                "type": 'password',
                "placeholder": 'password',
                "label": 'Password',                
            },
            {
                "name": 'tipo',
                "type": 'select',
                "placeholder": 'tipo',
                "label": 'Tipo',                
            }];            
        }
        case 'area': {
            return [{
                "name": 'nome',
                "type": 'text',
                "placeholder": 'Nome',
                "label": 'Nome',                
            }];
        }
        case 'tipo': {
            return [{
                "name": 'tipo',
                "type": 'text',
                "placeholder": 'Tipo',
                "label": 'Tipo',
            }]
        }
        case 'servico': {
            return [{
                "name": 'nome',
                "type": 'text',
                "placeholder": 'Nome',
                "label": 'Nome',                
            },
            {
                "name": 'descricao',
                "type": 'text',
                "placeholder": 'descricao',
                "label": 'Descrição',                
            },
            {
                "name": 'preco',
                "type": 'number',
                "placeholder": 'preco',
                "label": 'Preço',
            },
            {
                "name": 'duracao',
                "type": 'number',
                "placeholder": 'duracao',
                "label": 'Duração',
            },        
            {
                "name": 'funcionario',
                "type": 'select',
                "options": [],
                "placeholder": 'funcionario',
                "label": 'Funcionário',
            }
        ]
        }
    }
}

export default campos;