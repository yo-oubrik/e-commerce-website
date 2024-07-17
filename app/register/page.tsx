import Container from "../components/Container";
import FormWrapper from "../components/FormWrapper";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <Container customClass="flex items-center justify-center min-h-screen">
      <FormWrapper>
        <RegisterForm></RegisterForm>
      </FormWrapper>
    </Container>
  );
};

export default Register;
