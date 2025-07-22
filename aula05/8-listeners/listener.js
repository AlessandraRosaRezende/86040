// será executado imediatamente antes de sair do processo
process.on('exit', (code) => {
  console.log('Este processo será executado imediatamente antes da saída do processo Node.js')
})

// captura as exceções não tratadas
process.on('uncaughtException', exception => {
  console.log('Este processo será executado imediatamente quando ocorrer uma exceção não tratada.', exception)
})

process.on('message', message => {
  console.log('Este processo será executado imediatamente após receber a mensagem de outro processo', message)
})

console.log('hello world');

// essa função não existe, logo teremos uma exceção não tratado
console();