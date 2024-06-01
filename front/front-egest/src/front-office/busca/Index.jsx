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
    const [vista, setVista] = useState(1); /* 1 = lista, 2 = quadrados */

    const [ordem, setOrdem] = useState(); 
    const { modulo } = useParams();
    //

    // discriminações quanto ao modulo
    const ordemModulo = { /* filtros que aparecem consoante o módulo */
        'nossos-servicos': [{ 'name': 'preco', 'label': 'Preço', 'type': 'number' }, { 'name': 'titulo', 'label': 'Título', 'type': 'number' }],
        'funcionario': [{ 'name': 'nome', 'label': 'Nome', 'type': 'number' }, { 'name': 'dataNascimento', 'label': 'Data de Nascimento', 'type': 'number' }, { 'name': 'entradaEmpresa', 'label': 'Data de Entrada na Empresa', 'type': 'number' }, { 'name': 'salario', 'label': 'Salário', 'type': 'number'}],
    }

    const filtrosModulo = { /* filtros que aparecem consoante o módulo */
        'nossos-servicos': [{ 'name': 'preco', 'label': 'Preço', 'type': 'number' }],
        'funcionario': [{ 'name': 'genero', 'label': 'Gênero', 'type': 'select', 'options': ['Masculino', 'Feminino', 'Outro'] }, { 'name': 'area', 'label': 'Área', 'type': 'select', 'options': ['Contábil', 'Financeiro', 'Recursos Humanos', 'Tecnologia da Informação']}, { 'name': 'salario', 'label': 'Salário', 'type': 'number'}]
    }

    const campoDiscriminador = { /* const pra escolher qual o campo que vai pro location.href */
        'nossos-servicos': '_id',
        'funcionario': '_id',
    }

    const camposEscondidos = { /* campos que não aparecem na busca */
        'nossos-servicos': ['_id', '__v'],
        'funcionario': ['_id', '__v'],
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
                    if(filtros) {                        
                        for (let key in filtros) {
                            query += '&' + key + '=' + filtros[key];
                        }
                    }                    

                    const response = await api.get(`/${modulo}/busca/${buscaInput}${query}`, { withCredentials: true });
                    setDados(response.data);                    
                } else {
                    let query = '';
                    if(ordem) {
                        query = '?ordem=' + ordem;
                    }
                    if(filtros) {                        
                        console.log('aqui')
                        for (let key in filtros) {
                            if(query == '') {
                                query += '?' + key + '=' + filtros[key];
                            } else {
                                query += '&' + key + '=' + filtros[key];
                            }
                        }
                    }                    
                    const response = await api.get(`/${modulo}${query}`, { withCredentials: true });                    
                    setDados(response.data);
                }                
            } catch (error) {
                console.log(error);
            }
        }        
        buscarDados();
    }, [buscaInput, filtros, ordem, vista]);
    //

    // funções para mudar os estados
    const ChangeBusca = (e) => { /* essa função muda consoante o input da busca muda, pra devolver resultados instantaneos */
        setBuscaInput(e.target.value);
    }

    const ChangeOrdem = (e) => { /* muda consoante o radio, de novo, pra devolver resultados instantaneos */                
        setOrdem(e.target.value);
    };    

    const ChangeFiltro = (e) => { /* muda consoante o radio, de novo, pra devolver resultados instantaneos */
        if(e.target.value != '') {
            if(filtros) {
                setFiltros({ ...filtros, [e.target.name]: e.target.value });
            } else {
                setFiltros({ [e.target.name]: e.target.value });
            }
        } else {
            let newFiltros = filtros;
            delete newFiltros[e.target.name];
            setFiltros(newFiltros);
        }
    }

    const mudarVista = (view) => {        
        setVista(view);
    }
    //    
        
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
            <div className="p-8">
                <div className="card bg-blue-200 p-14">
                    <div className="text text-xl font-bold mb-4 text-center">Filtros</div>
                
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-4">
                            <label className="label">
                                <span className="label-text">Ordenar por:</span>
                            </label>
                            <select onChange={ChangeOrdem} name="select-ordem" className="select select-bordered w-full max-w-xs">
                            <option value="">Selecione</option>
                            {ordemModulo[modulo].map((filtro, index) => {
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
                        <br />
                        <div className="flex flex-row gap-4">
                            {filtrosModulo[modulo].map((filtro, index) => {
                                return (
                                    <>
                                        <label className="label">
                                            <span className="label-text">{filtro.label}</span>
                                        </label>
                                        {filtro.type == 'number' ?
                                            <input onChange={ChangeFiltro} name={filtro.name} type="number" className="input input-bordered" />
                                            :
                                            <select onChange={ChangeFiltro} name={filtro.name} className="select select-bordered w-full max-w-xs">
                                                <option value="">Selecione</option>
                                                {filtro.options.map((option, index) => {
                                                    return (
                                                        <option key={index} value={option}>{option}</option>
                                                    );
                                                })}
                                            </select>
                                        }
                                    </>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="card">
                    <div className="text text-xl font-bold mt-4 text-center">Resultados</div>
                    <div className="flex justify-center gap-4">
                        <span><span onClick={() => mudarVista(1)}><img className="max-w-6 cursor-pointer" src="https://cdn2.iconfinder.com/data/icons/ui-minimalist-0-1-1/16/UI_Web_Grid_Sort_Size_Sort_By_List-512.png" /></span></span> <span><span onClick={() => mudarVista(2)}><img className="max-w-6 cursor-pointer" src="https://icons.veryicon.com/png/o/miscellaneous/template-four/grid-15.png" /></span></span>                        
                    </div>
                    <div className={"p-8 " + (vista == 2 ? 'grid grid-cols-3 gap-4' : '')}>                        
                        {dados.map((dado, index) => {
                            switch(vista) {
                                case 1: {
                                    return (
                                        <div key={index} className="card bordered w-full justify-center my-2">
                                            <a href={window.location.href + "/" + dado[campoDiscriminador[modulo]]}>
                                                <div className="card-body">
                                                    {Object.keys(dado).map((key, index) => {
                                                        if (camposEscondidos[modulo].includes(key)) {
                                                            return null;
                                                        }                                                        
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
                                }
                                case 2: {
                                    return (
                                        <div key={index} className="card bordered w-full justify-center my-2">
                                            <a href={window.location.href + "/" + dado[campoDiscriminador[modulo]]}>
                                                <div className="card-body">
                                                    {Object.keys(dado).map((key, index) => {
                                                        if (camposEscondidos[modulo].includes(key)) {
                                                            return null;
                                                        }
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
                                }
                            }
                            
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Busca;