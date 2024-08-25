import ProductCartRow from "@/app/cart/ProductCartRow";
import { DeliveryStatus, Order, PaymentStatus, Product } from "@prisma/client";
import moment from "moment";
import ProductOrderRow from "./ProductOrderRow";

interface IOrderDetails {
  order: Order & {
    products: Product[];
  };
}
export const OrderDetails: React.FC<IOrderDetails> = ({ order }) => {
  return (
    <>
      <div className="text-sm">
        <h2 className="text-xl sm:text-2xl mb-3">Order Details</h2>
        <div className="flex gap-2">
          <span className="font-semibold">Order ID : </span>
          <span>{order.id}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Amount : </span>
          <span>{order.amount}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Payment Status : </span>
          <span
            className={`${
              order.status === PaymentStatus.complete
                ? "text-teal-400"
                : PaymentStatus.pending
                ? "text-rose-400"
                : ""
            }
  `}
          >
            {order.status}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Delivery Status : </span>
          <span
            className={`${
              order.deliveryStatus === DeliveryStatus.delivered
                ? "text-teal-400"
                : DeliveryStatus.pending
                ? "text-rose-400"
                : DeliveryStatus.dispatched
                ? "text-orange-400"
                : ""
            }
          `}
          >
            {order.deliveryStatus}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Created At : </span>
          <span>{moment(order.createDate).fromNow()}</span>
        </div>
      </div>
      <div>
        <h2 className="text-xl mt-4">Products</h2>
        <div>
          <div className="hidden sm:grid sm:grid-cols-5 border-b border-slate-200 text-xs py-2">
            <div className="col-span-2">PRODUCT</div>
            <div className="text-center">PRICE</div>
            <div className="text-center">QUANTITY</div>
            <div className="text-end">SUBTOTAL</div>
          </div>
          {order.products.map((product) => (
            <ProductOrderRow key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};
