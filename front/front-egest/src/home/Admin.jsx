import React from "react";

const Admin = (props) => {
    let username = props.username;
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                <h1 className="text-5xl font-bold">Olá {username} </h1>
                <p className="py-6">Bem vindo de volta a egest. Sua vista atual da plataforma é de ADMIN.</p>
                <span>adicionar aqui gráficos e estatisticas</span>                
                </div>
            </div>
        </div>
    );
};

export default Admin;