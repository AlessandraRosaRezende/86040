const passport = require('passport')
const jwt = require('passport-jwt')
const User = require('../models/user.model');
require('dotenv').config();

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req, res) => {
  let token = null;
  if (req && req.cookies) {
    token = req.signedCookies['currentUser']
    console.log(token); // depois
  }
  return token;
}

const initializePassport = () => {
  passport.use('jwt', new JWTStrategy({
    // jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor, ExtractJWT.fromAuthHeaderAsBearerToken()]),
    secretOrKey: process.env.JWT_SECRET
  }, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      if (!user) {
        return done(null, false, { message: 'Login failed' });
      }
      return done(null, user);
    } catch (error) {
      return done(error, false)
    }
  }))
}

module.exports = initializePassport