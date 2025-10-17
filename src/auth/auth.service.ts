// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Valida usuário
   * @param username
   * @param password
   * @returns usuário válido ou null
   */
  async validateUser(username: string, password: string) {
    // Usuário hardcoded para exemplo
    const hardcodedUser = { username: 'admin', password: '1234' };

    // Comparação simples (em produção, use bcrypt para hash)
    if (
      username === hardcodedUser.username &&
      password === hardcodedUser.password
    ) {
      const { password, ...result } = hardcodedUser; // remove senha
      return result;
    }

    return null;
  }

  /**
   * Gera token JWT
   * @param user usuário validado
   * @returns { access_token }
   */
  async login(user: any) {
    if (!user) {
      throw new UnauthorizedException('Usuário inválido');
    }

    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
