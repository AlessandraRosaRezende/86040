require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer')

const app = express();

const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587, // default
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  },
});

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.get('/mail', async (req, res) => {
  let result = await transport.sendMail({
    from: `Coder Tests <${process.env.GMAIL_USER}>`,
    to: `e-mail para onde será enviado <${process.env.GMAIL_USER}>`,
    subject: 'Teste de envio de e-mail',
    html: `
      <div>
        <h1>Teste de envio de e-mail</h1>
        <p>Este é um e-mail de teste enviado pelo Node.js.</p>
        <h2> Turma 86040 - Backend </h2>
      </div>`,
    attachments: [] // sem anexos
  });
  return res.json(result);
});

app.listen(8080, () => console.log('Server running on http://localhost:8080'));