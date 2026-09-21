import { useOrder } from "@/contexts";
import { OrderItemCard } from "./OrderItemCard.component";
import OrderTotals from "./OrderTotals";

export function OrderSummary() {
  const { items } = useOrder();

  return (
    <div>
      <div className="space-y-2 border-b border-neutral-200 pb-4">
        {items.map((item) => (
          <OrderItemCard key={item.product.id} item={item} />
        ))}
      </div>
      <OrderTotals />
    </div>
  );
}
