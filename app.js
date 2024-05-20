const express = require('express');
const conn = require('./db/conn');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const auth = require('./auth/auth');
const app = express();

const userRoute = require('./routes/user.route');
const funcionarioRoute = require('./routes/funcionario.route');

conn();

app.use(cookieParser());

app.use(express.json());
app.use('/api', userRoute);
app.use('/api', auth, funcionarioRoute);

const PORT = process.env.PORT || 9081;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});