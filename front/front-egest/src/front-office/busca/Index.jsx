import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const Busca = () => {

    // tirar barra do final da pesquisa pra nn dar conflitos
    const path = window.location.pathname;
    const temBarraNoFinal = path.endsWith('/');
    if(temBarraNoFinal) {
        window.location.href = path.slice(0, -1);
    }
    //
    
    // declarações
    const [dados, setDados] = useState([]);
    const [buscaInput, setBuscaInput] = useState('');
    const [filtros, setFiltros] = useState(); 
    const [ordem, setOrdem] = useState(); 
    const { modulo } = useParams();
    //

    // discriminações quanto ao modulo
    const filtrosModulo = { /* filtros que aparecem consoante o módulo */
        'nossos-servicos': [{ 'name': 'preco', 'label': 'Preço', 'type': 'number' }, { 'name': 'titulo', 'label': 'Título', 'type': 'number' }],
        'funcionario': [{ 'name': 'nome', 'label': 'Nome', 'type': 'number' }, { 'name': 'dataNascimento', 'label': 'Data de Nascimento', 'type': 'number' }, { 'name': 'entradaEmpresa', 'label': 'Data de Entrada na Empresa', 'type': 'number' }, { 'name': 'salario', 'label': 'Salário', 'type': 'number'}],
    }

    const campoDiscriminador = { /* const pra escolher qual o campo que vai pro location.href */
        'nossos-servicos': 'titulo',
        'funcionario': 'nome',
    }
    //
    
    // useeffect para dar fetch nos dados, muda consoante filtros são adicionados
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
                    console.log(response)
                    setDados(response.data);
                }                
            } catch (error) {
                console.log(error);
            }
        }
        buscarDados();
    }, [buscaInput, filtros, ordem]);
    //

    // funções para mudar os estados
    const ChangeBusca = (e) => { /* essa função muda consoante o input da busca muda, pra devolver resultados instantaneos */
        setBuscaInput(e.target.value);
    }

    const ChangeOrdem = (e) => { /* muda consoante o radio, de novo, pra devolver resultados instantaneos */
        console.log(e.target.value)
        /* const { id } = e.target.value; */
        setOrdem(e.target.value);
    };    
    //
    useEffect(() => {
        console.log(ordem)        
    }, [ordem]);
    return (
        <>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    <input onChange={ChangeBusca} type="text" className="grow" placeholder="Search" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
                Filtros: 
                Ordenar por: <select onChange={ChangeOrdem} name="select-ordem" className="select select-bordered w-full max-w-xs">
                <option value="">Selecione</option>
                {filtrosModulo[modulo].map((filtro, index) => {
                    return (                                                                                                                                                         
                                filtro.type == 'number' ?
                                    <>                                        
                                        <option value={filtro.name + "%asc"}>{filtro.name} Ascendente</option>
                                        <option value={filtro.name + "%desc"}>{filtro.name} Descendente</option>
                                    </>
                                :
                                ''                                                                            
                    );
                })}
                </select>
            </div>
            <div>
                {dados.map((dado, index) => {
                    return (
                        <div key={index} className="card bordered w-full">
                            <a href={window.location.href + "/" + dado[campoDiscriminador[modulo]]}>
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