import { useCustomers } from "../../../services";

export function Customers() {
  const { data: customers, isFetching: isFetchingCustomers } = useCustomers();

  return <div>Customers.component</div>;
}
