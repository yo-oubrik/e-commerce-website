import { RedirectionPage } from "@/app/components/RedirectionPage";
import { ManageOrdersClient } from "./ManageOrdersClient";
import { getOrders } from "@/actions/orders/ordersActions";
export const ManageOrders = async () => {
  const orders = await getOrders();

  if (orders.length === 0)
    return (
      <RedirectionPage
        heading={"No orders found"}
        description="go back to home"
        href="/"
      />
    );
  return <ManageOrdersClient orders={orders} />;
};
export default ManageOrders;
