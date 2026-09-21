import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="max-w-4xl h-screen mx-auto px-4">
      <Outlet />
    </div>
  );
}
