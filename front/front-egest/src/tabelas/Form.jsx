import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useParams } from 'react-router-dom';
import campos from '../config';
import Navbar from "../navbar/Index";

const Form = (props) => {   
    const [data, setData] = useState(null);
    const [opcoes, setOpcoes] = useState(null);    
    const [flagModulo, setFlagModulo] = useState(false);
    const modulo = useParams().modulo;
    const formCampos = campos(modulo);
    

    console.log(modulo)
    
    useEffect(() => { 
        switch(modulo) {
            case 'user': {                                 
                const fetchOpcoes = async () => {
                    try {
                        const response = await api.get('/tipo/filtro/tipo', { withCredentials: true });
                        setOpcoes(response.data.map(obj => obj.tipo));
                    } catch (error) {
                        console.log(error);
                    }
                };
                fetchOpcoes();
                break;
            }
            case 'funcionario': {                     
                setFlagModulo(true);
                const fetchOpcoes = async () => {                        
                    try {
                        const responseArea = await api.get('/area/filtro/nome', { withCredentials: true });
                        const responseEmail = await api.get('/user/filtro/email', { withCredentials: true });

                        setOpcoes({
                            area: responseArea.data.map(obj => obj.nome),
                            email: responseEmail.data.map(obj => obj.email)
                        });
        
                    } catch (error) {
                        console.log(error);
                    }
                };
                fetchOpcoes();
                break;
            }
            case 'servico': {
                setFlagModulo(true);
                const fetchOpcoes = async () => {
                    try {
                        const responseEmail = await api.get('/user/filtro/email', { withCredentials: true });
                        const responseArea = await api.get('/area/filtro/nome', { withCredentials: true });
                        setOpcoes({
                            funcionario: responseEmail.data.map(obj => obj.email),
                            area: responseArea.data.map(obj => obj.nome)
                        })                                
                    } catch (error) {
                        console.log(error);
                    }
                };
                fetchOpcoes();
                break;
            }
        }
    }, []);
    useEffect(() => {
        if (props.id != undefined) {
            console.log(props.id)       
            const fetchData = async () => {
                try {
                    const responseApi = await api.get('/' + modulo + '/' + props.id, { withCredentials: true });
                    if (responseApi.status === 404) { alert('Não encontrado'); return;}
                    setData(responseApi.data);
                } catch (error) {
                    console.log(error);
                }                
            }
            fetchData().then(res => console.log(res)).catch(err => console.log(err));
        } else {
            setData(null);
        }
    }, [props.id]);
    
                
    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const response = await api.put('/' + modulo + '/' + e.target.id.value, formData, { withCredentials: true });
            console.log(response);
            window.location.href = '/v/' + modulo;
        } catch (error) {            
            console.log(error);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const response = await api.post('/' + modulo, formData, { withCredentials: true });
            console.log(response);
            window.location.href = '/v/' + modulo;
        } catch (error) {
            console.log(error);
        }
    };      
    
    console.log(opcoes)
    console.log(formCampos)
    return (
        <>
            <Navbar />
            <div className="">
                <h1 className='text text-lg font-bold text-center'>{props.id ? 'Editar' : 'Adicionar'} {modulo}</h1>
                <form onSubmit={props.id ? handleEdit : handleSubmit} className="flex flex-col items-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                        <input type="hidden" name="id" id="id" defaultValue={data ? data[0]._id : ''} />
                        {formCampos?.map((campo, index) => (
                            
                            campo.type == 'select' ? 
                            (
                            <>
                                <label key={index} htmlFor={campo.name} className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">{campo.label}</span>
                                    </div>
                                    <select 
                                        key={index}
                                        name={campo.name}
                                        id={campo.name}
                                        defaultValue={data ? data[0][campo.name] : ''}
                                        className="select select-bordered w-full "
                                    >                        
                                        <option value=''>Selecione {campo.name} </option>                            
                                        {flagModulo && opcoes && opcoes[campo.name] && opcoes[campo.name].map((opcao, index) => {
                                            return <option key={`${campo.name}-${index}`} value={opcao}>{opcao}</option>
                                        })}
                                        {!flagModulo && opcoes && opcoes.map((opcao, index) => {                                
                                            return <option key={`opcao-${index}`} value={opcao}>{opcao}</option>
                                        })} 
                                        
                                    </select>                        
                                </label>
                            </>
                            ) : 
                            (
                            <>
                                <label key={index} htmlFor={campo.name} className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text">{campo.label}</span>                                
                                    </div>
                                    <input 
                                        type={campo.type} 
                                        placeholder={campo.placeholder} 
                                        id={campo.name} 
                                        defaultValue={data ? data[0][campo.name] : ''} 
                                        className="input input-bordered w-full " />                            
                                </label>
                                
                            </>
                            )
                        ))}                
                    </div>
                    <input type="submit" value={props.id ? 'Editar' : 'Adicionar'} className="mt-8 btn btn-ghost self-center" />
                </form>
            </div>
        </>
    );
};

export default Form;
