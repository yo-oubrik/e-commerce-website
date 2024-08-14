"use client";
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
      className={`flex flex-col gap-2 p-4 border-2 hover:text-slate-800 transition cursor-pointer 
        items-center
        ${
          isActive
            ? "border-slate-800 text-slate-800"
            : "border-transparent text-slate-600"
        }
        rounded-md
        `}
      onClick={onClick}
    >
      <Icon size={32} />
      <p>{label}</p>
    </div>
  );
};
