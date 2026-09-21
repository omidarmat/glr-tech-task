import { useOrder } from "@/contexts";
import type { Product } from "@/types/products.types";
import {
  CreditCardOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

export default function ProductCard({ product }: { product: Product }) {
  const { items, addItem, removeItem } = useOrder();

  const isInCart = items.find((item) => item.product.id === product.id);
  const hasQuantity = isInCart && isInCart?.quantity > 0;

  const currentItem = items.find((item) => item.product.id === product.id);

  return (
    <div
      className={`rounded-lg px-3 py-2 border ${hasQuantity ? "bg-green-50 border-green-400" : "bg-neutral-100 border-neutral-200"}`}
    >
      <p className="text-lg font-bold">{product.name}</p>
      <p className="text-sm text-neutral-500 mb-2">{product.category}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-500">
          <CreditCardOutlined />
          <strong>{product.price}</strong>
        </div>
        <div className="flex items-center gap-4">
          {currentItem && currentItem?.quantity > 0 && (
            <button
              onClick={() => removeItem(product.id, 1)}
              className="px-2 py-1 rounded-lg bg-neutral-200 hover:bg-neutral-300"
            >
              <MinusOutlined />
            </button>
          )}
          {currentItem && currentItem?.quantity > 0 && (
            <span>{currentItem.quantity}</span>
          )}

          <button
            onClick={() => addItem(product.id, 1)}
            className="px-2 py-1 rounded-lg bg-neutral-200 hover:bg-neutral-300"
          >
            <PlusOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}
