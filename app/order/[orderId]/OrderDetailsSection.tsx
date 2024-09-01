import { DeliveryStatus, Order, PaymentStatus, Product } from "@prisma/client";
import moment from "moment";

interface IOrderDetails {
  order: Order;
}
export const OrderDetailsSection: React.FC<IOrderDetails> = ({ order }) => {
  return (
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
  );
};
