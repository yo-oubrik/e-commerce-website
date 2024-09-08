import { getCurrentUser } from "@/actions/user/userActions";
import { LoginClient } from "./LoginClient";
import Container from "../components/Container";

const Login = async () => {
  let currentUser;
  try {
    currentUser = await getCurrentUser();
  } catch (err) {
    console.info("User not logged in, rendering as guest");
  }
  return (
    <Container customClass="flex justify-center py-8">
      <LoginClient currentUser={currentUser} />;
    </Container>
  );
};

export default Login;
