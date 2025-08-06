# ⚠️ Desvantagens da autenticação por **sessão (session)**

Mesmo sendo uma abordagem robusta e popular, a autenticação baseada em sessão tem algumas limitações importantes:

---

## 1. Escalabilidade e estado no servidor

- Cada sessão exige **armazenamento no servidor** (em memória, Redis, banco, etc.).
- Em ambientes distribuídos ou com balanceamento, é preciso **compartilhar sessões**, o que complica a infraestrutura.  
- Isso pode se tornar um gargalo à medida que o número de usuários cresce.  

---

## 2. Sobrecarga de consultas ao servidor

- Cada requisição requer uma **consulta para validar a sessão**, gerando impacto de performance.  

---

## 3. Vinculação rígida a uma arquitetura stateful

- Não é indicado para arquiteturas sem estado, como microserviços ou sistemas serverless.
- Requer maior cuidado com balanceamento e sincronização de sessões entre servidores.  

---

## 4. Fragmentação entre domínios/CORS

- Cookies de sessão funcionam **normalmente apenas no mesmo domínio**.
- Cenários multi domínio ou SPAs com APIs separadas exigem configuração cuidadosa (CORS, SameSite, etc.).  

---

## 5. Potenciais vulnerabilidades como session hijacking ou session poisoning

- Sessões podem ser roubadas via **XSS, sniffing ou session fixation** se os cookies não estiverem corretamente configurados (`HttpOnly`, `Secure`, `SameSite`).  
- Também há o risco de **session poisoning**, especialmente em ambientes compartilhados sem isolamento adequado.  

---

## ✅ Quando usar sessão?

Embora haja desafios, a autenticação por sessão ainda é uma boa escolha quando:

- Você precisa de **controle imediato de logout** (revogação instantânea).
- É uma aplicação tradicional com renderização no servidor, sem múltiplos domínios ou microserviços.
- Prefere simplicidade e suporte nativo de frameworks para gerenciamento de sessão.  

---

## 🧠 Comparativo rápido com JWT

| Aspecto                 | Sessão (Session)                          | JWT                                             |
|-------------------------|--------------------------------------------|------------------------------------------------|
| Estado no Servidor      | ✔️ Stateful                                | ❌ Stateless                                   |
| Escalabilidade          | Limitada pela sincronização de sessões     | Alta, nenhum armazenamento no servidor         |
| Revogação imediata      | Sim — basta deletar a sessão               | Complexo — requer blacklist ou expiração curta |
| Sobrecarga de servidor  | Alta — verifica sessão em cada requisição  | Baixa — validação local via token              |
| Ataques de hijacking    | Risco se cookies estiverem mal configurados| Risco se o token for exposto                    |
| Uso multi-domínio       | Complicado com cookies                     | Mais flexível                                   |
| Gerenciamento simples   | Suporte robusto em frameworks              | Requer infraestrutura de tokens e refresh      |

---

Em resumo: **sessões são seguras e simples**, mas **não escalam facilmente** e trazem sobrecarga de estado. Arquiteturas modernas geralmente preferem JWTs por serem **stateless, escaláveis e independentes de servidor**, embora exijam precauções especiais para lidar com revogação de tokens e segurança.
