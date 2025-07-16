const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const path = require('path');
require('dotenv').config();

const apiRoutes = require('./routes/user.router');
const viewRoutes = require('./routes/view.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo conectado'))
  .catch(console.error);

app.get('/', (req, res) => {
  res.redirect('/users/login');
});

app.use('/api/users', apiRoutes);
app.use('/users', viewRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Rodando em http://localhost:${PORT}`));
