const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.get('/setCookie', (req, res) => {
  // res.cookie(nome_cookie, valor_cookie, {maxAge: tempo_vida_milissegundos})
  // sem o maxAge o cookie persistirá até que seja deletado
  res.cookie('CoderCookie', 'Esse é um cookie muito poderoso', {maxAge:10000}).send('Cookie')
});

app.get('/getCookie', (req, res) => {
  // obtemos o req.cookies e os enviamos para o cliente, para provar que está armazenado
  console.log(req.cookies)
  res.send(req.cookies)
})

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('CoderCookie').send('Cookie Removed')
})

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
})