# Stage 1: Build
FROM node:18-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependências
COPY package*.json ./

# Instala dependências de desenvolvimento
RUN npm install

# Copia o restante do código
COPY . .

# Builda o projeto NestJS
RUN npm run build

# Stage 2: Produção
FROM node:18-alpine

WORKDIR /app
ENV NODE_ENV=production
ENV JWT_SECRET=MINHA_CHAVE_SECRETA 
# use variável de ambiente real em produção

# Copia apenas os arquivos de dependência para produção
COPY --from=builder /app/package*.json ./

# Instala apenas dependências de produção
RUN npm install --production

# Copia o código compilado
COPY --from=builder /app/dist ./dist

# Porta da aplicação
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "dist/main.js"]
