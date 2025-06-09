import React, { ReactNode } from "react";

interface TableCardProps {
  title: string;
  children: ReactNode;
}

const TableCard: React.FC<TableCardProps> = ({ title, children }) => (
  <div className="bg-white rounded-2xl p-4 w-full">
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    {children}
  </div>
);

export default TableCard;
