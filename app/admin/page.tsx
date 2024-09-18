import {
  fetchOrdersWithUsers,
  getLastWeekDailyOrderTotals,
} from "@/repository/order/order";
import { getAllProducts } from "@/repository/product/product";
import { getAllUsers } from "@/repository/user/user";
import { Heading } from "../components/Heading";
import { convertToSafeUsers } from "../utils/helperFunctions/helperFunctions";
import { BarGraph } from "./BarGraph";
import { Summary } from "./Summary";

const AdminPage = async () => {
  const [orders, products, users, graphData] = await Promise.all([
    fetchOrdersWithUsers(),
    getAllProducts(),
    getAllUsers(),
    getLastWeekDailyOrderTotals(),
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
