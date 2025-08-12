require('dotenv').config()

module.exports = {
  account: process.env.TWILIO_ACCOUNT_SID,
  token: process.env.TWILIO_AUTH_TOKEN,
  from: process.env.TWILIO_SMS_NUMBER,
}