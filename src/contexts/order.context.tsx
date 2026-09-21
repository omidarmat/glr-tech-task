import { useCustomers, useProducts } from "@/services";
import type { Customer } from "@/types/customers.types";
import type { OrderItem } from "@/types/order-flow.types";
import type { Product } from "@/types/products.types";
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import toast from "react-hot-toast";

interface OrderContextType {
  customer: Customer | null;
  setCustomer: Dispatch<SetStateAction<Customer | null>>;
  items: OrderItem[];
  addItem: (productId: Product["id"], quantity: number) => void;
  removeItem: (productId: Product["id"], quantity: number) => void;
  customers: Customer[];
  products: Product[];
  isFetchingCustomers: boolean;
  isFetchingProducts: boolean;
}

const OrderContext = createContext<OrderContextType>({
  customer: null,
  setCustomer: () => {},
  items: [],
  addItem: () => {},
  removeItem: () => {},
  customers: [],
  products: [],
  isFetchingCustomers: false,
  isFetchingProducts: false,
});

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const { data: products, isFetching: isFetchingProducts } = useProducts();
  const { data: customers, isFetching: isFetchingCustomers } = useCustomers();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);

  function addItem(productId: Product["id"], quantity: number) {
    const currentItem = items.find((item) => item.product.id === productId);

    if (currentItem) {
      // Prevent adding more items than the product has in stock
      if (currentItem.quantity + quantity > currentItem.product.stock) {
        return toast.error("Not enough stock available for this product");
      } else {
        setItems((prevItems) => {
          return prevItems.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        });
      }
    } else {
      setItems((prevItems) => {
        const product = products?.find((product) => product.id === productId);
        if (!product) return prevItems;
        return [...prevItems, { product, quantity }];
      });
    }
  }

  function removeItem(productId: Product["id"], quantity: number) {
    const currentItem = items.find((item) => item.product.id === productId);
    if (currentItem) {
      if (currentItem.quantity - quantity < 0) {
        return toast.error(
          "Cannot remove more items than the product has in cart",
        );
      } else {
        setItems((prevItems) => {
          return prevItems.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity - quantity }
              : item,
          );
        });
      }
    } else {
      // Prevent removing a product that is not in the cart
      return toast.error("Product not found in cart");
    }
  }

  return (
    <OrderContext.Provider
      value={{
        customer,
        setCustomer,
        items,
        addItem,
        removeItem,
        customers: customers || [],
        products: products || [],
        isFetchingCustomers,
        isFetchingProducts,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}
