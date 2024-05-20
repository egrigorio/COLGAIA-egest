import React from 'react';
import api from '../api/api';

const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmar_password = e.target.confirmar_password.value;
    const response = await api.post('/registar', {username, password, confirmar_password}, {withCredentials: true});    
    console.log(response);

}
const Registar = () => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" id="username" placeholder="username"/>
                <input type="password" name="password" id="password" placeholder="password"/>
                <input type="password" name="confirmar_password" id="confirmar_password" placeholder="confirmar_password"/>
                <select name="cargo" id="cargo">
                    <option value="admin">admin</option>
                </select>
                <input type="submit" value="registar"/>
            </form>
        </div>
    );
};

export default Registar;