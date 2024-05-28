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
                "type": 'number',
                "placeholder": 'nif',
                "label": 'NIF',          
            },
            {
                "name": 'cc',
                "type": 'number',
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
            }]
        }
        case 'infoempresa': {
            return[{
                "name": 'nome',
                "type": 'text',
                "placeholder": 'Nome',
                "label": 'Nome da Empresa'
            }]
        }
        case 'navbar': {
            return [{
                "name": 'tipo',
                "type": 'select',
                "options": ['link', 'button'],
                "placeholder": 'tipo',
                "label": 'Tipo',
            },
            {
                "name": 'label',
                "type": 'text',
                "placeholder": 'label',
                "label": 'Label',
            },
            {
                "name": 'url',
                "type": 'text',
                "placeholder": 'url',
                "label": 'URL (Apenas se for link)',
            },            
            {
                "name": 'action',
                "type": 'text',
                "placeholder": 'action',
                "label": 'Action (Apenas se for botão)',
            }];
        }
        case 'nossos-servicos': {
            return [{
                "name": 'titulo',
                "type": 'text',
                "placeholder": 'Título',
                "label": 'Título',
            },
            {
                "name": 'descricao',
                "type": 'text',
                "placeholder": 'Descrição',
                "label": 'Descrição',
            },
            {
                "name": 'imagem',
                "type": 'text',
                "placeholder": 'Imagem',
                "label": 'Imagem',
            },
            {
                "name": 'preco',
                "type": 'number',
                "placeholder": 'Preço',
                "label": 'Preço',
            }];
        }
        
    }
}

export default campos;