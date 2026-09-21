import { useCustomers, useProducts } from "@/services";
import type { Customer } from "@/types/customers.types";
import type { OrderItem } from "@/types/order-flow.types";
import type { Product } from "@/types/products.types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import toast from "react-hot-toast";

interface OrderCustomerContextType {
  customer: Customer | null;
  setCustomer: Dispatch<SetStateAction<Customer | null>>;
}

interface OrderItemsContextType {
  items: OrderItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: Product["id"], quantity: number) => void;
}

const OrderCustomerContext = createContext<OrderCustomerContextType | null>(
  null,
);
const OrderItemsContext = createContext<OrderItemsContextType | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  // Prefetch into the query cache without putting server data in context.
  useCustomers();
  useProducts();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const itemsRef = useRef(items);

  const addItem = useCallback((product: Product, quantity: number) => {
    const { items: nextItems, error } = addItemToOrder(
      itemsRef.current,
      product,
      quantity,
    );

    if (error) {
      toast.error(error);
      return;
    }

    itemsRef.current = nextItems;
    setItems(nextItems);
  }, []);

  const removeItem = useCallback(
    (productId: Product["id"], quantity: number) => {
      const { items: nextItems, error } = removeItemFromOrder(
        itemsRef.current,
        productId,
        quantity,
      );

      if (error) {
        toast.error(error);
        return;
      }

      itemsRef.current = nextItems;
      setItems(nextItems);
    },
    [],
  );

  const customerValue = useMemo(
    () => ({ customer, setCustomer }),
    [customer],
  );

  const itemsValue = useMemo(
    () => ({ items, addItem, removeItem }),
    [items, addItem, removeItem],
  );

  return (
    <OrderCustomerContext.Provider value={customerValue}>
      <OrderItemsContext.Provider value={itemsValue}>
        {children}
      </OrderItemsContext.Provider>
    </OrderCustomerContext.Provider>
  );
}

export function useOrderCustomer() {
  const context = useContext(OrderCustomerContext);
  if (!context) {
    throw new Error("useOrderCustomer must be used within an OrderProvider");
  }
  return context;
}

export function useOrderItems() {
  const context = useContext(OrderItemsContext);
  if (!context) {
    throw new Error("useOrderItems must be used within an OrderProvider");
  }
  return context;
}

function addItemToOrder(
  prevItems: OrderItem[],
  product: Product,
  quantity: number,
): { items: OrderItem[]; error?: string } {
  const currentItem = prevItems.find((item) => item.product.id === product.id);
  const nextQuantity = (currentItem?.quantity ?? 0) + quantity;

  if (nextQuantity > product.stock) {
    return {
      items: prevItems,
      error: "Not enough stock available for this product",
    };
  }

  if (currentItem) {
    return {
      items: prevItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: nextQuantity }
          : item,
      ),
    };
  }

  return { items: [...prevItems, { product, quantity }] };
}

function removeItemFromOrder(
  prevItems: OrderItem[],
  productId: Product["id"],
  quantity: number,
): { items: OrderItem[]; error?: string } {
  const currentItem = prevItems.find((item) => item.product.id === productId);

  if (!currentItem) {
    return { items: prevItems, error: "Product not found in cart" };
  }

  const nextQuantity = currentItem.quantity - quantity;

  if (nextQuantity < 0) {
    return {
      items: prevItems,
      error: "Cannot remove more items than the product has in cart",
    };
  }

  if (nextQuantity === 0) {
    return {
      items: prevItems.filter((item) => item.product.id !== productId),
    };
  }

  return {
    items: prevItems.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: nextQuantity }
        : item,
    ),
  };
}
