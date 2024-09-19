import { RedirectionPage } from "@/app/components/RedirectionPage";
import { ManageOrdersClient } from "./ManageOrdersClient";
import { fetchOrdersWithUsers } from "@/repository/order/order";
import { isArrayEmpty } from "@/app/utils/functions/arrays";
export const ManageOrders = async () => {
  const orders = await fetchOrdersWithUsers();

  if (isArrayEmpty(orders))
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
