const express = require('express');
const { fork } = require('child_process');

const app = express();
let visitas = 0;

// Rota raiz que conta o número total de visitas
app.get('/', (req, res) => {
  visitas++;
  res.send(`Número total de visitas: ${visitas}`);
});

// Rota que realiza o cálculo de adição de forma síncrona (bloqueante)
app.get('/calculo-bloq', (req, res) => {
  const start = Date.now();
  let soma = 0;
  for (let i = 0; i <= 10000000000; i++) {
    soma += i;
  }
  const end = Date.now();
  const tempo = end - start;
  res.send(`Resultado do cálculo bloq: ${soma}. Tempo de execução: ${tempo}ms.`);
});

// Rota que realiza o cálculo em um processo filho (não bloqueante)
app.get('/calculo-nobloq', (req, res) => {
  const childProcess = fork('./calculo.js'); // Arquivo com o código do cálculo

  childProcess.on('message', (message) => {
    const { soma, tempo } = message; // Desestrutura o objeto enviado
    res.send(`Resultado do cálculo nobloq: ${soma}. Tempo de execução: ${tempo}ms.`);
  });

  childProcess.on('error', (err) => {
    return res.status(500).send('Erro ao executar o cálculo.');
  });

  childProcess.on('exit', (code) => {
    if (code !== 0) {
      return res.status(500).send(`Processo filho finalizado com código ${code}.`);
    } 
  });
});

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});