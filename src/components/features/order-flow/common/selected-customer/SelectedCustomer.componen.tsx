import type { Customer } from "@/types/customers.types";
import { UserOutlined } from "@ant-design/icons";

export function SelectedCustomer({ customer }: { customer: Customer | null }) {
  if (!customer) return null;

  return (
    <div className="text-lg mb-4 bg-blue-500/10 px-4 py-2 rounded-lg flex items-center gap-2">
      <UserOutlined style={{ color: "#1877F2" }} />
      <p>
        Customer: <strong>{customer.name}</strong>
      </p>
    </div>
  );
}
