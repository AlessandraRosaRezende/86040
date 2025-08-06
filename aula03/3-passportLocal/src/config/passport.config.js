const passport = require('passport');
const local = require("passport-local");
const userModel = require('../models/User');
const { createHash, isValidPassword } = require('../utils/utils')

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use('register', new LocalStrategy(
  {passReqToCallback: true, usernameField: 'email'}, async(req, username, password, done) =>{
    const { first_name, last_name, email, age } = req.body;
    try {
      let user = await userModel.findOne({ email: username });
      if (user) {
        console.log("User already exists");
        return done(null, false)
      }
      const newUser = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password)
      }

      let result = await userModel.create(newUser);

      return done(null, result);
    } catch(error) {
      return done(`Erro ao obter o usuário ${error}`)
    }
  }));

  passport.use('login', new LocalStrategy({usernameField: 'email'}, async(username, password, done) => {
    try {
      const user = await userModel.findOne({ email: username })
      if (!user) {
        console.log("User doesn't exists");
        return done(null, false)
      }
      if (!isValidPassword(user.password, password)) return done(null, false);
      return done(null, user)
    } catch(error) {
      return done(error)
    }
  }))
}

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = {
  initializePassport,
}