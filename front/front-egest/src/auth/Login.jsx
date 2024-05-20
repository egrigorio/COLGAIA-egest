import React from 'react';
import api from '../api/api';

const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const response = await api.post('/login', {username, password}, {withCredentials: true});    
    console.log(response);    
    
};

const Login = () => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" id="username" placeholder="username"/>
                <input type="password" name="password" id="password" placeholder="password"/>
                <input type="submit" value="login"/>
            </form>
        </div>
    );
};

export default Login;