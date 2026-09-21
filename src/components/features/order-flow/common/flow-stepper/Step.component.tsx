import type { OrderFlowStep } from "@/types/order-flow.types";

export function Step({
  children,
  isActive,
  onClickStep,
}: {
  children: React.ReactNode;
  isActive: boolean;
  onClickStep: () => void;
}) {
  return (
    <div
      onClick={onClickStep}
      className={`rounded-lg px-3 py-2 ${isActive ? "bg-green-300" : "bg-neutral-200"}`}
    >
      {children}
    </div>
  );
}
