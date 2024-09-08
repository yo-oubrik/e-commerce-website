import { IconType } from "react-icons";

interface ICategory {
  label: string;
  Icon: IconType;
  isActive: boolean;
  onClick: () => void;
}

export const Category: React.FC<ICategory> = ({
  label,
  Icon,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`flex items-center gap-2 p-3 hover:text-slate-800 transition cursor-pointer ${
        isActive ? "text-slate-800" : "text-slate-500"
      }`}
      onClick={onClick}
    >
      <Icon size={24} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};
