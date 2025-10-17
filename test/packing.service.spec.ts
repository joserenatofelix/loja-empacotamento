// test/packing.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PackingService, PackedOrder } from '../src/packing/packing.service';
import { OrderDto } from '../src/packing/dto/packing-request.dto';

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

  it('deve criar caixa UNPACKABLE se produto não couber em nenhuma caixa', async () => {
    const orders: OrderDto[] = [
      {
        orderId: 'o2',
        products: [
          { id: 'c', height: 500, width: 500, length: 500 }, // gigante
        ],
      },
    ];

    const res: PackedOrder[] = await service.packOrders(orders);

    expect(res[0].orderId).toBe('o2');
    expect(res[0].boxes[0].boxId).toBe('UNPACKABLE');
    expect(res[0].boxes[0].productIds).toContain('c');
  });

  it('deve empacotar múltiplos pedidos corretamente', async () => {
    const orders: OrderDto[] = [
      {
        orderId: 'o1',
        products: [{ id: 'a', height: 10, width: 20, length: 30 }],
      },
      {
        orderId: 'o2',
        products: [{ id: 'b', height: 5, width: 5, length: 5 }],
      },
    ];

    const res: PackedOrder[] = await service.packOrders(orders);

    expect(res.length).toBe(2);
    expect(res[0].orderId).toBe('o1');
    expect(res[1].orderId).toBe('o2');
  });
});
