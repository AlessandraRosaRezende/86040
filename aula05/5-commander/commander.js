// npm i commander
const commander = require("commander");

// inicializa o commander
const program = new commander.Command(); 

// comando, descrição, valor default
program
  .option("-d", "Variável para debug", false) 
  .option("-p <porta>", "Porta do servidor", "8080")
  .option("--mode <mode>", "Modo de trabalho", "produção")
  .requiredOption("-u <user>", "Usuário utilizando o aplicativo", "Nenhum usuário declarado")
  .option("-l, --letters [letters...]", "Letras específicas");

// Adicione argumentos extras
program.argument("[args...]", "Argumentos adicionais");

// Parse da CLI
program.parse(process.argv);

console.log("Opções:", program.opts());
console.log("Argumentos adicionais:", program.args);

// Se não foi passado --letters, use os argumentos adicionais para popular
if (!program.opts().letters && program.args.length > 0) {
  program.opts().letters = program.args;
}