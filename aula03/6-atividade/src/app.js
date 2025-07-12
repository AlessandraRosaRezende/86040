const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { generateToken, verifyToken } = require('./services/auth.service');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send('Missing email');
  const token = generateToken({ email });
  res.cookie('auth_token', token, { maxAge: 60 * 1000 });
  // res.cookie('auth_token', token, {
  //   maxAge: 60 * 1000,
  //   httpOnly: true
  // });
  res.sendStatus(200);
});

// rota protegida de teste
app.get('/protected', (req, res) => {
  const token = req.cookies.auth_token;
  const data = verifyToken(token);
  if (!data) return res.sendStatus(401);
  res.send(`Autenticado como ${data.email}`);
});

app.listen(8080, () => console.log('Rodando em http://localhost:8080'));