interface TableCardProps {
  title: string;
  children: React.ReactNode;
}

const TableCard = ({ title, children }: TableCardProps) => (
  <div className="bg-white  rounded-2xl p-4 w-full">
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    {children}
  </div>
);
export default TableCard