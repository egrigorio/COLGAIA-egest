const express = require('express');
const conn = require('./db/conn');
const cookieParser = require('cookie-parser');
const auth = require('./auth/auth');
const cors = require('cors');
const app = express();

const userRoute = require('./routes/user.route');
const areaRoute = require('./routes/area.route');
const funcionarioRoute = require('./routes/funcionario.route');
const servicoRoute = require('./routes/servico.route');
const tipoRoute = require('./routes/tipo.route');

conn();

app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000'],
  credentials: true
}));
app.use(cookieParser());

app.use(express.json());
app.use('/api', userRoute);
app.use('/api', auth, funcionarioRoute);
app.use('/api', auth, areaRoute);
app.use('/api', auth, servicoRoute);
app.use('/api', auth, tipoRoute);

const PORT = process.env.PORT || 9081;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});