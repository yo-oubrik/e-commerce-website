import { getOrders } from "@/actions/orders/ordersActions";
import { Summary } from "./Summary";
import { getAllProducts } from "@/actions/products/productActions";
import { getUsers } from "@/actions/user/userActions";
import toast from "react-hot-toast";
import { Order, Product, User } from "@prisma/client";
import { safeUser } from "../product/utils/types";
import Container from "../components/Container";
import { Heading } from "../components/Heading";
import { convertToSafeUsers } from "../utils/helperFunctions/convertToSafeUsers";

const AdminPage = async () => {
  let products: Product[] = [];
  let users: User[] = [];
  let safeUsers: safeUser[] = [];
  let orders: Order[] = [];
  try {
    [orders, products, users] = await Promise.all([
      getOrders(),
      getAllProducts(),
      getUsers(),
    ]);
    safeUsers = convertToSafeUsers(...users);
  } catch (error) {
    toast.error("Ooops! Something went wrong. Please try again later.");
    return null;
  }
  return (
    <Container>
      <Heading title={"Summary"} />
      <Summary orders={orders} products={products} users={safeUsers} />
    </Container>
  );
};
export default AdminPage;
