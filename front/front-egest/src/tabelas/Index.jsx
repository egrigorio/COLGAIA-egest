import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useParams } from 'react-router-dom';
import Form from './Form';



const Tabelas = () => {
    const { acao, id, modulo } = useParams();
    const [ dados, setDados ] = useState(null);
    const camposEscondidos = ['_id', '__v', 'password'];    
    const info = async () => {
        const response = await api.get('/' + modulo, { withCredentials: true });
        setDados(response.data);
        console.log(response);
    }
    useEffect(() => {
        info();
    }, []);

    if(acao) {
        switch(acao) {
            case 'adicionar': return <Form modulo={modulo} />;
            case 'editar':                
                return <Form modulo={modulo} id={ id } />                     
        }
    }

    return (
        <>              
            <div className="row justify-content-center">
                <h1 className='text-center mb-5 mt-3'>{modulo}</h1>
                <table className="table table-bordered w-50">
                    <thead>
                        {dados && dados.length > 0 && Object.keys(dados[0]).map(key => (
                            camposEscondidos.includes(key) ? null : 
                            <th scope="col" key={key}>{trataCampos(trataCampos(key, 'm'), 'l')}</th>
                        ))}
                        {dados && dados.length < 0 && <th scope="col">Sem dados</th> }
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </thead>
                    <tbody>
                        {dados ? dados.length > 0 ? dados.map(dado => (
                            <tr key={dado._id}>
                                {Object.keys(dado).map(key => (
                                    camposEscondidos.includes(key) ? null : <td key={key}>{dado[key]}</td>
                                ))}
                                <td><a href={"editar/" + dado._id}>Editar</a></td>
                                <td><a onClick={() => {apagar(dado._id, modulo)}}>Remover</a></td>
                            </tr>
                        )) : <tr><td>Sem dados</td></tr> : <tr><td>Sem dados</td></tr>}
                    </tbody>
                </table>
                <a class="btn btn-primary" href={"adicionar/"}>Adicionar</a>
            </div>
        </>
    );

}

const trataCampos = (valor, tipo) => {
    switch (tipo) {
        case 'm' : return valor.charAt(0).toUpperCase() + valor.slice(1); /* devolver primeira letra maiuscula */
        case 'l' : {
            return valor.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); }) /* devolve uma string abcDef em Abc Def */
        }
    }
}

const apagar = async (id, modulo) => {
    if(window.confirm('Tem a certeza que deseja remover?')) {
        api.delete('/' + modulo + '/' + id, { withCredentials: true })
        .then(res => {                        
            window.location.href = '/v/' + modulo;
        })
        .catch(err => console.log(err));
    }
};

export default Tabelas;