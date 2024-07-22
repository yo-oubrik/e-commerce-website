import { getCurrentUser } from "@/actions/user/userActions";
import Container from "../components/Container";
import FormWrapper from "../components/FormWrapper";
import LoginForm from "./LoginForm";

const Login = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container customClass="flex justify-center py-8">
      <FormWrapper>
        <LoginForm currentUser={currentUser} />
      </FormWrapper>
    </Container>
  );
};

export default Login;
