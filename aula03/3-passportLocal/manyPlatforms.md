# 🔗 Relacionando usuários de diferentes plataformas sem duplicar contas

Quando um usuário pode se autenticar por várias plataformas (ex: email/senha, Google, Facebook), é importante garantir que **não sejam criadas contas duplicadas para o mesmo usuário**. A abordagem ideal é o **account linking** (vinculação de contas).

---

## 1. O que é Account Linking

- É o processo de **conectar diferentes identidades de login a um único perfil de usuário interno**.
- Permite que o usuário faça login por qualquer provedor (Google, Facebook, senha), mas seja reconhecido como o mesmo usuário.

---

## 2. Como isso funciona na prática

- Cada provedor externo oferece um **ID único** (ex.: `googleId`, `facebookId`, etc.).
- Ao autenticar:
  1. Primeiro busca no banco de dados por esse `providerId`.
  2. Se encontrado → faz login direto na conta existente.
  3. Se não encontrado → busca pelo **email**.
     - Se o email existir e estiver **verificado**, vincula o novo `providerId` à conta existente.
     - Caso contrário, cria uma nova conta.

Essa lógica evita duplicação ao identificar corretamente o usuário, mesmo usando plataformas diferentes. 

---

## 3. Mecanismos de vínculo (link)

- **Vinculação automática por email**:
  - Exige que o email seja verificado tanto no provedor externo quanto na sua aplicação.
  - Ferramentas como o Clerk fazem a vinculação automática quando identificam email igual em ambos os sistemas. 

- **Vinculação manual (opt-in pelo usuário)**:
  - Após login com um novo provedor, se o email já estiver registrado, o usuário pode autorizar a vinculação.
  - Requer reautenticação (ex.: confirmar senha) para maior segurança. 

---

## 4. Benefícios da vinculação de contas

- 🛡️ **Segurança reforçada**: evita fraudes e duplicatas não intencionais causadas por tokens diferentes.
- 👤 **Experiência unificada**: o usuário mantém o mesmo perfil independentemente do provedor de login.
- 📊 **Gestão de dados centralizada**: facilita o controle de histórico, preferências e acessos por um único usuário.

---

## 5. Riscos e cuidados

- **Confiança em e-mails externos não verificados** pode gerar conexões erradas → sempre valide antes de vincular.  
- **Vulnerabilidades NoAuth** ocorrem quando não se verifica corretamente os *claims* (dados enviados pelo provedor), permitindo vincular identidades falsas. 

---

## 6. Estrutura sugerida de dados

Um modelo de usuário que suporta múltiplos provedores pode ter campos como:

| Campo         | Descrição                            |
|---------------|--------------------------------------|
| `email`       | e-mail principal do usuário          |
| `passwordHash`| hash da senha (login tradicional)    |
| `googleId?`   | ID do usuário no Google              |
| `facebookId?` | ID do usuário no Facebook            |
| `emailVerified` | flag indicando email verificado    |

---

### ✅ Resumo

**Para relacionar contas de login de plataformas diferentes sem duplicação:**

1. Use o **ID único do provedor (providerId)** para busca primária.
2. Se não houver correspondência por providerId, busque pelo **email verificado**.
3. Vincule contas (automaticamente ou via consentimento do usuário).
4. Nunca crie múltiplos perfis para o mesmo usuário com base em métodos diferentes.

Com essa abordagem, você garante segurança, consistência e evita dor de cabeça com duplicidade de dados no futuro!
