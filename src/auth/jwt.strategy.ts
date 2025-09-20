// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'SUA_CHAVE_SECRETA', // usar variável de ambiente
    });
  }

  /**
   * Valida o payload do JWT
   * @param payload - conteúdo do token
   * @returns objeto que será anexado a req.user
   */
  async validate(payload: any) {
    // Aqui você poderia buscar o usuário no banco se necessário
    return { username: payload.username };
  }
}
