# Entendendo Middleware no Express.js

Middleware, em um contexto de desenvolvimento web com Express.js, é como uma **função intermediária** que tem acesso aos objetos de requisição (`req`), resposta (`res`) e à próxima função middleware no ciclo de requisição-resposta de um aplicativo. Pense neles como uma série de "filtros" ou "etapas" que uma requisição HTTP passa antes de chegar à sua rota final.

---

## O que um Middleware Faz?

Basicamente, um middleware pode:

* **Executar qualquer código:** Desde validações simples até operações complexas.
* **Fazer alterações nos objetos de requisição e resposta:** Adicionar novas propriedades, modificar dados existentes, etc.
* **Finalizar o ciclo de requisição-resposta:** Enviando uma resposta ao cliente (ex: `res.send()`).
* **Chamar a próxima função middleware na pilha:** Usando o terceiro argumento, `next()`. Se um middleware não chama `next()`, ou não envia uma resposta, o ciclo fica "travado".

**Exemplo Prático:**

Imagine que você quer registrar toda requisição que chega ao seu servidor:

```javascript
app.use((req, res, next) => {
    console.log(`Requisição recebida: ${req.method} ${req.url}`);
    next(); // Chama a próxima função middleware ou a rota final
});

app.get('/usuarios', (req, res) => {
    res.send('Lista de usuários');
});
```

Neste exemplo, antes de qualquer requisição chegar à rota `/usuarios`, nosso middleware de log será executado, exibindo a URL e o método da requisição no console. O `next()` é crucial para que a requisição continue seu fluxo.

# Tipos de Middleware no Express.js

O Express.js oferece diversos tipos de middleware, cada um com uma finalidade específica. Abaixo, detalho os principais tipos:

## 1. Middleware de Nível de Aplicativo

Este tipo de middleware é aplicado a todas as rotas ou a um grupo específico, utilizando `app.use()` ou `app.METHOD()`.

**Exemplo:**

```javascript
const express = require('express');
const app = express();

// Middleware de nível de aplicativo que será executado para TODAS as requisições
app.use((req, res, next) => {
    console.log('Tempo:', Date.now());
    next();
});

app.get('/', (req, res) => {
    res.send('Olá Mundo!');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
```

## 2. Middleware de Nível de Roteador

Funciona de forma similar ao middleware de nível de aplicativo, mas está vinculado a uma instância específica de express.Router(). Isso é útil para modularizar seu código.

**Exemplo:**

```javascript
const express = require('express');
const router = express.Router();
const app = express();

// Middleware específico para este roteador
router.use((req, res, next) => {
    console.log('Middleware do roteador para:', req.originalUrl);
    next();
});

router.get('/produtos', (req, res) => {
    res.send('Página de produtos');
});

app.use('/api', router); // O middleware do roteador só será aplicado para rotas que começam com '/api'

app.listen(3000);
```

## 3. Middleware de Tratamento de Erros

São funções middleware que possuem quatro argumentos: `(err, req, res, next)`. O Express os reconhece como gerenciadores de erros e os executa quando um erro é passado para `next()`.

**Exemplo:**

```javascript
app.get('/erro', (req, res, next) => {
    // Simula um erro
    const erro = new Error('Algo deu errado na rota!');
    erro.status = 500;
    next(erro); // Passa o erro para o próximo middleware de tratamento de erros
});

// Middleware de tratamento de erros (deve ser o último middleware carregado)
app.use((err, req, res, next) => {
    console.error(err.stack); // Imprime o stack do erro no console do servidor
    res.status(err.status || 500).send('Erro interno do servidor!');
});
```

## 4. Middleware Integrado do Express

O Express oferece middlewares integrados para facilitar tarefas comuns em aplicações web:

- `express.static`: Serve arquivos estáticos como CSS, JavaScript e imagens.
- `express.json`: Faz o parse de requisições com payloads JSON.
- `express.urlencoded`: Faz o parse de requisições com payloads URL-encoded.

**Exemplo:**

```javascript
const express = require('express');
const app = express();

app.use(express.json()); // Habilita o parsing de JSON no corpo da requisição

app.post('/dados', (req, res) => {
    console.log(req.body); // req.body agora contém os dados JSON enviados pelo cliente
    res.send('Dados recebidos!');
});

app.use(express.static('public')); // Serve arquivos da pasta 'public'
```

## 5. Middleware de Terceiros

São bibliotecas externas que fornecem funcionalidades middleware pré-prontas. Alguns exemplos populares são:

- `morgan`: Para log de requisições HTTP.
- `cors`: Para habilitar o Cross-Origin Resource Sharing.
- `helmet`: Para adicionar cabeçalhos HTTP que aumentam a segurança da aplicação.

**Exemplo (com morgan):**

```javascript
const express = require('express');
const morgan = require('morgan'); // npm install morgan
const app = express();

app.use(morgan('dev')); // 'dev' é um formato de log predefinido

app.get('/', (req, res) => {
    res.send('Verifique o console para o log da requisição!');
});
```

---
## O Fluxo dos Middlewares

O fluxo de um **middleware** é **sequencial** e baseado na ordem em que eles são definidos.

1.  **Requisição chega**: O servidor Express recebe uma requisição HTTP.
2.  **Primeiro Middleware**: O Express executa o primeiro middleware que corresponde à rota da requisição.
3.  **`next()` ou Resposta**:
    * Se o middleware chamar **`next()`**, a requisição passa para o próximo middleware na pilha.
    * Se o middleware enviar uma **resposta** (`res.send()`, `res.json()`, etc.), o ciclo de requisição-resposta é finalizado, e nenhum outro middleware ou rota será executado para essa requisição.
    * Se o middleware chamar **`next(erro)`**, o controle é passado para o próximo middleware de tratamento de erros.
4.  **Repetição**: Esse processo se repete para cada middleware até que:
    * Uma resposta seja enviada.
    * Todos os middlewares na pilha tenham sido executados e a requisição chegue à sua rota final (se houver).
    * Um erro seja capturado por um middleware de tratamento de erros.

**Diagrama Simplificado:**

```mermaid
  A[Requisição HTTP] --> B[Middleware 1 (Ex: Log)]
  B --> C[Middleware 2 (Ex: Autenticação)]
  C --> D[Middleware 3 (Ex: Parser JSON)]
  D --> E[Rota Final (Ex: app.get('/dados'))]
  E --> F[Resposta HTTP]
```

Entender o conceito de middleware é fundamental para construir aplicações Express.js robustas, organizadas e escaláveis, pois ele permite modularizar funcionalidades e aplicar lógica de forma eficaz em diferentes etapas do ciclo de vida de uma requisição.