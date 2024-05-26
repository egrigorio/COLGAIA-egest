import React from 'react';
import {Chart as ChartJS} from "chart.js/auto";
import {Bar, Doughnut, Line} from "react-chartjs-2";
import api from '../api/api';

const Charts = () => {



    return (
        <Bar
            data={{
                labels: ['Red', 'Blue'], // Added 'Blue' label
                datasets: [
                    {
                        label: 'Red Votes',
                        data: [12, 8], // Added data for 'Blue' votes
                        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'], // Added background color for 'Blue'
                        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'], // Added border color for 'Blue'
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