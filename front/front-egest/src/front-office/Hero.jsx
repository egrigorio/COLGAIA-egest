import React from 'react';
import Chart3 from '../charts/Chart3';

const Hero = () => {
    return (
        <div className="hero">
            <div className="container">
                <div className="row align-items-center justify-content-center"> 
                    <div className="col-lg-6 text-center mt-10">                        
                        <h1 className="text-5xl font-bold">Bem Vindo ao Frontoffice</h1>
                    </div>
                </div>
                <div className="charts-container flex flex-row gap-36 justify-center mt-4">
                        <div className="chart" style={{ display: "inline-block" }}>
                            <h1 className="text-2xl font-bold mt-2 text-center">Funcionários por Àrea</h1>
                            <Chart3/>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;