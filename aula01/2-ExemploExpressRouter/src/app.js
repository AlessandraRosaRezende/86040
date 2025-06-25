const express = require('express');
const path = require('path');
const petRouter = require('./routes/pets.router');
const userRouter = require('./routes/users.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use path.join para garantir o caminho correto (http://localhost:8080/)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/pets', petRouter);
app.use('/api/users', userRouter);

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});