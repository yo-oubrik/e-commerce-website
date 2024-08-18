import Container from "@/app/components/Container";
import { products } from "@/app/utils/products";
import { RedirectionPage } from "@/app/components/RedirectionPage";
import { OrderDetails } from "./OrderDetails";
import { getOrderById } from "@/actions/orders/ordersActions";
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
          heading="Oops! No orders found"
          href="/"
          description="Go back to homepage"
        />
      ) : (
        <>
          <OrderDetails order={order} />
        </>
      )}
    </Container>
  );
};
export default OrderDetailsPage;
