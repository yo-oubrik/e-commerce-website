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
  const [orders, products, users, lastWeekDailyOrderTotals] = await Promise.all(
    [
      fetchOrdersWithUsers(),
      getAllProducts(),
      getAllUsers(),
      getLastWeekDailyOrderTotals(),
    ]
  );
  const safeUsers = convertToSafeUsers(...users);
  return (
    <>
      <Heading title={"Summary"} />
      <Summary orders={orders} products={products} users={safeUsers} />
      <BarGraph
        chartLabel="Last Week Gain"
        xAxis={Object.keys(lastWeekDailyOrderTotals)}
        yAxis={Object.values(lastWeekDailyOrderTotals)}
      />
    </>
  );
};
export default AdminPage;
