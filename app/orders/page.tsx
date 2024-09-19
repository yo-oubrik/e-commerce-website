import { RedirectionPage } from "@/app/components/RedirectionPage";
import { OrdersClient } from "./OrdersClient";
import { getClientOrders } from "@/repository/order/order";
import Container from "../components/Container";
import { isArrayEmpty } from "../utils/functions/arrays";
export const ManageOrders = async () => {
  const orders = await getClientOrders();

  return (
    <div className="py-8">
      <Container>
        {isArrayEmpty(orders) ? (
          <RedirectionPage
            heading={"No orders found"}
            description="go back to home"
            href="/"
          />
        ) : (
          <OrdersClient orders={orders} />
        )}
      </Container>
    </div>
  );
};
export default ManageOrders;
