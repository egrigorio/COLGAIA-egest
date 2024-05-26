import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import api from '../api/api';

const Chart2 = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [funcionariosEmail, setFuncionariosEmail] = useState([]);
    const [servicosCountArray, setServicosCountArray] = useState([]);

    useEffect(() => {
        
        const fetchFuncionarios = async () => {
            try {
                const response = await api.get('/funcionario', { withCredentials: true });
                const funcionariosData = response.data;
                const funcionariosArray = funcionariosData.map(funcionario => funcionario.nome);
                const funcionariosEmailArray = funcionariosData.map(funcionario => funcionario.email)
                setFuncionarios(funcionariosArray);
                setFuncionariosEmail(funcionariosEmailArray);
            } catch (error) {
                console.log(error);
            }
        };

        fetchFuncionarios();
    }, []);

    useEffect(() => {
        const getServicosCount = async () => {
            try {
                const servicosCountArray = await Promise.all(funcionariosEmail.map(async (funcionario) => {
                    const response = await api.get('/servico', { withCredentials: true });
                    const servicosData = response.data;
                    const servicosCount = servicosData.filter(servico => servico.funcionario === funcionario).length;
                    return servicosCount;
                }));
                setServicosCountArray(servicosCountArray);
            } catch (error) {
                console.log(error);
            }
        };

        getServicosCount();
    }, [funcionarios]);


    const data = {
        labels: funcionarios,
        datasets: [
            {
                data: servicosCountArray,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return <Doughnut data={data} />;
};

export default Chart2;