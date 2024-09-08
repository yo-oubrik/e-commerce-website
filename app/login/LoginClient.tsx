"use client";
import { useRouter } from "next/navigation";
import FormWrapper from "../components/FormWrapper";
import { safeUser } from "../product/utils/types";
import LoginForm from "./LoginForm";
interface ILogin {
  currentUser: safeUser | undefined;
}
export const LoginClient: React.FC<ILogin> = ({ currentUser }) => {
  const router = useRouter();
  if (currentUser) {
    router.push("/");
    router.refresh();
    return <p>Logged in. Redirecting...</p>;
  }

  return (
    <FormWrapper>
      <LoginForm />
    </FormWrapper>
  );
};
