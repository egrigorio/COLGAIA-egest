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
                "type": 'text',
                "placeholder": 'salario',
                "label": 'Salário',                
            },
            {
                "name": 'genero',
                "type": 'text',
                "placeholder": 'genero',
                "label": 'Género',                
            },
            {
                "name": 'area',
                "type": 'text',
                "placeholder": 'area',
                "label": 'Área',                
            }
        ];
        }
        case 'user': {
            return [{
                "name": 'nome',
                "type": 'text',
                "placeholder": 'Nome',
                "label": 'Nome',                
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
                "type": 'text',
                "placeholder": 'tipo',
                "label": 'Tipo',                
            }];
            
        }
    }
}

module.exports = campos;