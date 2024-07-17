import Container from "../components/Container";
import FormWrapper from "../components/FormWrapper";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <Container customClass="flex justify-center py-8">
      <FormWrapper>
        <RegisterForm></RegisterForm>
      </FormWrapper>
    </Container>
  );
};

export default Register;
