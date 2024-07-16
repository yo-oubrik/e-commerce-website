import React from "react";

interface FooterListProps {
  children: React.ReactNode;
}
const FooterList: React.FC<FooterListProps> = ({ children }) => {
  return (
    <div className="max-md:mb-1 sm:basis-1/2 lg:basis-1/4 px-4">{children}</div>
  );
};

export default FooterList;
