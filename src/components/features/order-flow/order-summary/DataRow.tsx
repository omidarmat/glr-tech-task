export default function DataRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}
