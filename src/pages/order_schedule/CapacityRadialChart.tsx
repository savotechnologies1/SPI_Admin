import ReactApexChart from "react-apexcharts";

// const CapacityRadialChart = () => {
//   const series = [30, 50, 80];
//   const options: ApexCharts.ApexOptions = {
//     chart: {
//       type: "radialBar",
//     },
//     plotOptions: {
//       radialBar: {
//         hollow: {
//           size: "50%",
//         },
//         dataLabels: {
//           name: {
//             show: false,
//           },
//           value: {
//             fontSize: "24px",
//             color: "#000",
//             fontWeight: "bold",
//             offsetY: 10,
//           },
//           total: {
//             show: true,
//             label: "Total",
//             formatter: () => `500`,
//           },
//         },
//         track: {
//           background: "#f0f0f0",
//         },
//       },
//     },
//     labels: ["Sanding", "Inspection", "CutTrim"],
//     colors: ["#00C853", "#FFC107", "#FF5722"],
//     legend: {
//       show: true,
//       position: "bottom",
//       markers: {
//         size: 10,
//       },
//       itemMargin: {
//         horizontal: 10,
//         vertical: 5,
//       },
//     },
//   };

//   return (
//     <div className="p-6 bg-white rounded-md shadow-md">
//       <h2 className="text-lg font-semibold mb-4">Status By Process</h2>
//       <ReactApexChart
//         options={options}
//         series={series}
//         type="radialBar"
//         height={300}
//       />
//     </div>
//   );
// // };
// const CapacityRadialChart = ({ processCompletion }) => {
//   console.log('processCompletionprocessCompletionprocessCompletion',processCompletion)
//   if (!processCompletion) return null;

//   const series = processCompletion.map((p) =>
//     parseFloat(p.completionPercentage)
//   );
//   const labels = processCompletion.map((p) => p.processName);

//   // 🔹 Modern vibrant colors
//   const palette = [
//     "#1abc9c",
//     "#3498db",
//     "#9b59b6",
//     "#e67e22",
//     "#e74c3c",
//     "#f1c40f",
//     "#2ecc71",
//     "#34495e",
//     "#d35400",
//     "#8e44ad",
//   ];
//   const colors = processCompletion.map(
//     (_, index) => palette[index % palette.length]
//   );

//   const options: ApexCharts.ApexOptions = {
//     chart: { type: "radialBar" },
//     plotOptions: {
//       radialBar: {
//         hollow: { size: "50%" },
//         dataLabels: {
//           name: { fontSize: "14px", color: "#000", fontWeight: "600" },
//           value: {
//             fontSize: "20px",
//             color: "#000",
//             fontWeight: "bold",
//             offsetY: 10,
//           },
//           total: {
//             show: true,
//             label: "Average",
//             formatter: () => {
//               const totalPercent = processCompletion.reduce(
//                 (sum, p) => sum + parseFloat(p.completionPercentage),
//                 0
//               );
//               return (totalPercent / processCompletion.length).toFixed(2) + "%";
//             },
//           },
//         },
//         track: { background: "#f0f0f0" },
//       },
//     },
//     labels,
//     colors,
//     legend: {
//       show: true,
//       position: "bottom",
//       markers: { size: 10 },
//       itemMargin: { horizontal: 10, vertical: 5 },
//     },
//   };

//   return (
//     <div className="p-6 bg-white rounded-md shadow-md">
//       <h2 className="text-lg font-semibold mb-4">Status By Process</h2>
//       <ReactApexChart
//         options={options}
//         series={series}
//         type="radialBar"
//         height={300}
//       />
//     </div>
//   );
// };

// export default CapacityRadialChart;

const CapacityRadialChart = ({ processCompletion, overallAverage }) => {
  if (!processCompletion || processCompletion.length === 0) return null;

  const series = processCompletion.map((p) =>
    parseFloat(p.completionPercentage),
  );
  const labels = processCompletion.map((p) => p.processName);

  const palette = [
    "#1abc9c",
    "#3498db",
    "#9b59b6",
    "#e67e22",
    "#e74c3c",
    "#f1c40f",
    "#2ecc71",
    "#34495e",
    "#d35400",
    "#8e44ad",
  ];

  const colors = processCompletion.map(
    (_, index) => palette[index % palette.length],
  );

  const options = {
    chart: { type: "radialBar" },
    plotOptions: {
      radialBar: {
        hollow: { size: "50%" },
        dataLabels: {
          name: { fontSize: "14px", color: "#666", fontWeight: "600" },
          value: {
            fontSize: "20px",
            color: "#000",
            fontWeight: "bold",
            offsetY: 10,
          },
          total: {
            show: true,
            label: "Average",
            // 🔹 WISE CHANGE: Backend se aayi hui overallAverage use kar rahe hain
            formatter: () => {
              return parseFloat(overallAverage || 0).toFixed(2) + "%";
            },
          },
        },
        track: { background: "#f0f0f0" },
      },
    },
    labels,
    colors,
    legend: {
      show: true,
      position: "bottom",
      markers: { size: 10 },
      itemMargin: { horizontal: 10, vertical: 5 },
    },
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md h-full">
      <h2 className="text-lg font-semibold mb-4">Status By Process</h2>
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={350}
      />
    </div>
  );
};

export default CapacityRadialChart;
