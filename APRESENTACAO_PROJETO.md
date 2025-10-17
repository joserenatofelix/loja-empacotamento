## Documento de Apresentação: API Loja Empacotamento

### 1. Do que se trata o projeto?

**Conceito Principal:**

Este projeto é uma API robusta, construída com NestJS, que resolve um problema de logística do mundo real: a otimização do empacotamento de pedidos.

O sistema recebe uma lista de pedidos, cada um contendo múltiplos produtos com dimensões variadas. O "coração" da aplicação é um serviço inteligente (`PackingService`) que calcula a melhor forma de distribuir esses produtos em um conjunto de caixas pré-definidas, com o objetivo de minimizar o desperdício de espaço e o número de caixas utilizadas.

**Fluxo de Funcionamento:**

1.  Um cliente (seja um frontend, um app mobile ou outro serviço) se autentica na API para obter um token de acesso.
2.  Com o token, o cliente envia uma requisição `POST` para o endpoint `/packing`.
3.  O corpo dessa requisição contém um ou mais pedidos, cada um com uma lista de produtos e suas dimensões (altura, largura, comprimento).
4.  A API valida os dados recebidos e processa cada pedido, passando-o para o `PackingService`.
5.  O serviço executa o algoritmo de empacotamento e retorna uma resposta estruturada, mostrando, para cada pedido, quais caixas foram usadas e quais produtos foram colocados em cada uma.
6.  Caso um produto seja grande demais para qualquer uma das caixas disponíveis, ele é retornado em uma caixa virtual especial chamada `UNPACKABLE`, garantindo que nenhum item seja esquecido.

### 2. Como o projeto foi gerado e estruturado?

O projeto foi iniciado utilizando o **NestJS CLI**, a ferramenta de linha de comando oficial do framework. Essa abordagem garante desde o início uma arquitetura de projeto sólida, modular e escalável, seguindo as melhores práticas do mercado.

Ao usar o `nest new loja-empacotamento`, a estrutura inicial já foi criada com:
*   **Arquitetura Modular:** O NestJS organiza o código em Módulos, Controladores e Serviços. Isso fica evidente na estrutura de pastas como `src/packing`, que encapsula toda a lógica de empacotamento.
*   **TypeScript Pré-configurado:** O projeto já nasce com suporte total a TypeScript, o que garante um código mais seguro, legível e com menos bugs em tempo de execução.
*   **Ambiente de Testes:** A estrutura para testes unitários com **Jest** é criada automaticamente, incentivando a escrita de testes desde o começo, como pode ser visto no arquivo `test/packing.service.spec.ts`.
*   **Linting e Formatação:** Ferramentas como ESLint e Prettier (configuradas no `package.json` e `.prettierrc`) foram integradas para manter um padrão de código consistente e limpo em todo o projeto.

### 3. Tecnologias Aplicadas e Justificativas

A escolha das tecnologias foi pensada para criar uma aplicação moderna, segura e fácil de manter.

*   **Framework: NestJS**
    *   **Por quê?** É um framework Node.js progressivo que utiliza TypeScript por padrão e se baseia em uma arquitetura modular inspirada no Angular. Isso o torna ideal para construir APIs eficientes, confiáveis e escaláveis, perfeitas para o ambiente corporativo.

*   **Linguagem: TypeScript**
    *   **Por quê?** Adiciona tipagem estática ao JavaScript. Isso reduz drasticamente erros comuns, melhora o autocompletar no editor de código e torna a aplicação mais robusta e fácil de dar manutenção, especialmente em equipes.

*   **Containerização: Docker & Docker Compose**
    *   **Por quê?** Para garantir que o ambiente de desenvolvimento e produção seja idêntico, eliminando o clássico problema de "funciona na minha máquina". O `Dockerfile` cria uma imagem otimizada da aplicação, e o `docker-compose.yml` orquestra a subida do container de forma simples com um único comando (`docker-compose up -d`), como documentado no README.

*   **Autenticação: JWT (JSON Web Tokens) com Passport.js**
    *   **Por quê?** Para proteger os endpoints da API. O fluxo é padrão e seguro: o usuário faz login, recebe um `access_token` assinado e o envia no cabeçalho de cada requisição subsequente. O NestJS, com o módulo `@nestjs/passport`, integra-se perfeitamente para validar esses tokens através de *Guards* e *Strategies*.

*   **Validação de Dados: `class-validator` e `class-transformer`**
    *   **Por quê?** Para garantir a integridade dos dados que chegam na API. Ao invés de criar lógicas de validação manuais dentro dos controllers, usamos *Decorators* diretamente nos DTOs (Data Transfer Objects), como o `PackingRequestDto`. O NestJS utiliza um `ValidationPipe` global para validar automaticamente todas as requisições recebidas, retornando erros claros se os dados não estiverem no formato esperado.

*   **Documentação da API: Swagger (OpenAPI)**
    *   **Por quê?** Para gerar uma documentação interativa da API de forma automática a partir do código (dos DTOs e controllers). Acessível em `/api`, ela permite que qualquer consumidor da API (como uma equipe de frontend) visualize, entenda e teste todos os endpoints diretamente pelo navegador, acelerando o desenvolvimento.

*   **Testes: Jest**
    *   **Por quê?** É o framework de testes padrão para projetos NestJS. Ele foi usado para criar testes unitários para a lógica de negócio principal, o `PackingService`. O arquivo `packing.service.spec.ts` demonstra como a funcionalidade de empacotamento é testada em diferentes cenários, garantindo que o algoritmo se comporte como esperado.

### 4. Roteiro de Testes e Demonstração (Como apresentar ao examinador)

Este roteiro foi pensado para você demonstrar o projeto de forma clara, profissional e destacando os pontos fortes.

**Passo 1: Iniciando a Aplicação com Docker (Mostrando profissionalismo)**

*   **Ação:** No terminal, na raiz do projeto, execute o comando:
    ```bash
    docker-compose up -d
    ```
*   **Explicação:** "Para garantir que a aplicação rode de forma consistente em qualquer ambiente e para simplificar o setup, eu utilizei Docker e Docker Compose. Este comando sobe o container da aplicação em background, já com as variáveis de ambiente e portas configuradas, pronta para uso."

**Passo 2: Explorando a Documentação com Swagger (Mostrando boas práticas)**

*   **Ação:** Abra o navegador no endereço **http://localhost:3000/api**.
*   **Explicação:** "A documentação da API foi gerada automaticamente com Swagger. Isso é uma prática essencial em projetos modernos, pois permite que outros desenvolvedores ou equipes de frontend entendam e testem a API de forma interativa, sem precisar olhar o código-fonte."

**Passo 3: Demonstrando a Segurança com JWT (Mostrando conhecimento em autenticação)**

1.  **Acesso Negado:**
    *   **Ação:** No Swagger, vá até o endpoint `POST /packing`, clique em `Try it out` e depois em `Execute`.
    *   **Resultado:** Mostre o erro `401 Unauthorized`.
    *   **Explicação:** "Como pode ver, os endpoints principais são protegidos. A API corretamente nega o acesso a usuários não autenticados, como esperado."

2.  **Obtendo o Token:**
    *   **Ação:** Vá para o endpoint `POST /auth/login`, clique em `Try it out` e `Execute`. Copie o `access_token` da resposta.
    *   **Explicação:** "Aqui realizamos a autenticação. O usuário envia suas credenciais e o `AuthService` retorna um token JWT. Para este teste, usei um usuário fixo no código, mas a estrutura está pronta para validar contra um banco de dados com senhas criptografadas."

3.  **Autorizando e Acessando a Rota:**
    *   **Ação:** Clique no botão `Authorize` no topo da página, cole o token (com o prefixo `Bearer `) e autorize. Agora, volte ao endpoint `POST /packing` e execute-o novamente.
    *   **Resultado:** Mostre a resposta `200 OK` com o plano de empacotamento.
    *   **Explicação:** "Agora, com o token JWT válido no cabeçalho da requisição, o `JwtAuthGuard` do NestJS permitiu o acesso e o `PackingController` pôde processar o pedido."

**Passo 4: Testando a Lógica de Negócio e os Testes Unitários (Mostrando a qualidade do código)**

1.  **Demonstrando o Empacotamento:**
    *   **Ação:** Ainda no endpoint `POST /packing` do Swagger, mostre o corpo da requisição de exemplo e a resposta bem-sucedida.
    *   **Explicação:** "Este é o núcleo da aplicação. O `PackingController` recebe os dados, que são validados pelo DTO, e chama o `PackingService`. A resposta mostra o plano de empacotamento: cada pedido com suas caixas e os produtos dentro delas."

2.  **Mostrando os Testes Unitários:**
    *   **Ação:** Abra o arquivo `test/packing.service.spec.ts` no seu editor de código e execute `npm run test` no terminal.
    *   **Explicação (Conceito):** "Para garantir a qualidade e a corretude da lógica de negócio, eu escrevi testes unitários. Um teste unitário é como testar um ingrediente de uma receita de bolo isoladamente. Em vez de fazer o bolo inteiro para ver se o fermento funciona, nós testamos apenas o fermento em uma pequena reação para garantir que ele está bom. Aqui, cada teste verifica uma pequena parte do sistema, o `PackingService`, para garantir que ele se comporta exatamente como o esperado em diferentes situações."

3.  **Exemplo de Teste Detalhado (para leigos):**
    *   **Ação:** Mostre o primeiro teste, `deve empacotar pedidos simples`, no arquivo `test/packing.service.spec.ts`.
    *   **Explicação Detalhada:** "Vamos analisar este teste como exemplo. Ele se divide em três partes: **Preparação**, **Execução** e **Verificação**."

        *   "**1. Preparação (O que vamos testar?):**"
            ```typescript
            const orders = [
              {
                orderId: 'o1',
                products: [
                  { id: 'a', height: 10, width: 20, length: 30 },
                  { id: 'b', height: 5, width: 5, length: 5 },
                ],
              },
            ];
            ```
            "Aqui, estamos criando um pedido de teste (`o1`) com dois produtos (`a` e `b`) de tamanhos diferentes. Este é o 'ingrediente' que vamos fornecer à nossa função."

        *   "**2. Execução (A ação que estamos testando):**"
            ```typescript
            const res = await service.packOrders(orders);
            ```
            "Nesta linha, nós pegamos o pedido de teste e o enviamos para o nosso serviço de empacotamento, o `packOrders`. A resposta (o resultado do empacotamento) é armazenada na variável `res`."

        *   "**3. Verificação (O resultado foi o esperado?):**"
            ```typescript
            expect(res[0].orderId).toBe('o1');
            const allIds = res[0].boxes.flatMap((b) => b.productIds);
            expect(allIds).toContain('a');
            expect(allIds).toContain('b');
            ```
            "Esta é a parte mais importante. Aqui nós verificamos se o serviço fez o que deveria. A palavra `expect` significa 'esperar que'. Então, estamos dizendo: 'Eu espero que o ID do pedido na resposta seja `o1`' e 'Eu espero que a lista de produtos empacotados contenha os produtos `a` e `b`'. Se todas essas expectativas forem atendidas, o teste passa com sucesso, como vemos no terminal. Isso nos dá a confiança de que a funcionalidade principal está funcionando perfeitamente."

    *   **Ação (Opcional):** Execute o comando `npm run test` no terminal para mostrar os testes passando.
    *   **Explicação (Conclusão):** "Como podemos ver, todos os testes passaram. Isso significa que as regras de negócio que implementei para diferentes cenários (empacotamento simples, produtos que não cabem, múltiplos pedidos) estão corretas e a aplicação é confiável."