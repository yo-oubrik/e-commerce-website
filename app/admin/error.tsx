"use client";

import Container from "../components/Container";
import { RedirectionPage } from "../components/RedirectionPage";

const ErrorPage = () => {
  return (
    <Container>
      <div className="py-8">
        <RedirectionPage
          heading="Ooops! something went wrong"
          description="contact support"
          href="/"
        />
      </div>
    </Container>
  );
};
export default ErrorPage;
