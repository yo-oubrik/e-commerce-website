import { Order, Product } from "@prisma/client";
import { OrderDetailsSection } from "./OrderDetailsSection";
import { OrderProductsTable } from "./OrderProductsTable";
import { CartProduct } from "@/app/product/utils/types";

interface IOrderDetails {
  order: Order & {
    cart_products: CartProduct[];
  };
}
export const OrderDetailsClient: React.FC<IOrderDetails> = ({ order }) => {
  return (
    <>
      <OrderDetailsSection order={order} />
      <OrderProductsTable order={order} />
    </>
  );
};
