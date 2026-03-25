const Tables = ({ metrics }) => {
  if (!metrics) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

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

  const BreakdownItem = ({ label, amount, isHeader = false }) => (
    <div className={`mb-4 ${isHeader ? "" : "pl-0"}`}>
      <div
        className={`text-gray-800 ${
          isHeader ? "text-2xl font-bold" : "text-xl font-bold text-gray-700"
        }`}
      >
        {formatCurrency(amount)}
      </div>
      <div
        className={`text-xs uppercase tracking-wide mt-1 ${
          isHeader ? "font-bold text-gray-600" : "font-semibold text-gray-400"
        }`}
      >
        {label}
      </div>
    </div>
  );

  const calculatedOpExp =
    (metrics.totalCOGS || 0) + (metrics.totalFixedCost || 0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row w-full mb-12 relative">
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

      <div className="flex flex-col md:flex-row w-full mt-4 pt-8 border-t border-gray-200">
        <div className="w-full md:w-1/2 pr-8">
          <h3 className="font-bold text-gray-800 text-lg mb-4">
            Operating Expense
          </h3>

          <div className="space-y-6">
            <BreakdownItem
              amount={calculatedOpExp}
              label="Operating Expense"
              isHeader={true}
            />

            <BreakdownItem amount={metrics.totalCOGS || 0} label="COGS" />
            <BreakdownItem
              amount={metrics.totalFixedCost || 0}
              label="Fixed Cost"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 md:pl-12 mt-8 md:mt-0">
          <h3 className="font-bold text-gray-800 text-lg mb-4">COGS</h3>

          <div className="space-y-6">
            <BreakdownItem
              amount={metrics.totalCOGS || 0}
              label="COGS"
              isHeader={true}
            />
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
