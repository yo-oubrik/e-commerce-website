import { getCurrentUser } from "@/repository/user/userActions";
import Container from "../components/Container";
import FormWrapper from "../components/FormWrapper";
import RegisterForm from "./RegisterForm";
import { RegisterClient } from "./RegisterClient";

const Register = async () => {
  let currentUser;
  try {
    currentUser = await getCurrentUser();
  } catch (err) {
    console.info("User not logged in, rendering as guest");
  }
  return (
    <Container customClass="flex justify-center py-8">
      <RegisterClient currentUser={currentUser} />;
    </Container>
  );
};

export default Register;
