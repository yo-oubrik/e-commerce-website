import { title } from "process";
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import Container from "../components/Container";
import { RedirectionPage } from "../components/RedirectionPage";
import { isUserAdmin } from "../utils/helperFunctions/isUserAdmin";

export const metadata = {
  title: "Admin dashboard",
  description: "Admin dashboard",
};
export const AdminPageLayout = async ({
  children,
}: {
  children: ReactNode;
}) => {
  if (!(await isUserAdmin()))
    return (
      <div className="py-8">
        <RedirectionPage
          heading={"Ooops! access denied"}
          description="go back home"
          href="/"
        />
      </div>
    );
  return (
    <>
      <Navbar />
      <div className="py-8">
        <Container>{children}</Container>
      </div>
    </>
  );
};
export default AdminPageLayout;
