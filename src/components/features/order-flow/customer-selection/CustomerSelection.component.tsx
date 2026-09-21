import { appConfig } from "@/config/app.config";
import { useOrder } from "@/contexts";
import { useCustomers } from "@/services";
import type { Customer } from "@/types/customers.types";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

export function CustomerSelection({ onNextStep }: { onNextStep: () => void }) {
  const { setCustomer, customers, isFetchingCustomers } = useOrder();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, appConfig.queryDebounceTime);

  function handleSelectCustomer(customer: Customer) {
    setCustomer(customer);
    onNextStep();
  }

  return (
    <div>
      <input
        placeholder="Search customer name"
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
                onClick={() => handleSelectCustomer(customer)}
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
