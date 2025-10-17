<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="License" /></a>
</p>

# 🛒 Loja Empacotamento - API NestJS

API robusta para otimizar o processo de empacotamento de pedidos. A aplicação recebe uma lista de pedidos com seus respectivos produtos e retorna a distribuição ótima desses produtos em caixas, minimizando o desperdício. O projeto foi construído com **NestJS**, seguindo as melhores práticas de arquitetura e desenvolvimento, incluindo autenticação JWT, validação de dados, documentação interativa com Swagger e containerização com Docker.

---

## ✨ Tecnologias

- **Framework:** [NestJS](https://nestjs.com/) - Um framework Node.js progressivo para construir aplicações eficientes e escaláveis.
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) - Garante um código mais seguro e manutenível.
- **Containerização:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) - Para um ambiente de desenvolvimento e produção consistente e isolado.
- **Autenticação:** [JWT (JSON Web Token)](https://jwt.io/) - Implementado com Passport.js para proteger os endpoints da API.
- **Validação de Dados:** `class-validator` e `class-transformer` - Para garantir a integridade dos dados que entram na API.
- **Documentação da API:** Swagger (OpenAPI) - Geração de documentação interativa e automática a partir do código.
- **Testes:** Jest - Framework de testes para garantir a qualidade e o funcionamento da lógica de negócio.

---

## 🚀 Endpoints da API

| Endpoint      | Método | Protegido | Descrição                                          | Exemplo Request                               | Exemplo Response            |
| ------------- | ------ | --------- | -------------------------------------------------- | --------------------------------------------- | --------------------------- |
| `/auth/login` | POST   | ❌        | Autentica o usuário e retorna um token JWT.        | `{ "username": "admin", "password": "1234" }` | `{ "access_token": "..." }` |
| `/`           | GET    | ✅        | Endpoint de health-check protegido.                | `Authorization: Bearer <TOKEN>`               | `"Hello World!"`            |
| `/packing`    | POST   | ✅        | Recebe pedidos e retorna o plano de empacotamento. | `(ver corpo no Swagger)`                      | `(ver corpo no Swagger)`    |

---

## 🎤 Roteiro para Apresentação e Teste

Siga estes passos para demonstrar o projeto de forma clara e profissional.

### 1. Iniciando a Aplicação com Docker

A forma mais simples e impressionante de iniciar é com Docker Compose.

```bash
# Sobe o container da aplicação em modo detached (-d)
docker-compose up -d
```

> **Ponto para explicar:** "Utilizei Docker Compose para simplificar o setup do ambiente. Isso garante que a aplicação rode da mesma forma em qualquer máquina, seja na minha, na de um colega ou em produção. O `docker-compose.yml` define o serviço, as variáveis de ambiente e o mapeamento de portas."

### 2. Explorando a Documentação Interativa (Swagger)

- Abra o navegador em **http://localhost:3000/api**.

> **Ponto para explicar:** "A documentação da API foi gerada automaticamente com Swagger e NestJS. Isso é extremamente útil para o time que vai consumir a API, pois eles podem ver todos os endpoints, seus parâmetros, schemas de request/response e até testá-los diretamente no navegador."

### 3. Demonstrando a Segurança (Autenticação JWT)

a. **Tentativa de Acesso sem Token:**

- No Swagger, expanda o endpoint `GET /`.
- Clique em `Try it out` e depois em `Execute`.
- **Resultado esperado:** Um erro `401 Unauthorized`.

> **Ponto para explicar:** "Este endpoint, assim como o de empacotamento, é protegido. A API corretamente bloqueia o acesso não autenticado, retornando um status 401, como esperado."

b. **Obtendo o Token de Acesso:**

- Expanda o endpoint `POST /auth/login`.
- Clique em `Try it out`. O corpo da requisição já está preenchido com o usuário de exemplo.
- Clique em `Execute`.
- **Resultado esperado:** Uma resposta `201 Created` com um `access_token`. Copie este token.

> **Ponto para explicar:** "Este é o fluxo de autenticação. O usuário envia suas credenciais e, se forem válidas, o `AuthService` gera um token JWT assinado. Para este projeto, usei um usuário 'hardcoded', mas em um cenário real, a validação seria feita contra um banco de dados com senhas hasheadas usando `bcrypt`, como já está preparado no código."

c. **Autorizando as Requisições:**

- No topo da página do Swagger, clique no botão **Authorize**.
- Na janela que abrir, cole o token no campo `Value` (prefixado com `Bearer ` se necessário, mas o Swagger UI geralmente lida com isso).
- Clique em `Authorize` e depois em `Close`.

d. **Acessando a Rota Protegida:**

- Volte ao endpoint `GET /` e clique em `Execute` novamente.
- **Resultado esperado:** Uma resposta `200 OK` com a mensagem "Hello World!".

> **Ponto para explicar:** "Agora que o token foi enviado no header `Authorization`, o `JwtAuthGuard` e a `JwtStrategy` validaram o token, permitindo o acesso à rota. O payload do token, contendo o username, fica disponível no objeto `request`."

### 4. Testando a Lógica Principal de Negócio (`/packing`)

a. **Executando o Empacotamento:**

- Expanda o endpoint `POST /packing`.
- Clique em `Try it out`. O Swagger já fornece um corpo de requisição de exemplo baseado no `PackingRequestDto`.
- Clique em `Execute`.

b. **Analisando a Resposta:**

- **Resultado esperado:** Uma resposta `200 OK` com a estrutura `PackingResponseDto`.

> **Ponto para explicar:** "Este é o coração da aplicação. O `PackingController` recebe os dados, que são validados automaticamente pelos DTOs com `class-validator`. Em seguida, ele chama o `PackingService`, que contém a lógica de negócio para calcular como os produtos de cada pedido são distribuídos nas caixas. A resposta mostra, para cada pedido, a lista de caixas usadas e quais produtos estão dentro de cada uma."

---

## 🖥️ Comandos Úteis

### Instalação

```bash
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
