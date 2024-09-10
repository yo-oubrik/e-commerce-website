import { DeliveryStatus } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";

const updateDeliveryStatus = async (
  id: string,
  status: DeliveryStatus,
  successMessage: string,
  router: any
) => {
  try {
    await axios.put("/api/order", { id, deliveryStatus: status });
    toast.success(successMessage, { id });
    router.refresh();
  } catch (error) {
    toast.error("Oops! Something went wrong", { id });
  }
};
export const handleDeliver = (id: string, router: any) => {
  updateDeliveryStatus(id, DeliveryStatus.delivered, "Order Delivered", router);
};

export const handleDispatch = (id: string, router: any) => {
  updateDeliveryStatus(
    id,
    DeliveryStatus.dispatched,
    "Order Dispatched",
    router
  );
};
