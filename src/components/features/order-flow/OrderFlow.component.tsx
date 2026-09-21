import { useOrderCustomer } from "@/contexts";
import { OrderFlowStep } from "@/types/order-flow.types";
import { useCallback, useState } from "react";
import { FlowStepper, SelectedCustomer } from "./common";
import { CustomerSelection } from "./customer-selection/CustomerSelection.component";
import { OrderSummary } from "./order-summary/OrderSummary.component";
import { ProductSelection } from "./product-selection/ProductSelection.component";
import { ArrowLeftOutlined } from "@ant-design/icons";

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

  function goToPreviousStep() {
    if (stepId === OrderFlowStep.ProductSelection) {
      setStepId(OrderFlowStep.CustomerSelection);
    } else if (stepId === OrderFlowStep.OrderSummary) {
      setStepId(OrderFlowStep.ProductSelection);
    }
  }

  return (
    <div>
      <FlowStepper currentStepId={stepId} />
      {stepId !== OrderFlowStep.CustomerSelection && (
        <button
          onClick={goToPreviousStep}
          className="flex items-center gap-2 hover:bg-neutral-50 rounded-lg px-2 py-0.5 mb-2"
        >
          <ArrowLeftOutlined />
          <span>Step back</span>
        </button>
      )}
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
