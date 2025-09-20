// src/app.controller.ts
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Indica ao Swagger que esta rota requer Bearer token
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Retorna mensagem de boas-vindas (rota protegida)' })
  getHello(@Request() req): string {
    console.log(req.user); // { username: 'admin' }
    return this.appService.getHello();
  }
}
