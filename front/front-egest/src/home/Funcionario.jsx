import React, { useEffect, useState } from "react";
import api from "../api/api";

const Funcionario = (props) => {
    const [ servicos, setServicos ] = useState(null); 
    const [ flagServicos, setFlagServicos ] = useState(false);
    const email = props.email;
    const username = props.username;
    console.log('/servico/filtro/user/' + email)
    const fetchServicos = async () => {
        try {
            const response = await api.get('/servico/filtro/user/' + email, { withCredentials: true });
            console.log(response)
            setServicos(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    const Servicos = () => {
        return (            
            <div>
                {servicos?.map(servico => {
                    return (
                        <>                            
                            <div className="card w-96 bg-base-100 shadow-xl">                             
                                <div className="card-body">
                                    <h2 className="card-title">Título do serviço: {servico.nome}</h2>
                                    <p><b>Descrição:</b> {servico.descricao}</p>
                                    <p><b>Preço:</b> {servico.preco}</p>
                                    <p><b>Duração:</b> {servico.duracao}</p>
                                    <div className="card-actions justify-end">                                    
                                    </div>
                                </div>
                            </div>                            
                        </>
                    )
                })}
            </div>
        )
    };

    useEffect(() => {
        fetchServicos();
    }, []);
    
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">egest</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                    <li><a onClick={
                        () => {
                            document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                            localStorage.removeItem('cargo');
                            window.location.href = '/';
                        }
                    }>Logout</a></li>                                    
                    </ul>
                </div>
            </div>
            <div className="hero min-h-screen bg-base-200 flex flex-col py-24">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Olá, {username} </h1>
                        <p className="py-6">Bem vindo(a) de volta a egest. Clique no botão abaixo para verificar os serviços a que lhe foram atribuidos</p>                    
                        <button className="btn btn-ghost"><a onClick={() => {setFlagServicos(!flagServicos)}}>Ver/esconder serviços</a></button>
                    </div>
                </div>
                {flagServicos ? <Servicos /> : null}
            </div>            
        </>
    );
};

export default Funcionario;