import DataTable from "./DataTable";
import TableCard from "./TableCard";

const sampleData = [
  {
    Date: "25/02/2025",
    Order: "159678",
    Qty: "01",
    "First Name": "Jerome",
    "Last Name": "McCoy",
    "Product Qty": "0",
  },
  {
    Date: "25/02/2025",
    Order: "159678",
    Qty: "01",
    "First Name": "McCoy",
    "Last Name": "diann",

    "Product Qty": "0",
  },
  {
    Date: "25/02/2025",
    Order: "159678",
    Qty: "01",
    "First Name": "Black",
    "Last Name": "diann",

    "Product Qty": "0",
  },
  {
    Date: "25/02/2025",
    Order: "159678",
    Qty: "01",
    "First Name": "McCoy",
    "Last Name": "diann",

    "Product Qty": "0",
  },
];

const columnsManual = [
  "Date",
  "Order",
  "First Name",
  "Last Name",
  "Product Qty",
  "Qty",
];

const Tables = () => {
  const tableList = [
    { title: "Income Statement", columns: columnsManual, data: sampleData },
    { title: "Cash Flow ", columns: columnsManual, data: sampleData },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      {tableList.map((table, i) => (
        <TableCard key={i} title={table.title}>
          <DataTable columns={table.columns} data={table.data} />
        </TableCard>
      ))}
    </div>
  );
};

export default Tables;
