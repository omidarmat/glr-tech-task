import { useOrderCustomer } from "@/contexts";
import { OrderFlowStep } from "@/types/order-flow.types";
import { useCallback, useState } from "react";
import { FlowStepper, SelectedCustomer } from "./common";
import { CustomerSelection } from "./customer-selection/CustomerSelection.component";
import { OrderSummary } from "./order-summary/OrderSummary.component";
import { ProductSelection } from "./product-selection/ProductSelection.component";

export function OrderFlow() {
  const { customer } = useOrderCustomer();

  const [stepId, setStepId] = useState<OrderFlowStep>(
    OrderFlowStep.CustomerSelection,
  );

  const goToProductSelection = useCallback(() => {
    setStepId(OrderFlowStep.ProductSelection);
  }, []);

  const goToOrderSummary = useCallback(() => {
    setStepId(OrderFlowStep.OrderSummary);
  }, []);

  return (
    <div>
      <FlowStepper currentStepId={stepId} />
      <SelectedCustomer customer={customer} />

      {stepId === OrderFlowStep.CustomerSelection && (
        <CustomerSelection onNextStep={goToProductSelection} />
      )}
      {stepId === OrderFlowStep.ProductSelection && (
        <ProductSelection onNextStep={goToOrderSummary} />
      )}
      {stepId === OrderFlowStep.OrderSummary && <OrderSummary />}
    </div>
  );
}
