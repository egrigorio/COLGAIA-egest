import React from "react";

const Navbar = () => {
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a href="/" className="btn btn-ghost text-xl">egest</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">                                                
                        <li><a href="/v/funcionario">Funcionários</a></li>
                        <li><a href="/v/user">Utilizadores</a></li>
                        <li><a href="/v/area">Áreas de atuação</a></li>
                        <li><a href="/v/servico">Serviço</a></li>
                        <li><a href="/v/tipo">Tipo de utilizador</a></li>
                        <li><a href="/v/infoempresa">Informações da Empresa</a></li>
                        <li><a href="/v/navbar">Navbar</a></li>
                        <li><a href="/v/nossos-servicos">Nossos Serviços</a></li>
                        <li><a onClick={() => {
                            document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                            localStorage.removeItem('cargo');
                            window.location.href = '/';
                        }}>Logout</a></li>
                    </ul>
                </div>
            </div>            
        </>
    );
}

export default Navbar;