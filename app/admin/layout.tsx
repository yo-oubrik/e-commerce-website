import { isUserAdmin } from "@/repository/user/user";
import { ReactNode } from "react";
import Container from "../components/Container";
import { RedirectionPage } from "../components/RedirectionPage";
import { Navbar } from "./Navbar";

export const metadata = {
  title: "Admin dashboard",
  description: "Admin dashboard",
};
const AdminPageLayout = async ({ children }: { children: ReactNode }) => {
  try {
    if (await isUserAdmin())
      return (
        <>
          <Navbar />
          <div className="py-8">
            <Container>{children}</Container>
          </div>
        </>
      );
    return (
      <div className="py-8">
        <RedirectionPage
          heading={"Ooops! access denied"}
          description="go back home"
          href="/"
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="py-8">
        <RedirectionPage
          heading={"Ooops! access denied"}
          description="go back home"
          href="/"
        />
      </div>
    );
  }
};
export default AdminPageLayout;
