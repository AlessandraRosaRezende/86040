const dotenv = require('dotenv');

const environment = 'development';

dotenv.config({
  path:environment === 'development' ? './.env.development' : './.env.production'
});

module.exports = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD
}