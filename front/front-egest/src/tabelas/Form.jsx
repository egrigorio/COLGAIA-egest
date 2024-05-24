import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useParams } from 'react-router-dom';
import campos from '../config';

// Dados de exemplo para inserção (remover valores únicos na db)
const exampleData = {
    nome: 'Enzo',
    nif: '302471189',
    cc: '18398391 2 ZY7',
    dataNascimento: '1999-09-09',
    entradaEmpresa: '2021-09-09',
    salario: '1000',
    genero: 'Masculino',
    area: 'Informática'
};


const Form = (props) => {   
    
    const modulo = props.modulo;
    const [data, setData] = useState(null);
    const formCampos = campos(modulo);
    useEffect(() => {
        if (props.id) { 
            const fetchData = async () => {
                const response = await api.get('/' + modulo + '/' + props.id, { withCredentials: true });
                console.log(response)
                setData(response.data);
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
        
    return (
        <div>
            <form onSubmit={props.id ? handleEdit : handleSubmit}>
                <input type="hidden" name="id" id="id" defaultValue={data ? data[0]._id : ''} />
                {formCampos.map((campo, index) => (
                    <input 
                        key={index}
                        type={campo.type}
                        name={campo.name}
                        id={campo.name}
                        placeholder={campo.placeholder}
                        defaultValue={data ? data[0][campo.name] : ''}
                    />
                ))}                
                <input type="submit" value="submit" />
            </form>
        </div>
    );
};

export default Form;
