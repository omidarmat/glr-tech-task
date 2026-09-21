import { ORDER_FLOW_STEPS } from "@/constants/order-flow.constants";
import type { OrderFlowStep } from "@/types/order-flow.types";
import { Step } from "./Step.component";

// TODO: make reusable with any list of steps
export function FlowStepper({
  currentStepId,
  onClickStep,
}: {
  currentStepId: OrderFlowStep;
  onClickStep?: (stepId: OrderFlowStep) => void;
}) {
  return (
    <div className="flex items-center justify-between mb-4 py-4">
      {Object.values(ORDER_FLOW_STEPS).map((step) => (
        <Step
          onClickStep={() => onClickStep?.(step.id)}
          isActive={currentStepId === step.id}
          key={step.id}
        >
          {step.label}
        </Step>
      ))}
    </div>
  );
}
