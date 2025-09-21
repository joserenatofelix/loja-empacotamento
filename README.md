<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="Downloads" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow on Twitter"/></a>
</p>

# 🛒 Loja Empacotamento - API NestJS

API para empacotar pedidos em caixas disponíveis, com autenticação JWT, testes unitários e suporte a Docker.

---

## ✨ Tecnologias

- [NestJS](https://nestjs.com/)
- Node.js 18
- TypeScript
- Docker
- Jest (testes unitários)
- Swagger (documentação interativa)

---

## 🚀 Endpoints da API

| Endpoint | Método | Protegido | Descrição | Exemplo Request | Exemplo Response |
|----------|--------|-----------|-----------|----------------|----------------|
| `/auth/login` | POST | ✅ | Autentica usuário e retorna JWT | `{ "username": "admin", "password": "1234" }` | `{ "access_token": "TOKEN_JWT_AQUI" }` |
| `/` | GET | ✅ | Retorna mensagem de boas-vindas | Header `Authorization: Bearer <TOKEN>` | `Hello World!` |

---

## 🔑 Autenticação JWT

1. Acesse Swagger: `http://localhost:3000/api`
2. Clique no botão **Authorize**
3. Cole seu `access_token` retornado do `/auth/login`
4. Agora você pode testar rotas protegidas diretamente pelo Swagger

---

## 🖥️ Rodando localmente

### Instalar dependências
```
npm install
```
### Desenvolvimento
```
npm run start:dev
```
### Produção
```
npm run start:prod
```
---
### API: http://localhost:3000
### Swagger: http://localhost:3000/api
---

## 🐳 Docker

- Dockerfile já configurado com build em duas etapas (build + produção).

#### Build da imagem
```
docker build -t loja-empacotamento .
```
### Rodar container
```
docker run -p 3000:3000 -e JWT_SECRET=MINHA_CHAVE_SECRETA loja-empacotamento
```

- A variável de ambiente JWT_SECRET é necessária em produção
- Porta padrão: 3000
---

## 🧪 Testes Unitários
### Executa todos os testes unitários
```
npm run test
```

### Executa testes em modo watch
```
npm run test:watch
```
### Cobertura de testes

```
npm run test:cov
```

- Os testes estão localizados na pasta test/
- Serviço principal testado: PackingService
---

## 📖 Swagger

- Acesse http://localhost:3000/api
- Visualize e teste todos os endpoints
- Use Authorize para rotas protegidas
- Swagger gera exemplos de request e response automaticamente

## 💡 Observações

- Empacotamento e lógica de caixas são gerenciados pelo serviço PackingService
- Testes unitários cobrem funcionalidades de empacotamento
- JWT é obrigatório para acessar rotas protegidas

## 👤 Autor

**Renato Félix**

📄 Licença

- MIT License
  
<img width="988" height="907" alt="image" src="https://github.com/user-attachments/assets/62671f71-ba19-413c-beac-ae8a9fd1851e" />
