import React from 'react';
import api from '../api/api';
import Swal from 'sweetalert2';

const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      const response = await api.post('/login', {username, password}, {withCredentials: true});
      console.log(response.status);
      if (response.status === 200) window.location.href = '/';
    } catch (error) {
      if (error.response.status === 404) Swal.fire('Erro', 'Usuário não encontrado', 'error');
    }
  };

  return (
    <div className="light min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl text-gray-800 text-center font-bold">egest</h2>
        <p className="mt-2 text-center text-gray-600">entra na tua conta</p>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label className="text-gray-800 font-semibold" htmlFor="username">
              Username
            </label>
            <input
              className="px-3 py-2 bg-gray-200 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              id="username"
              name="username"
              placeholder="insira o seu username"
              required
              type="text"
            />
          </div>
          <div className="flex flex-col mb-6">
            <label className="text-gray-800 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              className="px-3 py-2 bg-gray-200 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              id="password"
              name="password"
              placeholder="insira a sua password"
              required
              type="password"
            />
          </div>
          <button className="w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600" type="submit" value="login">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;