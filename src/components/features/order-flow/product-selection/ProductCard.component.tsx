import type { Product } from "@/types/products.types";
import {
  CreditCardOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { memo } from "react";

function ProductCard({
  product,
  quantity,
  onAdd,
  onRemove,
}: {
  product: Product;
  quantity: number;
  onAdd: (product: Product, quantity: number) => void;
  onRemove: (productId: Product["id"], quantity: number) => void;
}) {
  const hasQuantity = quantity > 0;

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
          {hasQuantity && (
            <button
              onClick={() => onRemove(product.id, 1)}
              className="px-2 py-1 rounded-lg bg-neutral-200 hover:bg-neutral-300"
            >
              <MinusOutlined />
            </button>
          )}
          {hasQuantity && <span>{quantity}</span>}

          <button
            onClick={() => onAdd(product, 1)}
            className="px-2 py-1 rounded-lg bg-neutral-200 hover:bg-neutral-300"
          >
            <PlusOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
