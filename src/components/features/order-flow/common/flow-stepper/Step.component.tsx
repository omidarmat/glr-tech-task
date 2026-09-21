export function Step({
  children,
  isActive,
}: {
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <div
      className={`rounded-lg px-3 py-2 ${isActive ? "bg-green-300" : "bg-neutral-200"}`}
    >
      {children}
    </div>
  );
}
