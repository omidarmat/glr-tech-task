import { useQuery } from "@tanstack/react-query";
import { fakeApi } from "../fake-data/fake-api";

export function useProducts() {
  return useQuery({
    queryFn: fakeApi.getProducts,
    queryKey: ["products"],
  });
}
