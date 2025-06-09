import DataTable from "./DataTable";
import TableCard from "./TableCard";

const sampleData = [
  {
    Process: "Inspection",
    "Part Desc.":
      "Quick Brackets for Inner Rockers -19999\n2006 Silverado/Sierra Extended Cab",
    Qty: "01",
    Scrap: "01",
  },
  {
    Process: "Inspection",
    "Part Desc.":
      "Quick Brackets for Inner Rockers -19999\n2006 Silverado/Sierra Extended Cab",
    Qty: "01",
    Scrap: "01",
  },
  {
    Process: "Inspection",
    "Part Desc.":
      "Quick Brackets for Inner Rockers -19999\n2006 Silverado/Sierra Extended Cab",
    Qty: "01",
    Scrap: "01",
  },
  {
    Process: "Inspection",
    "Part Desc.":
      "Quick Brackets for Inner Rockers -19999\n2006 Silverado/Sierra Extended Cab",
    Qty: "01",
    Scrap: "01",
  },
];

const sampleData1 = [
  {
    Process: "Inspection",
    "Part Desc.":
      "Quick Brackets for Inner Rockers -19999\n2006 Silverado/Sierra Extended Cab",
    "Cycle Time": "01",
  },
  {
    Process: "Inspection",
    "Part Desc.":
      "Quick Brackets for Inner Rockers -19999\n2006 Silverado/Sierra Extended Cab",
    "Cycle Time": "01",
  },
  {
    Process: "Inspection",
    "Part Desc.":
      "Quick Brackets for Inner Rockers -19999\n2006 Silverado/Sierra Extended Cab",
    "Cycle Time": "01",
  },
  {
    Process: "Inspection",
    "Part Desc.":
      "Quick Brackets for Inner Rockers -19999\n2006 Silverado/Sierra Extended Cab",
    "Cycle Time": "01",
  },
];
const sampleData2 = [
  {
    ID: "100",
    "Part Desc.":
      "Quick Brackets for Inner Rockers -19999\n2006 Silverado/Sierra Extended Cab",
    "Machine Timer": "01",
    "Op Timer": "01",
    "Total CT": "01",
  },
  {
    ID: "100",
    "Part Desc.":
      "Quick Brackets for Inner Rockers -19999\n2006 Silverado/Sierra Extended Cab",
    "Machine Timer": "01",
    "Op Timer": "01",
    "Total CT": "01",
  },
  {
    ID: "100",
    "Part Desc.":
      "Quick Brackets for Inner Rockers -19999\n2006 Silverado/Sierra Extended Cab",
    "Machine Timer": "01",
    "Op Timer": "01",
    "Total CT": "01",
  },
  {
    ID: "100",
    "Part Desc.":
      "Quick Brackets for Inner Rockers -19999\n2006 Silverado/Sierra Extended Cab",
    "Machine Timer": "01",
    "Op Timer": "01",
    "Total CT": "01",
  },
];

const columnsManual = ["Process", "Part Desc.", "Qty", "Scrap"];
const columnsManual1 = ["Process", "Part Desc.", "Cycle Time"];
const columnsManual2 = [
  "ID",
  "Part Desc.",
  "Machine Timer",
  "Op Timer",
  "Total CT",
];

const Monitor = () => {
  const tableList = [
    { title: "Manual", columns: columnsManual, data: sampleData },
    { title: "Machine", columns: columnsManual, data: sampleData },
    { title: "Part of Monitor", columns: columnsManual1, data: sampleData1 },
    { title: "Part of Monitor", columns: columnsManual2, data: sampleData2 },
    {
      title: "Manual Scrap & Machine Scrap by Process",
      columns: columnsManual1,
      data: sampleData1,
    },
    {
      title: "Cycle Time By Process",
      columns: columnsManual2,
      data: sampleData2,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {tableList.map((table, i) => (
        <TableCard key={i} title={table.title}>
          <DataTable columns={table.columns} data={table.data} />
        </TableCard>
      ))}
    </div>
  );
};

export default Monitor;
