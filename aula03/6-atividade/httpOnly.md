# 🧠 Por que o cookie com `HttpOnly` ainda aparece no DevTools, mas não no `document.cookie`?

Mesmo após configurar o cookie como `HttpOnly`, ele ainda aparece na aba **Application → Cookies** do DevTools, mas não pode ser acessado por JavaScript com `document.cookie`. Isso é completamente **esperado e normal**.

---

## 🔍 Como funciona o `HttpOnly`

- O atributo `HttpOnly` impede **apenas** que o cookie seja acessado por scripts do lado do cliente (ex.: via `document.cookie`) :contentReference[oaicite:1]{index=1}.
- O navegador ainda o armazena e **exibe na interface de ferramentas do desenvolvedor**, pois a aba **Application > Cookies** é uma visão interna do navegador e não depende do JavaScript.

---

## 📦 Resumo comparativo

| Visão                         | Com `HttpOnly` | Explicação |
|------------------------------|----------------|------------|
| `document.cookie`            | ❌ Não visível | JavaScript não tem acesso ao cookie |
| DevTools → Application tab   | ✅ Visível     | Ferramentas mostram todos os cookies, mesmo `HttpOnly`|
| Envio automático em requisições | ✅ Funciona  | Navegador inclui o cookie nos headers nas requisições HTTP |

---

## 📌 Por que isso é importante?

- `HttpOnly` é uma medida de segurança contra **XSS**, impedindo scripts injetados de roubar tokens de sessão.
- Mesmo que o cookie seja visível no DevTools, **um atacante que consiga rodar JavaScript não conseguirá lê-lo nem transmiti-lo a terceiros** 

---

## ✅ Em resumo

- A visibilidade do cookie na aba **Application** não indica comprometimento de segurança.
- O que importa é que o cookie **não está acessível por JavaScript**, protegendo-o contra exfiltração
- Você ainda pode usar o cookie para autenticação segura, pois ele é enviado automaticamente nas requisições HTTP.
