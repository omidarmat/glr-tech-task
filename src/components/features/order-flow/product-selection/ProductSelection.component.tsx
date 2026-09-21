import { appConfig } from "@/config/app.config";
import { useOrderItems } from "@/contexts";
import { useProducts } from "@/services";
import { useDebounce } from "@uidotdev/usehooks";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard.component";

export function ProductSelection({ onNextStep }: { onNextStep: () => void }) {
  const { items, addItem, removeItem } = useOrderItems();
  const { data: products, isFetching: isFetchingProducts } = useProducts();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, appConfig.queryDebounceTime);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (!debouncedQuery) return products;
    return products.filter((product) => product.name.includes(debouncedQuery));
  }, [products, debouncedQuery]);

  const quantityByProductId = useMemo(() => {
    const quantities = new Map<string, number>();
    for (const item of items) {
      quantities.set(item.product.id, item.quantity);
    }
    return quantities;
  }, [items]);

  return (
    <div>
      <input
        placeholder="Search product name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-neutral-200 rounded-lg p-2 w-full mb-4"
      />
      <div className="space-y-2 max-h-125 overflow-y-auto mb-4">
        {isFetchingProducts &&
          Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="rounded-lg skeleton h-16 w-full" />
          ))}

        {!isFetchingProducts &&
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantityByProductId.get(product.id) ?? 0}
              onAdd={addItem}
              onRemove={removeItem}
            />
          ))}
      </div>

      {items.length > 0 && (
        <button
          onClick={() => onNextStep()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full cursor-pointer hover:bg-blue-600"
        >
          Proceed to checkout
        </button>
      )}
    </div>
  );
}
