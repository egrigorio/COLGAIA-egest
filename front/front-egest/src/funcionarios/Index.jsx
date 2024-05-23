import React, { useEffect, useState } from 'react';
import Form from './Form';
import api from '../api/api';
import { useParams } from 'react-router-dom';

const Funcionarios = () => {
    
    const { nome } = useParams();
    
    const [ dadosFuncionarios, setDadosFuncionarios ] = useState(null);
    const camposEscondidos = ['_id', '__v']; /* campos que vem da db e não desejamos mostrar na tabela */
    const params = new URLSearchParams(window.location.search);
    
    const { acao } = useParams();
    const { id } = useParams();
    
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
                return <Form id={ id } />
                
            case 'remover': 
                if(window.confirm('Tem a certeza que deseja remover este funcionário?')) {
                    const id = params.get('id');
                    api.delete('/funcionario/' + id, { withCredentials: true })
                    .then(res => {
                        
                        dados();
                        window.location.href = '/funcionarios';
                    })
                    .catch(err => console.log(err));
                }
                break;                
        }
    }
    
    return (
        <>  
            
        <div className="row justify-content-center">
                <h1 className='text-center mb-5 mt-3'>Funcionários</h1>
                <table className="table table-bordered w-50">
                    <thead>
                        {dadosFuncionarios && dadosFuncionarios.length > 0 && Object.keys(dadosFuncionarios[0]).map(key => (
                            camposEscondidos.includes(key) ? null : <th scope="col" key={key}>{trataCampos(trataCampos(key, 'm'), 'l')}</th>                        
                        ))}
                        {dadosFuncionarios && dadosFuncionarios.length < 0 && <th scope="col">Sem dados</th> }
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </thead>
                    <tbody>
                        {dadosFuncionarios ? dadosFuncionarios.length > 0 ? dadosFuncionarios.map(funcionario => (
                            <tr key={funcionario._id}>
                                {Object.keys(funcionario).map(key => (
                                    camposEscondidos.includes(key) ? null : <td key={key}>{funcionario[key]}</td>
                                ))}
                                <td><a href={"/funcionarios/editar/" + funcionario._id}>Editar</a></td>
                                <td><a onClick={apagarFuncionario(funcionario._id)}>Remover</a></td>
                            </tr>
                        )) : <tr><td>Sem dados</td></tr> : null}
                    </tbody>
                </table> 
            </div>
            {/* Criar Nova componente para os Botões */}
            <a class="btn btn-primary" href="/funcionarios/adicionar/">Adicionar</a>
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

const apagarFuncionario = async (id) => {
    if(window.confirm('Tem a certeza que deseja remover este funcionário?')) {
        api.delete('/funcionario/' + id, { withCredentials: true })
        .then(res => {
            
            /* dados(); */
            window.location.href = '/funcionarios';
        })
        .catch(err => console.log(err));
    }
};