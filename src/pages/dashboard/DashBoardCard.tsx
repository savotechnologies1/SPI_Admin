import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

const DashboardCards = ({ dashboardDetails }: { dashboardDetails: any }) => {
  if (!dashboardDetails) return <p>Loading...</p>;
  const Card = ({
    title,
    value,
    subValue,
    change,
    indicatorColor,
  }: {
    title: string;
    value: string | number;
    subValue?: string;
    change?: number | string;
    indicatorColor?: string;
  }) => {
    const isPositive = indicatorColor === "green";
    const isNegative = indicatorColor === "red";
    const isNeutral = indicatorColor === "gray";

    return (
      <div className="bg-white p-5 rounded-2xl shadow-md flex flex-col gap-2 mt-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="text-2xl font-bold">{value}</div>
        {subValue && <div className="text-sm text-gray-500">{subValue}</div>}
        {change !== undefined && (
          <div className="flex items-center gap-2">
            {!isNeutral &&
              (isPositive ? (
                <ArrowUpCircle className="text-green-500" />
              ) : (
                <ArrowDownCircle className="text-red-500" />
              ))}
            <span
              className={`text-sm font-medium ${
                isPositive
                  ? "text-green-600"
                  : isNegative
                    ? "text-red-600"
                    : "text-gray-500"
              }`}
            >
              {change}%
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card
        title="Total Orders"
        value={dashboardDetails.totalOrders}
        subValue="(Stock + Custom Orders)"
        change={dashboardDetails.revenueChangePercent}
        indicatorColor={dashboardDetails.revenueIndicator}
      />
      <Card
        title="Inventory"
        value={`$${dashboardDetails.inventory.totalInventoryCost}`}
        subValue={`Total Items: ${dashboardDetails.inventory.totalInventoryCount}`}
        change={dashboardDetails.inventory.inventoryChangePercent}
        indicatorColor={dashboardDetails.inventory.inventoryIndicator}
      />
      <Card
        title="Production Quantity"
        value={`${dashboardDetails.production.currentProductionTotal}`}
        subValue={`Last Month: ${dashboardDetails.production.lastProductionTotal}`}
        change={dashboardDetails.production.productionChangePercent}
        indicatorColor={dashboardDetails.production.productionIndicator}
      />
      <Card
        title="Scrap"
        value={`$${dashboardDetails.scrap.currentScrapCost}`}
        subValue={`Last Month: $ ${dashboardDetails.scrap.lastScrapCost}`}
        change={dashboardDetails.scrap.scrapChangePercent}
        indicatorColor={dashboardDetails.scrap.scrapIndicator}
      />
    </div>
  );
};

export default DashboardCards;
