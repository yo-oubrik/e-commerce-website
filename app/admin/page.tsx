import {
  getGraphData,
  fetchOrdersWithUsers,
} from "@/actions/orders/ordersActions";
import { Summary } from "./Summary";
import { getAllProducts } from "@/actions/products/productActions";
import { getAllUsers } from "@/actions/user/userActions";
import Container from "../components/Container";
import { Heading } from "../components/Heading";
import { convertToSafeUsers } from "../utils/helperFunctions/helperFunctions";
import { BarGraph } from "./BarGraph";

const AdminPage = async () => {
  const [orders, products, users, graphData] = await Promise.all([
    fetchOrdersWithUsers(),
    getAllProducts(),
    getAllUsers(),
    getGraphData(),
  ]);
  const safeUsers = convertToSafeUsers(...users);
  return (
    <>
      <Heading title={"Summary"} />
      <Summary orders={orders} products={products} users={safeUsers} />
      <BarGraph data={graphData} />
    </>
  );
};
export default AdminPage;
