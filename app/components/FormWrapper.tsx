const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[550px] w-full mx-auto flex flex-col gap-6 items-center shadow-md shadow-slate-200 rounded-md p-4 md:p-8">
      {children}
    </div>
  );
};

export default FormWrapper;
