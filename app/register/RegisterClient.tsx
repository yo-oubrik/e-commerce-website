"use client";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import FormWrapper from "../components/FormWrapper";
import { safeUser } from "../product/utils/types";
import RegisterForm from "./RegisterForm";
interface IRegisterClient {
  currentUser: safeUser | undefined;
}
export const RegisterClient: React.FC<IRegisterClient> = ({ currentUser }) => {
  const router = useRouter();
  if (currentUser) {
    router.push("/");
    router.refresh();
    return <p>Logged in. Redirecting...</p>;
  }
  return (
    <FormWrapper>
      <RegisterForm />
    </FormWrapper>
  );
};
