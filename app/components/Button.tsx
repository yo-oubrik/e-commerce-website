import React from "react";
import { IconType } from "react-icons";

interface IButton {
  label: string;
  disabled?: boolean;
  small?: boolean;
  Icon?: IconType;
  customClass?: string;
  outline?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button: React.FC<IButton> = ({
  label,
  disabled,
  small,
  Icon,
  customClass,
  outline,
  onClick,
}) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 w-full rounded-md  ${
        outline ? "bg-white" : "bg-slate-700"
      } transition hover:opacity-80
        ${outline && "border-slate-700 border-2"} ${
        outline ? "text-slate-700" : "text-white"
      }
        ${disabled ? "opacity-80 cursor-not-allowed" : ""} ${
        small ? "text-sm font-light p-1" : "text-md font-semibold py-3"
      } ${customClass ? customClass : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={26} />}
      {label}
    </button>
  );
};

export default Button;
