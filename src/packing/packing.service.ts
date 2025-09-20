// src/packing/packing.service.ts
import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/input.dto';
import { BOXES } from './boxes.constants';

export type BoxInstance = {
  id: string;
  name: string;
  dims: [number, number, number];
  capacityVolume: number;
  usedVolume: number;
  productIds: string[];
};

export type PackedOrder = {
  orderId: string;
  boxes: {
    boxId: string;
    boxName: string;
    productIds: string[];
  }[];
};

function volumeFromDims([h, w, l]: [number, number, number]) {
  return h * w * l;
}

function canFitSingle(
  productDims: [number, number, number],
  boxDims: [number, number, number],
): boolean {
  const [p1, p2, p3] = productDims;
  const perms = [
    [p1, p2, p3],
    [p1, p3, p2],
    [p2, p1, p3],
    [p2, p3, p1],
    [p3, p1, p2],
    [p3, p2, p1],
  ];
  return perms.some(
    (perm) =>
      perm[0] <= boxDims[0] &&
      perm[1] <= boxDims[1] &&
      perm[2] <= boxDims[2],
  );
}

@Injectable()
export class PackingService {
  async packOrders(orders: OrderDto[]): Promise<PackedOrder[]> {
    const results: PackedOrder[] = [];
    for (const order of orders) {
      const orderResult = this.packSingleOrder(order);
      results.push(orderResult);
    }
    return results;
  }

  private packSingleOrder(order: OrderDto): PackedOrder {
    const products = order.products.map((p) => ({
      id: p.id,
      dims: [p.height, p.width, p.length] as [number, number, number],
      volume: p.height * p.width * p.length,
    }));

    products.sort((a, b) => b.volume - a.volume);

    const boxInstances: BoxInstance[] = [];

    for (const prod of products) {
      const candidateBoxes = BOXES.filter((b) =>
        canFitSingle(prod.dims, b.dims),
      );

      if (candidateBoxes.length === 0) {
        boxInstances.push({
          id: 'UNPACKABLE',
          name: 'UNPACKABLE',
          dims: [0, 0, 0],
          capacityVolume: prod.volume,
          usedVolume: prod.volume,
          productIds: [prod.id],
        });
        continue;
      }

      candidateBoxes.sort(
        (a, b) => volumeFromDims(a.dims) - volumeFromDims(b.dims),
      );

      let placed = false;

      for (const inst of boxInstances) {
        if (inst.id === 'UNPACKABLE') continue;
        if (!canFitSingle(prod.dims, inst.dims)) continue;
        const remaining = inst.capacityVolume - inst.usedVolume;
        if (remaining >= prod.volume) {
          inst.usedVolume += prod.volume;
          inst.productIds.push(prod.id);
          placed = true;
          break;
        }
      }

      if (!placed) {
        const chosen = candidateBoxes[0];
        const inst: BoxInstance = {
          id: chosen.id,
          name: chosen.name,
          dims: chosen.dims as [number, number, number],
          capacityVolume: volumeFromDims(chosen.dims as [number, number, number]),
          usedVolume: prod.volume,
          productIds: [prod.id],
        };
        boxInstances.push(inst);
      }
    }

    const boxesOutput = boxInstances.map((b) => ({
      boxId: b.id,
      boxName: b.name,
      productIds: b.productIds,
    }));

    return {
      orderId: order.orderId,
      boxes: boxesOutput,
    };
  }
}
