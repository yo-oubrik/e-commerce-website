"use client";
interface IBackDrop {
  onClick: (params: any) => void;
}
const BackDrop: React.FC<IBackDrop> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="z-40 bg-slate-200 opacity-50 w-screen h-screen fixed top-0 left-0"
    ></div>
  );
};

export default BackDrop;
