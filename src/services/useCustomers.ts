import { useQuery } from "@tanstack/react-query";
import { fakeApi } from "../fake-data";

export function useCustomers() {
  return useQuery({
    queryFn: fakeApi.getCustomers,
    queryKey: ["customers"],
  });
}
