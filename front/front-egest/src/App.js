import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Home from './home/Index';
import Registar from './auth/Registar';
import Cookies from 'js-cookie';
import Tabelas from './tabelas/Index';
import Index from './front-office/Index';
import { jwtDecode } from 'jwt-decode';
import './App.css';

function App() {      
  const authToken = Cookies.get('authToken');
  let decoded;
  let cargo;
  let email;
  let username;
  try {
    decoded = jwtDecode(authToken);
    console.log(decoded)
    cargo = decoded.cargo;
    email = decoded.email;
    username = decoded.username;
    console.log(decoded)
  } catch (error) {
    console.log('erro ao decodificar token')  
  }
  if(!localStorage.getItem('cargo')) {
    localStorage.setItem('cargo', decoded?.cargo);
  }
  
  return (
    <BrowserRouter>
      <Routes>        
        <Route path="/adm/login" element={authToken ? <Navigate to="/" /> : <Login /> } />
        <Route path="/adm/registar" element={authToken ? <Navigate to="/" /> : <Registar />} />
        <Route path="/" element={authToken ? <Home cargo={cargo} email={email} username={username} /> : <Navigate to="/fo" />} />
        <Route path="/v/:modulo/:acao?/:id?" element={authToken ? decoded.cargo.toLowerCase() == 'admin' ? <Tabelas /> : <Navigate to="/fo" /> : <Navigate to="/fo" /> } />        
        <Route path="/fo/" element={<Index />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
