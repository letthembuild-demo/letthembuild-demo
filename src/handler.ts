export interface Order {
  id: string;
  quantity: number;
  unitPriceCents: number;
}

/** The total of an order, in cents. */
export function orderTotal(order: Order): number {
  return order.quantity * order.unitPriceCents;
}

/** Handles POST /orders: parses the body and answers with the order's total. */
export function handleCreateOrder(body: string): { status: number; json: unknown } {
  const order = JSON.parse(body) as Order;
  return { status: 201, json: { id: order.id, totalCents: orderTotal(order) } };
}
