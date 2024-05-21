import React, { useEffect, useState } from 'react';
import Form from './Form';
import api from '../api/api';
import { set } from 'mongoose';

const Funcionarios = () => {
    const [ dadosFuncionarios, setDadosFuncionarios ] = useState(null);
    const camposEscondidos = ['_id', '__v']; /* campos que vem da db e não desejamos mostrar na tabela */
    const params = new URLSearchParams(window.location.search);
    const acao = params.get('acao');
    
    const dados = async () => {
        const response = await api.get('/funcionario', { withCredentials: true });
        setDadosFuncionarios(response.data);
        console.log(response);    
    }
    useEffect(() => {
        dados();
    }, []);

    if(acao) {
        switch(acao) {
            case 'adicionar': return <Form />;
            case 'editar': 
                /* a ideia aqui é ser uma tabela, ao clicar no lapis de edição, adicionar o editar nos parametros junto com o id do utilizador
                   a que se deseja atualizar, pra depois aqui embaixo pegar o id dele e montar o formulário de edição */
                const id = params.get('id');
                
                return <Form id={id} />
            case 'remover': return <h1>Remover Funcionário</h1>;            
        }
    }
    
    return (
        <>
            <table>
                <thead>
                    {dadosFuncionarios && Object.keys(dadosFuncionarios[0]).map(key => (
                        camposEscondidos.includes(key) ? null : <th key={key}>{trataCampos(trataCampos(key, 'm'), 'l')}</th>                        
                    ))}
                </thead>
                <tbody>
                    {dadosFuncionarios ? dadosFuncionarios.map(funcionario => (
                        <tr key={funcionario._id}>
                            {Object.keys(funcionario).map(key => (
                                camposEscondidos.includes(key) ? null : <td key={key}>{funcionario[key]}</td>
                            ))}
                            <td><a href={"?acao=editar&id=" + funcionario._id}>Editar</a></td>
                            <td><a >Remover</a></td>
                        </tr>
                    )) : null}
                </tbody>
            </table>
            <h1>Funcionários</h1>
            <a href="?acao=adicionar">
                <button>Adicionar</button>
            </a>            
        </>
        
    );
    
};

export default Funcionarios;

const trataCampos = (valor, tipo) => {
    switch (tipo) {
        case 'm' : return valor.charAt(0).toUpperCase() + valor.slice(1); /* devolver primeira letra maiuscula */
        case 'l' : {
            return valor.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); }) /* devolve uma string abcDef em Abc Def */
        }
    }
}