import { IconType } from "react-icons";

interface IActionBtn {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  title?: string;
}

export const ActionBtn: React.FC<IActionBtn> = ({
  icon: Icon,
  onClick,
  disabled,
  title,
}) => {
  return (
    <button
      className={`border-slate-400 text-slate-700 border size-7 rounded-md grid place-content-center ${
        disabled ? "opacity-80 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      <Icon size={20} />
    </button>
  );
};
