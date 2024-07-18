import Container from "../components/Container";
import FormWrapper from "../components/FormWrapper";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <Container customClass="flex justify-center py-8">
      <FormWrapper>
        <LoginForm />
      </FormWrapper>
    </Container>
  );
};

export default Login;
