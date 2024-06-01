import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const Componente = () => {
    const { modulo, componente } = useParams();
    const [infoComponente, setInfoComponente] = useState([]);

    const camposEscondidos = ['_id', '__v'];
    
    useEffect(() => {
        const BuscarInfoComponente = async () => {
            try {
                const response = await api.get(`/${modulo}/${componente}`, { withCredentials: true });  
                console.log(response)          
                setInfoComponente([response.data]);
            } catch (error) {
                console.error(error);
            }
        };
        BuscarInfoComponente();
    }, []);

    useEffect(() => {
        console.log(infoComponente);
    
    }, [infoComponente]);

    return (
        <>
        <Navbar/>
            <div className="container mx-auto">
                <h1>Componente</h1>
            </div>
            {
                Array.isArray(infoComponente) && infoComponente.map((item, index) => {
                    return (
                        <div key={index}>
                            {Object.keys(item).map(key => (
                                camposEscondidos.includes(key) ? null : <p key={key}><strong>{key}:</strong> {item[key]}</p>                                
                            ))}
                        </div>
                    );
                })
            }
        </>
    );
};

export default Componente;