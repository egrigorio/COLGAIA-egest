import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Home from './home/Index';
import Utilizadores from './utilizadores/Index';
import Registar from './auth/Registar';
import Funcionarios from './funcionarios/Index';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const authToken = Cookies.get('authToken');
  return (
    <BrowserRouter>
<<<<<<< Updated upstream
      <Routes>
        <Route path="/login" element={authToken ? <Navigate to="/" /> : <Login /> } />
        <Route path="/registar" element={authToken ? <Navigate to="/" /> : <Registar />} />
        <Route path="/" element={authToken ? <Home /> : <Navigate to="/login" />} />
        <Route path="/funcionarios" element={authToken ? <Funcionarios /> : <Navigate to="/login" />} />
        <Route path="/funcionarios/:acao/:id?" element={authToken ? <Funcionarios /> : <Navigate to="/login" />} />
        
        
=======
      <Routes>        
        <Route path="/adm/login" element={authToken ? <Navigate to="/" /> : <Login /> } />
        <Route path="/adm/registar" element={authToken ? <Navigate to="/" /> : <Registar />} />
        <Route path="/" element={authToken ? <Home cargo={cargo} email={email} username={username} /> : <Navigate to="/fo" />} />
        <Route path="/v/:modulo/:acao?/:id?" element={authToken ? decoded.cargo.toLowerCase() == 'admin' ? <Tabelas /> : <Navigate to="/fo" /> : <Navigate to="/fo" /> } />        
        <Route path="/fo/" element={<Index />} />
        <Route path="*" element={<Navigate to="/" />} />
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}

export default App;
