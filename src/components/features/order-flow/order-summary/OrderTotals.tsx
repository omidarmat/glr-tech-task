import { appConfig } from "@/config/app.config";
import type { OrderItem } from "@/types/order-flow.types";
import { useMemo } from "react";
import DataRow from "./DataRow";

export default function OrderTotals({ items }: { items: OrderItem[] }) {
  const { total, discountAmount } = useMemo(() => {
    const total = items
      .reduce(
        (acc, item) => acc + Number(item.product.price.slice(1)) * item.quantity,
        0,
      )
      .toFixed(2);

    const discountPercent = Number(total) > appConfig.discountThreshold ? 5 : 0;
    const discountAmount = (Number(total) * discountPercent) / 100;

    return { total, discountAmount };
  }, [items]);

  return (
    <div className="py-4">
      <DataRow label="Total price" value={`T${total}`} />
      {discountAmount > 0 && (
        <DataRow label="Discount" value={`T${discountAmount}`} />
      )}
      {discountAmount > 0 && (
        <DataRow
          label="Total price after discount"
          value={`T${(Number(total) - discountAmount).toFixed(2)}`}
        />
      )}
    </div>
  );
}
