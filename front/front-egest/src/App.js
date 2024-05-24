import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Home from './home/Index';
import Registar from './auth/Registar';
import Cookies from 'js-cookie';
import Tabelas from './tabelas/Index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const authToken = Cookies.get('authToken');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={authToken ? <Navigate to="/" /> : <Login /> } />
        <Route path="/registar" element={authToken ? <Navigate to="/" /> : <Registar />} />
        <Route path="/" element={authToken ? <Home /> : <Navigate to="/login" />} />                
        <Route path="/v/:modulo/:acao?/:id?" element={authToken ? <Tabelas /> : <Navigate to="/login" />} />        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
