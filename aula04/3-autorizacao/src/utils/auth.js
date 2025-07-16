const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport')

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function comparePassword(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

const passportCall = (strategy) => {
  return async(req, res, next) => {
    passport.authenticate(strategy, function(err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.status(401).send({error: info.messages ? info.messages : info.toString()})
      }
      req.user = user;
      next();
    }) (req, res, next)
  }
}

const authorization = (role) => {
  return async(req, res, next) =>{
    console.log(req.user.role);
    console.log(role);
    if (!req.user) return res.status(401).send({ error: "Unauthorized" })
    if (req.user.role != role) {
      return res.status(403).send({ error: "No permission" })
    }
    next()
  }
}

module.exports = { hashPassword, comparePassword, generateToken, verifyToken, passportCall, authorization };
