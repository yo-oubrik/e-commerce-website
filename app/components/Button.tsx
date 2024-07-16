import React from "react";
import { IconType } from "react-icons";

interface IButton {
  label: string;
  disabled?: boolean;
  small?: boolean;
  Icon?: IconType;
  custom?: string;
  outline?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button: React.FC<IButton> = ({
  label,
  disabled,
  small,
  Icon,
  custom,
  outline,
  onClick,
}) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 w-full rounded-md py-3  ${
        outline ? "bg-white" : "bg-slate-700"
      } transition hover:bg-opacity-85
        ${outline && "border-slate-700 border-2"} ${
        outline ? "text-slate-700 hover:text-opacity-85" : "text-white"
      }
        ${disabled && "disabled:opacity-70 disabled:cursor-not-allowed"} ${
        small ? "text-sm font-light py-1 border" : "text-md font-semibold"
      } ${custom && custom}`}
      onClick={onClick}
    >
      {Icon && <Icon size={28} />}
      {label}
    </button>
  );
};

export default Button;
