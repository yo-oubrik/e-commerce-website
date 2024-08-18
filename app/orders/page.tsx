import { RedirectionPage } from "@/app/components/RedirectionPage";
import { OrdersClient } from "./OrdersClient";
import { getClientOrders } from "@/actions/orders/ordersActions";
import Container from "../components/Container";
export const ManageOrders = async () => {
  console.log("Calling getClientOrders");
  const orders = await getClientOrders();
  console.log("Fetched orders", orders);

  return (
    <div className="py-8">
      <Container>
        {!orders || orders.length === 0 ? (
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
