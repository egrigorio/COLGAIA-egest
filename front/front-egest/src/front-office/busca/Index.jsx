import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import Navbar from "../Navbar";

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
            <Navbar />
            <div className="flex justify-center"> {/* Add this div to center the search bar */}
                <div className="mb-3 xl:w-96">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                            onChange={ChangeBusca}
                            type="search"
                            className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-addon2" />

                        {/* <!--Search icon--> */}
                        <span
                            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                            id="basic-addon2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5">
                                <path
                                    fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
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