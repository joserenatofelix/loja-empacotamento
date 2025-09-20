// src/dto/product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @ApiProperty({
    example: 'produto-123',
    description: 'Identificador único do produto',
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 10,
    description: 'Altura do produto em centímetros',
  })
  @IsNumber()
  height: number;

  @ApiProperty({
    example: 20,
    description: 'Largura do produto em centímetros',
  })
  @IsNumber()
  width: number;

  @ApiProperty({
    example: 5,
    description: 'Comprimento do produto em centímetros',
  })
  @IsNumber()
  length: number;
}
