import React, { useState, useEffect } from "react";
import api from "../api/api";

/*
    exemplo de dados para inserção (se inserir esses exatos valores não dá problema, convém é apagar pq alguns são unique na db) : {
        nome: 'Enzo',
        nif: '302471189',                           ## o NIF tem validação na api, mandá um valido ##
        cc: '18398391 2 ZY7',                   ## a API também tem uma validação do CC, então na duvida insere esse que já pus aí ##
        dataNascimento: '1999-09-09',                       ## quanto a data, o formato é 'YYYY-MM-DD', acho que ao colocar
        entradaEmpresa: '2021-09-09',                          o input type="date" ele já faz isso automaticamente ##
        salario: '1000',                        ## tem de ser um valor númerico ##
        genero: 'Masculino',
        area: 'Informática'
    }
*/

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
    {withCredentials: true});
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
    {withCredentials: true});
    console.log(response);
    
};

const Form = (props) => {    
    const [data, setData] = useState(null);
    
    useEffect(() => {
        if(props.id) { /* se tiver, é pq é de edição, então tenho de puxar os dados da api */
            const fetchData = async () => {
                const response = await api.get('/funcionario?_id=' + props.id, {withCredentials:true});
                setData(response.data);
            }
            fetchData().then(res => console.log(res)).catch(err => console.log(err));
        } else {
            data = null;
        }
    }, [props.id])
    
    
    return (
        <div>
            <form onSubmit={props.id ? handleSubmit : handleEdit}>
                <input type="text" name="nome" id="nome" placeholder="nome" defaultValue={data ? data[0].nome : ''}/> {{/* essas validações é pra preencher o formulário com os dados que puxeu da db*/}}
                <input type="text" name="nif" id="nif" placeholder="nif" defaultValue={data ? data[0].nif : ''}/>
                <input type="text" name="cc" id="cc" placeholder="cc" defaultValue={data ? data[0].cc : ''}/>
                <input type="date" name="dataNascimento" id="dataNascimento" placeholder="dataNascimento" defaultValue={data ? data[0].dataNascimento : ''}/> {{/* ajustar pq o que vem da db não está */}}
                <input type="date" name="entradaEmpresa" id="entradaEmpresa" placeholder="entradaEmpresa" defaultValue={data ? data[0].entradaEmpresa : ''}/> {{/* de acordo com o formato que o input deseja */}}
                <input type="text" name="salario" id="salario" placeholder="salario" defaultValue={data ? data[0].salario : ''}/>
                <input type="text" name="genero" id="genero" placeholder="genero" defaultValue={data ? data[0].genero : ''}/>
                <input type="text" name="area" id="area" placeholder="area" defaultValue={data ? data[0].area : ''}/>
                <input type="submit" value="submit"/>
            </form>
        </div>
    )
}

export default Form;