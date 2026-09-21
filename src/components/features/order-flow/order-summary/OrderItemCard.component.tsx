import type { OrderItem } from "@/types/order-flow.types";
import DataRow from "./DataRow";

export function OrderItemCard({ item }: { item: OrderItem }) {
  const price = Number(item.product.price.slice(1));

  return (
    <div className="bg-neutral-100 rounded-lg p-4">
      <div className="flex flex-col items-start mb-4">
        <p className="text-xl font-bold">{item.product.name}</p>
        <span className="text-sm font-bold px-2 bg-neutral-200 rounded-full">
          {item.product.code}
        </span>
      </div>
      <DataRow label="Unit price" value={item.product.price} />
      <DataRow label="Quantity" value={item.quantity.toString()} />
      <DataRow label="Total price" value={`T${price * item.quantity}`} />
    </div>
  );
}
