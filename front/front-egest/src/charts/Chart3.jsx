import React, { useState, useEffect } from 'react';
import {Chart as ChartJS} from "chart.js/auto";
import {Bar, Doughnut, Line} from "react-chartjs-2";
import api from '../api/api';

const Charts = () => {

    const [areas, setAreas] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const response = await api.get('/area', { withCredentials: true });
                const areasData = response.data;
                const areasArray = areasData.map(area => area.nome);
                setAreas(areasArray);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAreas();
    }, []);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/funcionario', { withCredentials: true });
                const usersData = response.data;
                const usersArray = areas.map(area => usersData.filter(user => user.area === area).length);
                setUsers(usersArray);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, [areas]);

    return (
        <Bar
            data={{
                labels: areas,
                datasets: [
                    {
                        label: 'Funcionários',
                        data: users,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)'
                        ], 
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 1,
                    },
                ],
            }}
            options={{
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                indexAxis: 'y',
            }}
        ></Bar>
    );
};

export default Charts;