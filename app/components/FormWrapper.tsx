interface IFormWrapper {
  children: React.ReactNode;
}

const FormWrapper: React.FC<IFormWrapper> = ({ children }) => {
  return (
    <div
      className={`max-w-[550px]
     w-full
     rounded-md
     p-4
     md:p-6
     flex
     flex-col
     gap-4
     items-center
     shadow-lg
     shadow-slate-200
     border-2
     border-slate-700
     `}
    >
      {children}
    </div>
  );
};

export default FormWrapper;
