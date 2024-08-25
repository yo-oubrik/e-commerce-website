interface IHeading {
  title: string;
}
export const Heading: React.FC<IHeading> = ({ title }) => {
  return (
    <div>
      <h2 className="text-center text-2xl mb-7">{title}</h2>
    </div>
  );
};
