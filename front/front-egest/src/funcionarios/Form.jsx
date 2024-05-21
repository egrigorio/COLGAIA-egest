import React, { useState, useEffect } from "react";
import api from "../api/api";

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

const handleEdit = async (e) => {
    e.preventDefault();
    const response = await api.put('/funcionario', {
        nome: e.target.nome.value,
        nif: e.target.nif.value,
        cc: e.target.cc.value,
        dataNascimento: e.target.dataNascimento.value,
        entradaEmpresa: e.target.entradaEmpresa.value,
        salario: e.target.salario.value,
        genero: e.target.genero.value,
        area: e.target.area.value
    },
    { withCredentials: true });
    console.log(response);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post('/funcionario', {
        nome: e.target.nome.value,
        nif: e.target.nif.value,
        cc: e.target.cc.value,
        dataNascimento: e.target.dataNascimento.value,
        entradaEmpresa: e.target.entradaEmpresa.value,
        salario: e.target.salario.value,
        genero: e.target.genero.value,
        area: e.target.area.value
    },
    { withCredentials: true });
    console.log(response);
};

const Form = (props) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (props.id) { 
            const fetchData = async () => {
                const response = await api.get('/funcionario?_id=' + props.id, { withCredentials: true });
                setData(response.data);
            }
            fetchData().then(res => console.log(res)).catch(err => console.log(err));
        } else {
            setData(null);
        }
    }, [props.id]);

    return (
        <div>
            <form onSubmit={props.id ? handleEdit : handleSubmit}>
                <input type="text" name="nome" id="nome" placeholder="nome" defaultValue={data ? data.nome : ''} />
                <input type="text" name="nif" id="nif" placeholder="nif" defaultValue={data ? data.nif : ''} />
                <input type="text" name="cc" id="cc" placeholder="cc" defaultValue={data ? data.cc : ''} />
                <input type="date" name="dataNascimento" id="dataNascimento" placeholder="dataNascimento" defaultValue={data ? data.dataNascimento : ''} />
                <input type="date" name="entradaEmpresa" id="entradaEmpresa" placeholder="entradaEmpresa" defaultValue={data ? data.entradaEmpresa : ''} />
                <input type="text" name="salario" id="salario" placeholder="salario" defaultValue={data ? data.salario : ''} />
                <input type="text" name="genero" id="genero" placeholder="genero" defaultValue={data ? data.genero : ''} />
                <input type="text" name="area" id="area" placeholder="area" defaultValue={data ? data.area : ''} />
                <input type="submit" value="submit" />
            </form>
        </div>
    );
};

export default Form;
