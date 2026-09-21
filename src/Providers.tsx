import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/tanstack-query";
import React from "react";
import { BrowserRouter } from "react-router";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}
