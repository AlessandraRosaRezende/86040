require('dotenv').config();
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = process.env.PRIVATE_KEY;

function generateToken(payload) {
  return jwt.sign(payload, PRIVATE_KEY, { expiresIn: '60s' });
}
function verifyToken(token) {
  try { return jwt.verify(token, PRIVATE_KEY); }
  catch { return null; }
}
module.exports = { generateToken, verifyToken };
