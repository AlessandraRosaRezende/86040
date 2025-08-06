const bcrypt = require('bcrypt');

const createHash = (password) => {
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return hashedPassword
};

const isValidPassword = (hash, password) => {
  const isValid = bcrypt.compareSync(password, hash);
  return isValid
};

module.exports = {
  createHash,
  isValidPassword
}