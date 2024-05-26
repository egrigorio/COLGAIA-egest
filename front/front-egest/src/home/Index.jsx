import React, { useContext } from 'react';
import Navbar from '../navbar/Index';
import Admin from './Admin';
import Funcionario from './Funcionario';

const Index = (props) => {
    console.log(props.cargo)
    let cargo = props?.cargo;
    let email = props?.email;
    let username = props?.username;
    switch(cargo.toLowerCase()) {
        case 'admin': {
            return (
                <>
                    <Navbar />
                    <Admin username={username} />
                </>
            )
        }
        case 'funcionário': {
            return (
                <>                    
                    <Funcionario username={username} email={email} />
                </>
            )
        }
    };    
}

export default Index;