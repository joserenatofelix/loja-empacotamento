// test/packing.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PackingService, PackedOrder } from '../../src/packing/packing.service';
import { OrderDto } from '../../src/packing/dto/input.dto';

describe('PackingService', () => {
  let service: PackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackingService],
    }).compile();

    service = module.get<PackingService>(PackingService);
  });

  it('deve empacotar pedidos simples', async () => {
    const orders: OrderDto[] = [
      {
        orderId: 'o1',
        products: [
          { id: 'a', height: 10, width: 20, length: 30 },
          { id: 'b', height: 5, width: 5, length: 5 },
        ],
      },
    ];

    const res: PackedOrder[] = await service.packOrders(orders);

    // Verifica se o pedido está correto
    expect(res[0].orderId).toBe('o1');

    // Verifica se todos os produtos foram alocados
    const allIds = res[0].boxes.flatMap((b) => b.productIds);
    expect(allIds).toContain('a');
    expect(allIds).toContain('b');

    // Opcional: verifica se não há caixas UNPACKABLE
    const unpackable = res[0].boxes.find((b) => b.boxId === 'UNPACKABLE');
    expect(unpackable).toBeUndefined();
  });
});
