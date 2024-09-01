import { Order, Product } from "@prisma/client";
import ProductOrderRow from "./ProductOrderRow";
import { CartProduct } from "@/app/product/utils/types";
interface IOrderDetails {
  order: Order & {
    cart_products: CartProduct[];
  };
}
export const OrderProductsTable: React.FC<IOrderDetails> = ({ order }) => {
  return (
    <div>
      <h2 className="text-xl mt-4">Products</h2>
      <div>
        <div className="hidden sm:grid sm:grid-cols-5 border-b border-slate-200 text-xs py-2">
          <div className="col-span-2">PRODUCT</div>
          <div className="text-center">PRICE</div>
          <div className="text-center">QUANTITY</div>
          <div className="text-end">SUBTOTAL</div>
        </div>
        {order.cart_products.map((cartProduct) => (
          <ProductOrderRow key={cartProduct.id} cartProduct={cartProduct} />
        ))}
      </div>
    </div>
  );
};
