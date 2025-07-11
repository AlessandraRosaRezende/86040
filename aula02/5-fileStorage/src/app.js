const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')
const path = require('path')

const app = express()
const fileStorage = FileStore(session)

app.use(cookieParser())

const pathFile = path.join(__dirname, './sessions')
app.use(session({
  store: new fileStorage({ path: pathFile, ttl:100, retries:0 }),
  secret: 'CoderSecret',
  resave: false,
  saveUninitialized: false
}))

const auth = (req, res, next) => {
  if (req.session?.admin) {
    return next();
  }

  return res.status(401).send('erro de autorização!')
}

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (!err) res.send('Logout ok!')
    else res.send({ status: 'Logout error', body: err });
  })
})

app.get('/login', (req,res) => {
  const { username, password } = req.query;

  if (username !== 'pepe' || password !== 'pepepass' ) {
    req.session.admin = false;
    return res.send('login failed')
  }

  if (req.session.counter) {
    req.session.counter++;
  } else {
    req.session.counter = 1
  }

  req.session.user = username;
  req.session.admin = true

  console.log(req.session);
  res.send('login success!')
})

app.get('/privado', auth, (req, res) => {
  res.send('Se você está vendo isso, é porque é um admin')
})

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
})