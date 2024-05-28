import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const Busca = () => {

    const path = window.location.pathname;
    const temBarraNoFinal = path.endsWith('/');
    if(temBarraNoFinal) {
        window.location.href = path.slice(0, -1);
    }

    const [dados, setDados] = useState([]);
    const [buscaInput, setBuscaInput] = useState('');
    const [filtros, setFiltros] = useState(); // filtros = [{ name: 'preco', checked: false }
    const [ordem, setOrdem] = useState(); 
    const { modulo } = useParams();

    const filtrosModulo = {
        'nossos-servicos': [{ 'name': 'preco', 'label': 'Preço', 'type': 'number' }, { 'name': 'titulo', 'label': 'Título', 'type': 'number' }],
    }
    
    useEffect(() => {
        const buscarDados = async () => {
            try {
                if(buscaInput) {
                    let query = '';
                    if(ordem) {
                        query = '?ordem=' + ordem;
                    }

                    const response = await api.get(`/${modulo}/busca/${buscaInput}${query}`, { withCredentials: true });
                    setDados(response.data);
                    console.log(response)
                } else {
                    let query = '';
                    if(ordem) {
                        query = '?ordem=' + ordem;
                    }
                    const response = await api.get(`/${modulo}${query}`, { withCredentials: true });
                    setDados(response.data);
                }                
            } catch (error) {
                console.log(error);
            }
        }
        buscarDados();
    }, [buscaInput, filtros, ordem]);

    const ChangeBusca = (e) => {        
        setBuscaInput(e.target.value);
    }

    const ChangeOrdem = (e) => {
        const { id } = e.target;        
        setOrdem(id);
    };    
    useEffect(() => {
        console.log(dados)
    }, [dados]);
    return (
        <>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    <input onChange={ChangeBusca} type="text" className="grow" placeholder="Search" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
                {filtrosModulo[modulo].map((filtro, index) => {
                    return (                        
                        <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">{filtro.label}</span>                             
                            {filtro.type == 'number' ? 
                                <div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <span className="label-text">Ascendente</span> 
                                            <input 
                                                type="radio" 
                                                onChange={ChangeOrdem} 
                                                id={filtro.name + "%asc"}
                                                name={filtro.name}
                                                className="radio checked:bg-red-500"  
                                                
                                            />
                                        </label>
                                        </div>
                                        <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <span className="label-text">Decrescente</span> 
                                            <input 
                                                type="radio" 
                                                onChange={ChangeOrdem} 
                                                id={filtro.name + "%desc"}
                                                name={filtro.name} 
                                                className="radio checked:bg-blue-500"  
                                                
                                            />
                                            
                                        </label>
                                    </div>
                                </div>
                            : ''}
                        </label>
                        </div>
                    );
                })}
            </div>
            <div>
                {dados.map((dado, index) => {
                    return (
                        <div key={index} className="card bordered w-full">
                            <a href={window.location.href + "/" + dado.titulo}>
                                <div className="card-body">
                                    {Object.keys(dado).map((key, index) => {
                                        return (
                                            <div key={index} className="flex gap-2">
                                                <span className="font-bold">{key}</span>
                                                <span>{dado[key]}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </a>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Busca;