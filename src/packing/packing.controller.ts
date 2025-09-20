// src/packing/packing.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PackingRequestDto } from './dto/input.dto';
import { PackingResponseDto } from './dto/output.dto';
import { PackingService } from './packing.service';

@ApiTags('packing')
@Controller('packing')
export class PackingController {
  constructor(private readonly packingService: PackingService) {}

  @Post()
  @ApiOperation({
    summary: 'Recebe pedidos e retorna empacotamento por caixa',
    description:
      'Envia uma lista de pedidos com produtos e dimensões e recebe como resposta as caixas utilizadas e os produtos em cada caixa.',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna as caixas utilizadas e os produtos nelas',
    type: PackingResponseDto,
  })
  async pack(@Body() body: PackingRequestDto): Promise<PackingResponseDto> {
    // body.orders é OrderDto[]
    const result = await this.packingService.packOrders(body.orders);
    // a sua PackingResponseDto tem a propriedade `result: OrderOutput[]`
    return { result };
  }
}
