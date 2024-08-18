import { time } from "console";
import { IconType } from "react-icons";

interface IActionBtn {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const ActionBtn: React.FC<IActionBtn> = ({
  icon: Icon,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`border-slate-400 text-slate-700 border size-7 rounded-md grid place-content-center ${
        disabled ? "opacity-80 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon size={20} />
    </button>
  );
};
