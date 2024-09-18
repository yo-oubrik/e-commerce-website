import Container from "@/app/components/Container";
import { RedirectionPage } from "@/app/components/RedirectionPage";
import { OrderDetailsClient } from "./OrderDetailsClient";
import { getOrderById } from "@/repository/order/order";
interface IProductParams {
  params: { orderId: string };
}
const OrderDetailsPage: React.FC<IProductParams> = async ({
  params: { orderId },
}) => {
  const order = await getOrderById(orderId);
  return (
    <Container customClass="py-8">
      {!order ? (
        <RedirectionPage
          heading="Oops! Order not found"
          href="/"
          description="Go back to homepage"
        />
      ) : (
        <OrderDetailsClient order={order} />
      )}
    </Container>
  );
};
export default OrderDetailsPage;
