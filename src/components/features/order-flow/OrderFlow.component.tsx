import { OrderFlowStep } from "@/types/order-flow.types";
import { useState } from "react";
import { CustomerSelection } from "./customer-selection/CustomerSelection.component";
import { OrderSummary } from "./order-summary/OrderSummary.component";
import { ProductSelection } from "./product-selection/ProductSelection.component";
import { useOrder } from "@/contexts";
import { FlowStepper, SelectedCustomer } from "./common";

export function OrderFlow() {
  const { customer } = useOrder();

  const [stepId, setStepId] = useState<OrderFlowStep>(
    OrderFlowStep.CustomerSelection,
  );

  function handleNextStep(stepId: OrderFlowStep) {
    setStepId(stepId);
  }

  return (
    <div>
      <FlowStepper currentStepId={stepId} />
      <SelectedCustomer customer={customer} />

      {stepId === OrderFlowStep.CustomerSelection && (
        <CustomerSelection
          onNextStep={() => handleNextStep(OrderFlowStep.ProductSelection)}
        />
      )}
      {stepId === OrderFlowStep.ProductSelection && (
        <ProductSelection
          onNextStep={() => handleNextStep(OrderFlowStep.OrderSummary)}
        />
      )}
      {stepId === OrderFlowStep.OrderSummary && <OrderSummary />}
    </div>
  );
}
