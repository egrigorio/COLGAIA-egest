import React, { useState } from 'react';
import Navbar from '../navbar/Index';

const Utilizadores = () => {
    const [ dadosUtilizadores, setDadosUtilizadores ] = useState(null);
    const camposEscondidos = ['_id', '__v']; /* campos que vem da db e não desejamos mostrar na tabela */
    
    return (
        <>
            <Navbar />
            <div>
                <h1>Utilizadores</h1>
            </div>                                 
        </>
    );

}

export default Utilizadores;