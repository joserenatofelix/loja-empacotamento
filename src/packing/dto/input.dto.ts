// src/dto/packing-request.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductDto } from './product.dto';

export class OrderDto {
  @ApiProperty({
    example: 'pedido-1',
    description: 'Identificador único do pedido',
  })
  @IsString()
  orderId: string;

  @ApiProperty({
    type: [ProductDto],
    description: 'Lista de produtos do pedido',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}

export class PackingRequestDto {
  @ApiProperty({
    type: [OrderDto],
    description: 'Lista de pedidos para o empacotamento',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  orders: OrderDto[];
}
