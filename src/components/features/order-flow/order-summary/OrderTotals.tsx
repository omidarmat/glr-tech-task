import { useOrder } from "@/contexts";
import DataRow from "./DataRow";
import { appConfig } from "@/config/app.config";

export default function OrderTotals() {
  const { items } = useOrder();

  const total = items
    .reduce(
      (acc, item) => acc + Number(item.product.price.slice(1)) * item.quantity,
      0,
    )
    .toFixed(2);

  const discountPercent = Number(total) > appConfig.discountThreshold ? 5 : 0;
  const discountAmount = (Number(total) * discountPercent) / 100;

  return (
    <div className="py-4">
      <DataRow label="Total price" value={`T${total}`} />
      {discountAmount > 0 && (
        <DataRow label="Discount" value={`T${discountAmount}`} />
      )}
      {discountAmount > 0 && (
        <DataRow
          label="Total price after discount"
          value={`T${(Number(total) - (Number(total) * discountPercent) / 100).toFixed(2)}`}
        />
      )}
    </div>
  );
}
