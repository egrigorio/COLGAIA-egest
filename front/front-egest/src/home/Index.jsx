import React, { useContext } from 'react';
import Navbar from '../navbar/Index';
import 'chart.js/auto';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';


const Index = () => {
            
    return (
        <>
            <Navbar />
            <div>
                <h1>Home</h1>
            </div>                                 
        </>
    );
}

export default Index;