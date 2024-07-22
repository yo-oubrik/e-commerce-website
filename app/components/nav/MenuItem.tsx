"use client";
interface IMenuItem {
  onClick: (params: any) => void;
  customClass?: string;
  children: React.ReactNode;
}
const MenuItem: React.FC<IMenuItem> = ({ customClass, onClick, children }) => {
  return (
    <li
      onClick={onClick}
      className={`p-3 transition hover:bg-slate-50 ${
        customClass ? customClass : ""
      }`}
    >
      {children}
    </li>
  );
};

export default MenuItem;
