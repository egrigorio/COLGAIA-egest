import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const Componente = () => {
    const { modulo, componente } = useParams();
    const [infoComponente, setInfoComponente] = useState([]);

    const camposEscondidos = ['_id', '__v', 'nome', 'imagem', 'titulo'];
    
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
            {
                Array.isArray(infoComponente) && modulo!="nossos-servicos" ? (
                    <div>
                        {
                            infoComponente.map((componente, index) => (
                                <div key={index}>
                                    <h1 className="text-center mt-2 font-bold text-2xl">{componente.nome}</h1>
                                    <table className="mt-4 table-auto mx-auto">
                                        <tbody>
                                            {
                                                Object.keys(componente).map((key, index) => (
                                                    camposEscondidos.includes(key) ? null : (
                                                        <tr key={index}>
                                                            <td className="pr-2 font-bold">{key}</td>
                                                            <td className="pl-2"> {componente[key]}</td>
                                                        </tr>
                                                    )
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div>
                        {
                            infoComponente.map((componente, index) => (
                                <div key={index}>
                                    <h1 className="text-center mt-2 font-bold text-2xl">{componente.titulo}</h1>
                                    <table className="mt-4 table-auto mx-auto">
                                        <tbody>
                                            {
                                                Object.keys(componente).map((key, index) => (
                                                    camposEscondidos.includes(key) ? null : (
                                                        <tr key={index}>
                                                            <td className="pr-2 font-bold">{key}</td>
                                                            <td className="pl-2"> {componente[key]}</td>
                                                        </tr>
                                                    )
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <div className="flex justify-center">
                                        <img src={`${process.env.PUBLIC_URL}/${componente.imagem}`} alt={`${componente.imagem}`} style={{ height: "200px" }} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </>
    );
};

export default Componente;