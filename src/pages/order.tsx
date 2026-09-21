import { OrderProvider } from "@/contexts";
import { OrderFlow } from "../components/features/order-flow/OrderFlow.component";

export function PageOrder() {
  return (
    <OrderProvider>
      <OrderFlow />
    </OrderProvider>
  );
}
