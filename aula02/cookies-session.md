# 🍪 Cookies vs 🧾 Sessions (Sessões)

## O que são **Cookies**?

**Cookies** são **pequenos arquivos de texto** que o navegador do usuário armazena localmente no computador, a pedido de um site. Eles contêm **informações simples**, como:

- Nome de usuário
- Preferências (ex: idioma)
- Itens no carrinho de compras
- Um identificador para reconhecer o usuário

> Eles são enviados de volta ao servidor **automaticamente** a cada requisição feita ao mesmo domínio.

---

## O que são **Sessions** (Sessões)?

**Sessions** são **informações armazenadas no servidor** para acompanhar o usuário enquanto ele navega por um site. Elas permitem, por exemplo:

- Manter o usuário logado
- Armazenar temporariamente dados (como um carrinho de compras)
- Controlar permissões de acesso

O navegador geralmente armazena apenas um **ID de sessão** (via cookie ou outro meio), que é usado pelo servidor para encontrar os dados da sessão correspondente.

---

## ⚖️ Diferença entre Cookies e Sessions

| Característica       | Cookies                             | Sessions (Sessões)                   |
|----------------------|--------------------------------------|--------------------------------------|
| **Onde ficam**       | No **navegador do usuário**         | No **servidor**                     |
| **Tamanho**          | Limitado (geralmente até 4 KB)      | Pode armazenar mais dados           |
| **Segurança**        | Menos seguro (pode ser editado)     | Mais seguro (dados ficam no servidor) |
| **Duração**          | Pode ser persistente (com validade) | Dura até o navegador ser fechado ou expirar |
| **Uso comum**        | Lembrar preferências, rastreamento  | Autenticação, dados temporários     |

---

## 🧠 Exemplo Didático

Imagine que você vai a uma lanchonete:

- **Cookie**: é como se você recebesse um cartão com suas preferências anotadas (ex: "gosta de suco de laranja"). Você leva isso consigo e mostra toda vez que volta à lanchonete.
- **Session**: é como se a lanchonete anotasse seus dados num sistema interno. Quando você mostra seu número de cliente, eles consultam tudo sobre você lá dentro.

---

# 🍪 O que é `cookie-parser` no Express

## 📘 Conceito

`cookie-parser` é um **middleware** do Express que permite **ler e interpretar cookies** enviados pelo navegador nas requisições HTTP.

Sem ele, o Express **não consegue acessar os cookies automaticamente**. Com ele, os cookies são disponibilizados de forma simples via `req.cookies`.

---

## 📦 Instalação

```bash
npm install cookie-parser
```

---

## 🧠 Como funciona?

Imagine que o navegador envie este cabeçalho HTTP:

```
Cookie: username=Maria; theme=dark
```

Com `cookie-parser`, você pode acessar assim no servidor:

```javascript
req.cookies.username  // "Maria"
req.cookies.theme     // "dark"
```

---

## 🧪 Exemplo Básico

```javascript
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// Ativa o middleware para lidar com cookies
app.use(cookieParser());

app.get('/', (req, res) => {
  const nome = req.cookies.nome;
  res.send(`Olá, ${nome || 'visitante'}!`);
});

app.get('/set-cookie', (req, res) => {
  res.cookie('nome', 'Carlos');
  res.send('Cookie definido!');
});
```

---

## ❌ Sem `cookie-parser`

Sem esse middleware, o `req.cookies` será `undefined`. Ou seja, **não é possível acessar os cookies do cliente facilmente**.

---

## 🔐 Cookies Assinados (Opcional)

Você pode também usar cookies **assinados**, para garantir que não foram alterados pelo cliente:

```javascript
app.use(cookieParser('minha_chave_secreta'));

app.get('/set-cookie', (req, res) => {
  res.cookie('nome', 'Carlos', { signed: true });
  res.send('Cookie assinado definido!');
});

app.get('/', (req, res) => {
  const nome = req.signedCookies.nome;
  res.send(`Olá, ${nome || 'desconhecido'}!`);
});
```

### Vantagem: Segurança contra adulterações nos cookies.

---


# 🍪 Cookies e 🧾 Sessions com Node.js + Express

## 📦 Pré-requisitos

Instale os pacotes necessários com:

```bash
npm install express cookie-parser express-session
```

---

## ✅ Exemplo com Cookies

### Código (Node.js + Express + cookie-parser):

```javascript
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
  const username = req.cookies.username;
  if (username) {
    res.send(`Bem-vindo de volta, ${username}!`);
  } else {
    res.send('Olá! Você é novo aqui.');
  }
});

app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'Maria', { maxAge: 24 * 60 * 60 * 1000 }); // 1 dia
  res.send('Cookie foi definido!');
});

app.get('/logout', (req, res) => {
  res.clearCookie('username');
  res.send('Cookie removido. Logout feito!');
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
```

---

## ✅ Exemplo com Sessions

### Código (Node.js + Express + express-session):

```javascript
const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'minha_chave_super_secreta',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // 1 minuto
}));

app.get('/', (req, res) => {
  if (req.session.username) {
    res.send(`Você está logado como ${req.session.username}`);
  } else {
    res.send('Você não está logado.');
  }
});

app.get('/login', (req, res) => {
  req.session.username = 'João';
  res.send('Login feito!');
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logout feito. Sessão encerrada!');
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
```

---

## 🧪 Teste sugerido

1. Acesse `/set-cookie` ou `/login` para iniciar.
2. Acesse `/` para ver a resposta personalizada.
3. Acesse `/logout` para limpar o cookie ou a sessão.

---
