import { IconType } from "react-icons";

interface INavbar {
  label: string;
  Icon: IconType;
  isActive: boolean;
}
export const NavbarItem: React.FC<INavbar> = ({ label, Icon, isActive }) => {
  return (
    <div
      className={`flex items-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer ${
        isActive
          ? "border-b-slate-800 text-slate-800"
          : "border-transparent text-slate-500"
      }`}
    >
      <Icon size={24} />
      <div className="text-sm">{label}</div>
    </div>
  );
};
