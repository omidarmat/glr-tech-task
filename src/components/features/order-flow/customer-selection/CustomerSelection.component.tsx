import { useCustomers } from "@/services";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

export function CustomerSelection() {
  const { data: customers, isFetching: isFetchingCustomers } = useCustomers();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-neutral-200 rounded-lg p-2 w-full mb-4"
      />

      <div className="space-y-2 max-h-125 overflow-y-auto">
        {isFetchingCustomers &&
          Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="rounded-lg skeleton h-10 w-full" />
          ))}

        {!isFetchingCustomers &&
          customers &&
          customers
            ?.filter((customer) => customer.name.includes(debouncedQuery))
            .map((customer) => (
              <button
                key={customer.id}
                className="block w-full text-left p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
              >
                {customer.name}
              </button>
            ))}
      </div>
    </div>
  );
}
