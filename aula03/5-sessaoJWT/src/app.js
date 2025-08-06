const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const authService = require('./services/auth.service');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine('handlebars', require('express-handlebars').engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// rota base
app.get('/', (req, res) => {
  const token = req.cookies.access_token;
  const data = authService.verifyToken(token);
  if (!data) {
    return res.redirect('/login');
  }
  res.render('home', { user: { email: data.email } });
});

app.use(authRoutes);

app.listen(8080, () => console.log('Rodando na porta 8080'));
