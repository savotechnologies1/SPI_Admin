// import DataTable from "./DataTable";
// import TableCard from "./TableCard";

// const sampleData = [
//   {
//     Date: "25/02/2025",
//     Order: "159678",
//     Qty: "01",
//     "First Name": "Jerome",
//     "Last Name": "McCoy",
//     "Product Qty": "0",
//   },
//   {
//     Date: "25/02/2025",
//     Order: "159678",
//     Qty: "01",
//     "First Name": "McCoy",
//     "Last Name": "diann",

//     "Product Qty": "0",
//   },
//   {
//     Date: "25/02/2025",
//     Order: "159678",
//     Qty: "01",
//     "First Name": "Black",
//     "Last Name": "diann",

//     "Product Qty": "0",
//   },
//   {
//     Date: "25/02/2025",
//     Order: "159678",
//     Qty: "01",
//     "First Name": "McCoy",
//     "Last Name": "diann",

//     "Product Qty": "0",
//   },
// ];

// const columnsManual = [
//   "Date",
//   "Order",
//   "First Name",
//   "Last Name",
//   "Product Qty",
//   "Qty",
// ];

// const Tables = () => {
//   const tableList = [
//     { title: "Income Statement", columns: columnsManual, data: sampleData },
//     { title: "Cash Flow ", columns: columnsManual, data: sampleData },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
//       {tableList.map((table, i) => (
//         <TableCard key={i} title={table.title}>
//           <DataTable columns={table.columns} data={table.data} />
//         </TableCard>
//       ))}
//     </div>
//   );
// };

// export default Tables;

// const Tables = ({ metrics }) => {
//   if (!metrics) return null;

//   /* ================= Income Statement ================= */
//   const incomeStatementData = [
//     {
//       Label: "Revenue",
//       Amount: `$${metrics.totalRevenue}`,
//     },
//     {
//       Label: "Operating Expenses",
//       Amount: `$${metrics.totalCOGS}`,
//     },
//     {
//       Label: "COGS",
//       Amount: `$${metrics.totalCOGS}`,
//     },
//     {
//       Label: "Fixed Cost",
//       Amount: `$${metrics.totalFixedCost}`,
//     },
//     {
//       Label: "Profit",
//       Amount: `$${metrics.Profit}`,
//     },
//   ];

//   /* ================= Cash Flow ================= */
//   const cashFlowData = [
//     {
//       Label: "Cash Flow",
//       Amount: `$${metrics.cashFlow}`,
//     },
//     {
//       Label: "Inventory Cost",
//       Amount: `$${metrics.InventoryCost}`,
//     },
//     {
//       Label: "Scrap Cost",
//       Amount: `$${metrics.scrapCost}`,
//     },
//     {
//       Label: "Supplier Return Cost",
//       Amount: `$${metrics.supplierReturn}`,
//     },
//   ];

//   const columns = ["Label", "Amount"];

//   const tableList = [
//     {
//       title: "Income Statement",
//       columns,
//       data: incomeStatementData,
//     },
//     {
//       title: "Cash Flow",
//       columns,
//       data: cashFlowData,
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
//       {tableList.map((table, i) => (
//         <TableCard key={i} title={table.title}>
//           <DataTable columns={table.columns} data={table.data} />
//         </TableCard>
//       ))}
//     </div>
//   );
// };

// export default Tables;

const Tables = ({ metrics }) => {
  if (!metrics) return null;

  // Helper to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Helper component for the bold number blocks
  const StatBlock = ({ label, amount, isTotal = false }) => (
    <div className="mb-6">
      <div
        className={`font-bold text-gray-800 ${
          isTotal ? "text-3xl" : "text-2xl"
        }`}
      >
        {formatCurrency(amount)}
      </div>
      <div className="text-sm font-semibold text-gray-500 mt-1">{label}</div>
    </div>
  );

  // Helper component for the breakdown lists (lower half of image)
  const BreakdownItem = ({ label, amount, isHeader = false }) => (
    <div className={`mb-4 ${isHeader ? "" : "pl-0"}`}>
      {/* Value */}
      <div
        className={`text-gray-800 ${
          isHeader ? "text-2xl font-bold" : "text-xl font-bold text-gray-700"
        }`}
      >
        {formatCurrency(amount)}
      </div>
      {/* Label */}
      <div
        className={`text-xs uppercase tracking-wide mt-1 ${
          isHeader ? "font-bold text-gray-600" : "font-semibold text-gray-400"
        }`}
      >
        {label}
      </div>
    </div>
  );

  // Calculations based on Image Formulas
  // Operating expenses = Total COGS + Fixed cost
  const calculatedOpExp =
    (metrics.totalCOGS || 0) + (metrics.totalFixedCost || 0);

  return (
    <div className="flex flex-col h-full">
      {/* === Top Section: Income Statement & Cash Flow === */}
      <div className="flex flex-col md:flex-row w-full mb-12 relative">
        {/* Left: Income Statement */}
        <div className="w-full md:w-1/2 pr-8">
          <h2 className="text-blue-500 font-bold text-lg mb-6">
            Income Statement
          </h2>

          <StatBlock
            amount={metrics.totalRevenue || 0}
            label="Revenue"
            isTotal={true}
          />

          <StatBlock amount={calculatedOpExp} label="Operating Expense" />

          <StatBlock amount={metrics.Profit || 0} label="Profit" />
        </div>

        {/* Vertical Divider (visual only) */}
        {/* <div className="hidden md:block absolute left-1/2 top-10 bottom-0 border-l border-gray-300"></div> */}

        {/* Right: Cash Flow */}
        <div className="w-full md:w-1/2 md:pl-12 mt-8 md:mt-0 border-l border-gray-200 border-dashed">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full border-2 border-gray-400"></div>
            <div className="w-3 h-3 rounded-full border-2 border-gray-400 -ml-1"></div>
            <h2 className="text-blue-500 font-bold text-lg ml-2">Cash Flow</h2>
          </div>

          <StatBlock amount={metrics.Profit || 0} label="Profit" />
          <StatBlock
            amount={metrics.InventoryCost || 0}
            label="Inventory cost"
          />
          <StatBlock amount={metrics.totalFixedCost || 0} label="Fixed cost" />
        </div>
      </div>

      {/* === Bottom Section: Breakdowns === */}
      <div className="flex flex-col md:flex-row w-full mt-4 pt-8 border-t border-gray-200">
        {/* Left: Operating Expense Breakdown */}
        <div className="w-full md:w-1/2 pr-8">
          <h3 className="font-bold text-gray-800 text-lg mb-4">
            Operating Expense
          </h3>

          <div className="space-y-6">
            {/* Main Header Value */}
            <BreakdownItem
              amount={calculatedOpExp}
              label="Operating Expense"
              isHeader={true}
            />

            {/* Sub Values */}
            <BreakdownItem amount={metrics.totalCOGS || 0} label="COGS" />
            <BreakdownItem
              amount={metrics.totalFixedCost || 0}
              label="Fixed Cost"
            />
          </div>
        </div>

        {/* Right: COGS Breakdown */}
        <div className="w-full md:w-1/2 md:pl-12 mt-8 md:mt-0">
          <h3 className="font-bold text-gray-800 text-lg mb-4">COGS</h3>

          <div className="space-y-6">
            {/* Main Header Value */}
            <BreakdownItem
              amount={metrics.totalCOGS || 0}
              label="COGS"
              isHeader={true}
            />

            {/* Sub Values */}
            <BreakdownItem amount={metrics.bomCost || 0} label="BOM COST" />
            <BreakdownItem amount={metrics.scrapCost || 0} label="Scrap Cost" />
            <BreakdownItem amount={metrics.laborCost || 0} label="Labor Cost" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;
