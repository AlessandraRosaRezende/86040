const express = require('express');

const app = express();

// middleware de rota
const router = express.Router();

// middleware embutido
// app.use(express.static('public', options)) 
app.use(express.static('public')) 

app.get('/antes', (req, res) => {
  res.send('Antes do middleware de aplicação')
})

// middleware de aplicação
app.use((req, res, next) => {
  console.log('Middleware de aplicação executado na data: ', new Date());
  next()
})

// app.get('/', (req, res) => {
//   res.send('Oi')
// })

app.get('/', (req, res) => {
  if(!req.body) {
    throw new Error('Erro')
  }
  res.send('Depois do Middleware')
})

app.get('/depois', (req, res) => {
  res.send('Depois do Middleware')
})

// middleware de endpoint
const mid1 = (req, res, next) => {
  req.mid1 = 'Middleware 1';
  next()
}

const mid2 = (req, res, next) => {
  req.mid2 = 'Middleware 2';
  next()
}

app.get('/endpoint', mid1, mid2, (req, res) => {
  res.json({ mid1: req.mid1, mid2: req.mid2 })
})

// middleware de erro - tem que ser o último! 4 parâmetros
app.use((error, req, res, next) => {
  console.log(error.stack);
  res.status(500).json('Middleware de erro - Algo deu errado')
})

app.listen(8080, () => {
  console.log('Rodando na porta 8080');
})