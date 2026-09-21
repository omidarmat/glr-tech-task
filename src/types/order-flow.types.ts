import type { Product } from "./products.types";

export enum OrderFlowStep {
  CustomerSelection = "customer-selection",
  ProductSelection = "product-selection",
  OrderSummary = "order-summary",
}
export interface OrderItem {
  product: Product;
  quantity: number;
}
