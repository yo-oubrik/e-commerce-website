import { isLoggedIn } from "@/actions/user/userActions";
import CartClient from "./CartClient";

const CartPage = async () => {
  const loggedIn = await isLoggedIn();
  return <CartClient isLoggedIn={loggedIn} />;
};
export default CartPage;
