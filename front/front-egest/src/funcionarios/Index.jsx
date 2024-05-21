import React from 'react';
import Form from './Form';

const Funcionarios = () => {
    const params = new URLSearchParams(window.location.search);
    const acao = params.get('acao');
    if(acao) {
        switch(acao) {
            case 'adicionar': return <Form />;
            case 'editar': 
                /* a ideia aqui é ser uma tabela, ao clicar no lapis de edição, adicionar o editar nos parametros junto com o id do utilizador
                   a que se deseja atualizar, pra depois aqui embaixo pegar o id dele e montar o formulário de edição */
                const id = params.get('id');
                return <Form id={id} />; 
            case 'remover': return <h1>Remover Funcionário</h1>;            
        }
    }
    return (
        <>
            <h1>Funcionários</h1>
            <a href="?acao=adicionar">
                <button>Adicionar</button>
            </a>
            <a href="?acao=editar">
                <button>Editar</button>
            </a>
        </>
        
    );
    
};

export default Funcionarios;