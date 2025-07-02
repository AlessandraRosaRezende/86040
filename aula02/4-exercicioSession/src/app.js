const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();

// Configurar Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware de sessão
app.use(session({
  secret: 'segredo-top',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 600000 // 10 minutos
  }
}));

// Rota principal
app.get('/', (req, res) => {
  const nomeQuery = req.query.nome;

  // Se mudou o nome na query, reinicia a sessão
  if (nomeQuery && nomeQuery !== req.session.nome) {
    req.session.nome = nomeQuery;
    req.session.contador = 1;
  }

  // Primeira visita
  if (!req.session.contador) {
    req.session.contador = 1;

    if (req.session.nome) {
      return res.render('home', {
        mensagem: `Bem-vindo, ${req.session.nome}!`
      });
    } else {
      return res.render('home', {
        mensagem: 'Bem-vindo!'
      });
    }
  }

  // Visitas subsequentes
  const count = req.session.contador;
  const nome = req.session.nome;

  req.session.contador++;

  const mensagem = nome
    ? `${nome}, você visitou a página ${count} vezes.`
    : `Você visitou a página ${count} vezes.`;

  return res.render('home', { mensagem });
});

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
})