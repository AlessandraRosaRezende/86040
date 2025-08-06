const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = async(password) => {
  return bcrypt.hash(password, 10);
}

const comparePassword = async(plain, hashed) => {
  return bcrypt.compare(plain, hashed);
}

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { hashPassword, comparePassword, generateToken, verifyToken };
