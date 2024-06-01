import React, { useEffect, useState } from "react";
import api from "../api/api";

const Navbar = () => {
    const [nomeEmpresa, setNomeEmpresa] = useState(null);
    const [items, setItems] = useState(null);
    const [tag, setTag]= useState(null)

    useEffect(() => {
        const buscarEmpresa = async () => {
            try {
                const response = await api.get('/infoempresa', { withCredentials: true });
                setNomeEmpresa(response.data[0].nome);
            } catch (error) {
                console.log(error);
            }
        }
        const buscarItems = async () => {
            try {
                const response = await api.get('/navbar', { withCredentials: true });
                setItems(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        buscarItems();
        buscarEmpresa();      
    }, []);

    useEffect(()=>{
        if (nomeEmpresa) {
           setTag(<a href="/fo" className="btn btn-ghost text-xl">{nomeEmpresa}</a>);
        } else {
           setTag(<a href="/fo" className="btn btn-ghost text-xl">Nome da Empresa</a>);
        }
    },[nomeEmpresa]);

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
            {tag}
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    {/* {items && items.map(item => {                        
                        switch (item.tipo) {
                            case 'link':
                                return <li key={item.label}><a href={item.url}>{item.label}</a></li>;
                            case 'button':
                                return <li key={items.nome}><button onClick={items.action}>{items.nome}</button></li>;
                            default:
                                return null;
                        }
                    })} */}
                    <li key="Serviços"><a href="/fo/nossos-servicos">Serviços</a></li>
                    <li key="Funcionários"><a href="/fo/funcionario">Funcionários</a></li>
                    <li key="Login"><a href="/adm/login">Login</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;