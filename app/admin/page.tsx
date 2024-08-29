import {
  getGraphData,
  getOrders,
  GraphData,
} from "@/actions/orders/ordersActions";
import { Summary } from "./Summary";
import { getAllProducts } from "@/actions/products/productActions";
import { getUsers } from "@/actions/user/userActions";
import toast from "react-hot-toast";
import { Order, Product, User } from "@prisma/client";
import { safeUser } from "../product/utils/types";
import Container from "../components/Container";
import { Heading } from "../components/Heading";
import { convertToSafeUsers } from "../utils/helperFunctions/convertToSafeUsers";
import { BarGraph } from "./BarGraph";

const AdminPage = async () => {
  try {
    const [orders, products, users, graphData] = await Promise.all([
      getOrders(),
      getAllProducts(),
      getUsers(),
      getGraphData(),
    ]);
    const safeUsers = convertToSafeUsers(...users);
    return (
      <Container>
        <Heading title={"Summary"} />
        <Summary orders={orders} products={products} users={safeUsers} />
        <div>
          <BarGraph data={graphData} />
        </div>
      </Container>
    );
  } catch (error) {
    throw error;
  }
};
export default AdminPage;
