const jwt = require('jsonwebtoken');
const SECRET = 'segredo_super_secreto';

function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '60s' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

module.exports = { generateToken, verifyToken };
