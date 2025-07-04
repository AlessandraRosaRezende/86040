const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const handlebars = require('express-handlebars');
const path = require('path');
const { dbConn, url } = require('./db/connection');
const sessionRoutes = require('./routes/sessions.routes');
const viewRoutes = require('./routes/views.routes');

const app = express();

// DB
dbConn.then(() => {
  console.log('Database connection established');
}).catch((error) => {
  console.error('Database connection failed:', error);
});

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  store: MongoStore.create({
    mongoUrl: url,
    ttl:100,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 // 1 hora
  },
  secret: 'CoderSecret',
  resave: false,
  saveUninitialized: false
}));

// Views
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/sessions', sessionRoutes);
app.use('/', viewRoutes);

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080')
});
