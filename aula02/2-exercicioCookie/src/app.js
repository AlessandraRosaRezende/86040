const express = require('express');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuração do handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rota para renderizar a página inicial
app.get('/', (req, res) => {
  res.render('home');
});

// Rota POST para criar o cookie
app.post('/set-cookie', (req, res) => {
  const { nome, email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email é obrigatório' });
  }
  // Cookie com valor JSON em string, duração 10 segundos
  res.cookie('usuario', JSON.stringify({ usuario: email }), {
    maxAge: 10 * 1000,
    httpOnly: false // para que o frontend possa acessar via JS
  });
  res.json({ message: `Cookie criado para ${email}` });
});

// Rota GET para retornar o cookie
app.get('/get-cookie', (req, res) => {
  const cookie = req.cookies.usuario;
  if (!cookie) {
    return res.json({ usuario: null });
  }
  try {
    const valor = JSON.parse(cookie);
    res.json(valor);
  } catch {
    res.json({ usuario: null });
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
