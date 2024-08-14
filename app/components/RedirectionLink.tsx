import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

interface IRedirectionLink {
  href: string;
  description: string;
}
export const RedirectionLink: React.FC<IRedirectionLink> = ({
  href,
  description,
}) => {
  return (
    <Link
      href={href}
      className="flex justify-center items-center gap-1 text-slate-500"
    >
      <MdArrowBack />
      <span>{description}</span>
    </Link>
  );
};
