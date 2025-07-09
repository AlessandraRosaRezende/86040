# 🛡️ Por que usamos **hash** e não **criptografia** em senhas?

## 1. Hash é irreversível — criptografia não

- **Criptografia** transforma dados para que possam ser revertidos com uma chave, caso seja necessário recuperar a informação.
- **Hash** é uma função de mão única: **não é possível reverter o hash para obter a senha original**. Mesmo com o algoritmo conhecido, isso não significa que seja possível recuperar os dados.

---

## 2. Não precisamos da senha original para verificar login

Armazenamos apenas o hash da senha. Quando o usuário faz login, **calculamos o hash da senha enviada** e comparamos com o hash armazenado:
- Se forem iguais, o acesso é concedido.
- Não há necessidade de descriptografar nada.

---

## 3. Hashes de senha são deliberadamente lentos

Algoritmos como **bcrypt**, **Argon2** e **scrypt** são criados para serem computacionalmente pesados, dificultando ataques por força bruta ou dicionários:
- Esse processo é chamado de **key stretching**.
- Hashes rápidos como MD5 ou SHA‑1 são vulneráveis a ataques modernos. 
---

## 4. Sem chave de descriptografia = menor risco

Com criptografia reversível, **é preciso armazenar uma chave de decodificação** no sistema:
- Se essa chave vazar, o invasor pode recuperar todas as senhas.
- Com hashes, **não existe chave**, o que reduz o vetor de ataque.

---

## 5. Comunidade técnica confirma: hashing é o padrão

Discussões como em fóruns especializados reforçam o consenso:
> “Hashing é mais seguro que criptografia. O dono do sistema não consegue recuperar o hash tão facilmente quanto qualquer outra pessoa.”  
> “Um hash não pode ser revertido. Se fosse, não seria hash.” 

---

## ✅ Comparativo rápido

| Critério                  | **Hash (senhas)**                   | **Criptografia**                             |
|--------------------------|--------------------------------------|----------------------------------------------|
| Reversibilidade           | ❌ Irreversível                      | ✅ Reversível com chave                       |
| Exposição de senha        | 🛡️ Sem risco mesmo se vazado        | 📦 Senha pode ser recuperada com chave        |
| Verificação (login)       | ✅ Apenas comparações de hash        | ❌ Requer descriptografia                      |
| Robustez contra ataque    | Alta (hash lento + salt)            | Baixa se chave vazada                         |

---

## 📌 Extras: salt e proteção contra rainbow tables

- **Salt**: valor aleatório gerado por usuário que previne ataques em massa usando rainbow tables. Mesmo senhas iguais geram hashes diferentes.
- Combinar salt com hashing seguro é padrão em segurança moderna. 

---

