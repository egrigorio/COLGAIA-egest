import React from 'react';

const Hero = () => {
    return (
        <div className="hero">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <h1>Egest</h1>
                        <p>Uma aplicação de gestão de conteúdos</p>
                        <a href="/adm/login" className="btn btn-primary">Login</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;