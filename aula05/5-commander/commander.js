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

if (!program.opts().user) {
  program.error('Erro - passe o usuário')
}

// node commander.js -d -p 3000 --mode development -u root --letters a b c
// node commander.js -p 3000 -u root    
// node commander.js -p 3000 -u root 1 2 3
// node commander.js -p 3000 -u root 1 2 3 --letters a b c