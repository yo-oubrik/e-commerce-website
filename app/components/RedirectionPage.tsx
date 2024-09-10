import React from "react";
import { RedirectionLink } from "./RedirectionLink";
interface IRedirectionLinks {
  description: string;
  href: string;
}
interface IRedirectPage {
  heading: string;
  description?: string;
  href?: string;
  redirectionLinks?: IRedirectionLinks[];
}

export const RedirectionPage: React.FC<IRedirectPage> = ({
  heading,
  description,
  href,
  redirectionLinks,
}) => {
  return (
    <div className="text-center">
      <h2 className="text-center text-2xl mb-2">{heading}</h2>
      {href && description && (
        <RedirectionLink href={href} description={description} />
      )}
      {redirectionLinks?.map((redirectionLink, index) => (
        <RedirectionLink
          key={index}
          href={redirectionLink?.href}
          description={redirectionLink?.description}
        />
      ))}
    </div>
  );
};
