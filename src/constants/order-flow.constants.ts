import { OrderFlowStep } from "@/types/order-flow.types";

export const ORDER_FLOW_STEPS = {
  [OrderFlowStep.CustomerSelection]: {
    id: OrderFlowStep.CustomerSelection,
    label: "Customer",
  },
  [OrderFlowStep.ProductSelection]: {
    id: OrderFlowStep.ProductSelection,
    label: "Products",
  },
  [OrderFlowStep.OrderSummary]: {
    id: OrderFlowStep.OrderSummary,
    label: "Summary",
  },
};
