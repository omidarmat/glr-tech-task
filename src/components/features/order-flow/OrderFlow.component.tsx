import { OrderFlowStep } from "@/types/order-flow.types";
import { useState } from "react";
import { CustomerSelection } from "./customer-selection/CustomerSelection.component";
import { ProductSelection } from "./product-selection/ProductSelection.component";
import { OrderSummary } from "./order-summary/OrderSummary.component";
import { FlowStepper } from "./common/flow-stepper/FlowStepper.component";

export function OrderFlow() {
  const [step, setStep] = useState<OrderFlowStep>(
    OrderFlowStep.CustomerSelection,
  );

  return (
    <div>
      <FlowStepper step={step} />
      {step === OrderFlowStep.CustomerSelection && <CustomerSelection />}
      {step === OrderFlowStep.ProductSelection && <ProductSelection />}
      {step === OrderFlowStep.OrderSummary && <OrderSummary />}
    </div>
  );
}
