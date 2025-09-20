// src/dto/packing-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class BoxOutput {
  @ApiProperty({
    example: 'caixa-1',
    description: 'Identificador único da caixa',
  })
  boxId: string;

  @ApiProperty({
    example: 'Caixa Grande',
    description: 'Nome ou descrição da caixa',
  })
  boxName: string;

  @ApiProperty({
    type: [String],
    example: ['produto-1', 'produto-2'],
    description: 'Lista de IDs de produtos contidos na caixa',
  })
  productIds: string[];
}

export class OrderOutput {
  @ApiProperty({
    example: 'pedido-1',
    description: 'Identificador único do pedido',
  })
  orderId: string;

  @ApiProperty({
    type: [BoxOutput],
    description: 'Lista de caixas empacotadas para este pedido',
  })
  boxes: BoxOutput[];
}

export class PackingResponseDto {
  @ApiProperty({
    type: [OrderOutput],
    description: 'Resultado do empacotamento para cada pedido',
  })
  result: OrderOutput[];
}
