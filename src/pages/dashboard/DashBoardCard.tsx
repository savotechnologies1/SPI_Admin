// import React, { useEffect, useState } from "react";
// import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

// const DashboardCards = ({ dashboardDetails }) => {
//   const [data, setData] = useState<any>(null);

//   useEffect(() => {
//     // Dummy JSON instead of API
//     const dummyData = {
//       orderSchedule: { count: 120, percentageChange: 15.5 },
//       totalSupplier: { count: 80, percentageChange: -5.2 },
//       totalProduction: { count: 200, percentageChange: 12.8 },
//       totalScrapOrder: { count: 10, percentageChange: -8.0 },
//       scrapSummary: { qty: 25, cost: "450.00", percentageChange: 6.4 },
//     };
//     setData(dummyData);
//   }, []);

//   if (!data) return <p>Loading...</p>;

//   const Card = ({
//     title,
//     value,
//     subValue,
//     change,
//   }: {
//     title: string;
//     value: string | number;
//     subValue?: string;
//     change: number;
//   }) => (
//     <div className="bg-white p-5 rounded-2xl shadow-md flex flex-col gap-2">
//       <h3 className="text-lg font-semibold">{title}</h3>
//       <div className="text-2xl font-bold">{value}</div>
//       {subValue && <div className="text-sm text-gray-500">{subValue}</div>}
//       <div className="flex items-center gap-2">
//         {change >= 0 ? (
//           <ArrowUpCircle className="text-green-500" />
//         ) : (
//           <ArrowDownCircle className="text-red-500" />
//         )}
//         <span
//           className={`text-sm font-medium ${
//             change >= 0 ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {Math.abs(change).toFixed(2)}%
//         </span>
//       </div>
//     </div>
//   );

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//       {/* Orders & Revenue */}
//       <Card
//         title="Orders & Revenue"
//         value={data.orderSchedule.count}
//         subValue="(Stock + Custom Orders)"
//         change={data.orderSchedule.percentageChange}
//       />

//       {/* Inventory */}
//       <Card
//         title="Inventory"
//         value={data.totalSupplier.count}
//         subValue="(Total Inventory Cost)"
//         change={data.totalSupplier.percentageChange}
//       />

//       {/* Production */}
//       <Card
//         title="Production"
//         value={data.totalProduction.count}
//         subValue={`Scrap Orders: ${data.totalScrapOrder.count}`}
//         change={data.totalProduction.percentageChange}
//       />

//       {/* Scrap */}
//       <Card
//         title="Scrap"
//         value={`${data.scrapSummary.qty} pcs`}
//         subValue={`Cost: $${data.scrapSummary.cost}`}
//         change={data.scrapSummary.percentageChange}
//       />
//     </div>
//   );
// };

// export default DashboardCards;
import React from "react";
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
      {/* Total Orders */}
      <Card
        title="Total Orders"
        value={dashboardDetails.totalOrders}
        subValue="(Stock + Custom Orders)"
        change={dashboardDetails.revenueChangePercent}
        indicatorColor={dashboardDetails.revenueIndicator}
      />

      {/* Revenue */}
      {/* <Card
        title="Revenue"
        value={`$${dashboardDetails.currentRevenue}`}
        subValue="Current Month Revenue"
        change={dashboardDetails.revenueChangePercent}
        indicatorColor={dashboardDetails.revenueIndicator}
      /> */}

      {/* Inventory */}
      <Card
        title="Inventory"
        value={`$${dashboardDetails.inventory.totalInventoryCost}`}
        subValue={`Total Items: ${dashboardDetails.inventory.totalInventoryCount}`}
        change={dashboardDetails.inventory.inventoryChangePercent}
        indicatorColor={dashboardDetails.inventory.inventoryIndicator}
      />
      {/* Inventory */}
      <Card
        title="Production Quantity"
        value={`${dashboardDetails.production.currentProductionTotal}`}
        subValue={`Last Month: ${dashboardDetails.production.lastProductionTotal}`}
        change={dashboardDetails.production.productionChangePercent}
        indicatorColor={dashboardDetails.production.productionIndicator}
      />
      {/* Production */}
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
