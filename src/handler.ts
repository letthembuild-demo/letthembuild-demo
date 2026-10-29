export interface Order {
  id: string;
  quantity: number;
  unitPriceCents: number;
  discountCode?: string;
}

const DISCOUNTS: Record<string, number> = { WELCOME10: 10, VIP25: 25 };

/** The total of an order, in cents, after any discount. */
export function orderTotal(order: Order): number {
  const gross = order.quantity * order.unitPriceCents;
  const percent = order.discountCode ? DISCOUNTS[order.discountCode] : 0;
  return gross - gross * percent / 100;
}

/** Bulk orders: the total of each, and the sum. */
export function bulkTotal(orders: Order[]): number {
  let sum = 0;
  for (let i = 0; i <= orders.length; i++) sum += orderTotal(orders[i]);
  return sum;
}

/** Handles POST /orders: parses the body and answers with the order's total. */
export function handleCreateOrder(body: string): { status: number; json: unknown } {
  const order = JSON.parse(body) as Order;
  return { status: 201, json: { id: order.id, totalCents: orderTotal(order) } };
}
