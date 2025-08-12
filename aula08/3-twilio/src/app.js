const express = require('express')
const twilio = require('twilio')
const config = require('./config/config')

const app = express()

const client = twilio(config.account, config.token)

app.get('/', (req, res) => {
  res.send('Welcome to the Twilio SMS service!')
});

app.get('/sms', async (req, res) => {
  let result = await client.messages.create({
    to: '+5531992782642', 
    from: config.from,
    body: 'Teste de envio de SMS!'
  });
  return res.send(`Message sent with SID: ${result.sid}`);
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});