import { appConfig } from "@/config/app.config";
import { useOrder } from "@/contexts";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import ProductCard from "./ProductCard.component";

export function ProductSelection({ onNextStep }: { onNextStep: () => void }) {
  const { products, isFetchingProducts } = useOrder();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, appConfig.queryDebounceTime);

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
          products &&
          products
            ?.filter((product) => product.name.includes(debouncedQuery))
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      <button
        onClick={() => onNextStep()}
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full cursor-pointer hover:bg-blue-600"
      >
        Proceed to checkout
      </button>
    </div>
  );
}
