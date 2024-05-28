import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useParams } from 'react-router-dom';
import Form from './Form';
import Navbar from '../navbar/Index';
import Swal from 'sweetalert2';


const Tabelas = () => {

    const path = window.location.pathname;
    const temBarraNoFinal = path.endsWith('/');
    if(temBarraNoFinal) {
        window.location.href = path.slice(0, -1);
    }


    const { acao, id, modulo } = useParams();
    const [ dados, setDados ] = useState(null);
    const camposEscondidos = ['_id', '__v', 'password'];    
    const info = async () => {
        try {
            const response = await api.get('/' + modulo, { withCredentials: true });                        
            setDados(response.data);
            console.log(response);            
        } catch (error) {
            window.location.href = '/';
            console.log(error);
            return;
        }
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
            <Navbar />
            <div className="flex flex-col justify-center items-center gap-6">                
                <h1 className='text text-lg font-bold text-center'>{modulo}</h1>
                <div className='w-8/12'>
                    <table className="table">
                        <thead>                        
                            {dados && dados.length > 0 && Object.keys(dados[0]).map(key => (
                                camposEscondidos.includes(key) ? null : 
                                <th key={key}>{trataCampos(trataCampos(key, 'm'), 'l')}</th>
                            ))}
                            
                            {dados && dados.length < 0 && <th>Sem dados</th>}
                            <th>Editar</th>
                            <th>Remover</th>
                        </thead>
                        <tbody>
                            {dados ? dados.length > 0 ? dados.map(dado => (
                                <tr key={dado._id} className='hover'>                                
                                    {Object.keys(dado).map(key => (
                                        camposEscondidos.includes(key) ? null : <td key={key}>{dado[key]}</td>
                                    ))}
                                    <td><a href={modulo + "/editar/" + dado._id}>Editar</a></td>
                                    <td><a style={{cursor: 'pointer'}} onClick={() => {apagar(dado._id, modulo)}}>Remover</a></td>
                                </tr>
                            )) : <tr><td>Sem dados</td></tr> : <tr><td>Sem dados</td></tr>}
                        </tbody>
                    </table>
                </div>
                    <a className="btn btn-ghost" href={modulo + "/adicionar/"}>Adicionar</a>
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
    Swal.fire({
        title: 'Tem a certeza que deseja remover?',
        showDenyButton: true,
        confirmButtonText: `Sim`,
        denyButtonText: `Não`,
    }).then((result) => {
        if (result.isConfirmed) {
            api.delete('/' + modulo + '/' + id, { withCredentials: true })
            .then(res => {                        
                window.location.href = '/v/' + modulo;
            })
            .catch(err => console.log(err));
        } else if (result.isDenied) {
            Swal.fire('Operação cancelada', '', 'info')
        }
    }) 
};

export default Tabelas;