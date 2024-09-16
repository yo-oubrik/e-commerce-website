import {
  fetchOrdersWithUsers,
  getGraphData,
} from "@/repository/orders/ordersActions";
import { getAllProducts } from "@/repository/products/productActions";
import { getAllUsers } from "@/repository/user/userActions";
import { Heading } from "../components/Heading";
import { convertToSafeUsers } from "../utils/helperFunctions/helperFunctions";
import { BarGraph } from "./BarGraph";
import { Summary } from "./Summary";

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
      <BarGraph data={graphData} title="Last Week Gain" />
    </>
  );
};
export default AdminPage;
