const jwt = require('jsonwebtoken');
const SECRET = 'super-secret';
function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '60s' });
}
function verifyToken(token) {
  try { return jwt.verify(token, SECRET); }
  catch { return null; }
}
module.exports = { generateToken, verifyToken };
