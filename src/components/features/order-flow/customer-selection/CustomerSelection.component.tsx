import { appConfig } from "@/config/app.config";
import { useOrderCustomer } from "@/contexts";
import { useCustomers } from "@/services";
import type { Customer } from "@/types/customers.types";
import { useDebounce } from "@uidotdev/usehooks";
import { memo, useCallback, useMemo, useState } from "react";

export function CustomerSelection({ onNextStep }: { onNextStep: () => void }) {
  const { setCustomer } = useOrderCustomer();
  const { data: customers, isFetching: isFetchingCustomers } = useCustomers();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, appConfig.queryDebounceTime);

  const handleSelectCustomer = useCallback(
    (customer: Customer) => {
      setCustomer(customer);
      onNextStep();
    },
    [onNextStep, setCustomer],
  );

  const filteredCustomers = useMemo(() => {
    if (!customers) return [];
    if (!debouncedQuery) return customers;
    return customers.filter((customer) =>
      customer.name.includes(debouncedQuery),
    );
  }, [customers, debouncedQuery]);

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
          filteredCustomers.map((customer) => (
            <CustomerListItem
              key={customer.id}
              customer={customer}
              onSelect={handleSelectCustomer}
            />
          ))}
      </div>
    </div>
  );
}

const CustomerListItem = memo(function CustomerListItem({
  customer,
  onSelect,
}: {
  customer: Customer;
  onSelect: (customer: Customer) => void;
}) {
  return (
    <button
      onClick={() => onSelect(customer)}
      className="block w-full text-left p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
    >
      {customer.name}
    </button>
  );
});
