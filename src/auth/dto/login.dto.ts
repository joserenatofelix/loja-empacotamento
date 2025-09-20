// src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin', description: 'Nome de usuário' })
  @IsString()
  username: string;

  @ApiProperty({ example: '1234', description: 'Senha do usuário' })
  @IsString()
  password: string;
}
