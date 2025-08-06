const mongoose = require('mongoose');
const { hashPassword } = require('../utils/auth');

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  role: { type: String, default: 'user' },
  password: String,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hashPassword(this.password);
  next();
});

// comparePassword será referenciado via service
module.exports = mongoose.model('User', userSchema);
