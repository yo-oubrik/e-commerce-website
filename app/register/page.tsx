import { getCurrentUser } from "@/actions/user/userActions";
import Container from "../components/Container";
import FormWrapper from "../components/FormWrapper";
import RegisterForm from "./RegisterForm";

const Register = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container customClass="flex justify-center py-8">
      <FormWrapper>
        <RegisterForm currentUser={currentUser}></RegisterForm>
      </FormWrapper>
    </Container>
  );
};

export default Register;
