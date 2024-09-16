import Link from "next/link";
import { IconType } from "react-icons";

interface INavbar {
  label: string;
  Icon: IconType;
  isActive: boolean;
  href: string;
}
export const NavbarItem: React.FC<INavbar> = ({ label, Icon, isActive }) => {
  return (
    <Link
      className="flex items-center md:justify-center"
      href={"/admin/manage-products"}
    >
      <div
        className={`flex items-center gap-2 p-3 hover:text-slate-800 transition cursor-pointer ${
          isActive ? "text-slate-800" : "text-slate-500"
        }`}
      >
        <Icon size={24} />
        <div className="font-medium text-sm">{label}</div>
      </div>
    </Link>
  );
};
