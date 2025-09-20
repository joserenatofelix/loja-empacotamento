// src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validação global dos DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades extras do JSON
      transform: true, // converte tipos automaticamente
      forbidNonWhitelisted: false,
    }),
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Loja do Seu Manoel - Empacotamento')
    .setDescription('API para empacotar pedidos nas caixas disponíveis')
    .setVersion('1.0')
    // ⚡ Adiciona suporte a JWT Bearer
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Insira o token JWT',
        in: 'header',
      },
      'JWT-auth', // nome do esquema, deve bater com @ApiBearerAuth()
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('API rodando em http://localhost:3000');
  console.log('Swagger UI: http://localhost:3000/api');
}
bootstrap();
