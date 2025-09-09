import img1 from "../../assets/green.png";
import img2 from "../../assets/yellow.png";
import img3 from "../../assets/orange.png";
import scrap_1 from "../../assets/scrap_1.png";
import scrap_2 from "../../assets/scrap_2.png";
import scrap_3 from "../../assets/scrap_3.png";
import scrap_cost from "../../assets/scrap_cost.png";
import customer_return from "../../assets/customer_return.png";
import supplier_return from "../../assets/supplier_return.png";

import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);
const data_1 = [
  {
    num: "$5,00,000",
    text: "Scrap Cost",
    img: img1,
    scrap: scrap_1,
    scrap_img: scrap_cost,
    increase: "-$10k",
    bgColor: "bg-orange-50",
    textColor: "text-red-500",
  },
  // {
  //   num: "01",
  //   text: "Customer Return",
  //   img: img2,
  //   scrap: scrap_2,
  //   scrap_img: customer_return,
  //   increase: "+200",
  //   bgColor: "bg-green-50",
  //   textColor: "text-green-500",
  // },
  {
    num: "$5,00,000",
    text: "Scrap Cost",
    img: img1,
    scrap: scrap_1,
    scrap_img: scrap_cost,
    increase: "-$10k",
    bgColor: "bg-orange-50",
    textColor: "text-red-500",
  },
  {
    num: "15,000",
    text: "Supplier Return",
    img: img3,
    scrap: scrap_3,
    scrap_img: supplier_return,
    increase: "+200",
    bgColor: "bg-blue-50",
    textColor: "text-green-500",
  },
];

// const Production = () => {
//   const [chartData, setChartData] = useState<
//     { processName: string; efficiency: number }[]
//   >([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8080/api/admin/production-efficiency"
//         );
//         setChartData(res.data.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);

//   const data = {
//     labels: chartData.map((item) => item.processName),
//     datasets: [
//       {
//         label: "Production Efficiency (%)",
//         data: chartData.map((item) => item.efficiency),
//         borderColor: "#052C89",
//         fill: true,
//         backgroundColor: "rgba(5, 44, 137, 0.1)",
//         pointBackgroundColor: "#052C89",
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: (context: { raw: unknown }) => `${context.raw}%`,
//         },
//       },
//       legend: { display: false },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//         ticks: {
//           stepSize: 20,
//           callback: (value: unknown) => `${value}%`,
//         },
//       },
//     },
//   };
//   console.log("datadata", data);

//   return (
//     <div className="">
//       <div className="mt-6">
//         <h1 className="font-semibold text-2xl">Production</h1>
//         <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
//           {data_1.map((item) => (
//             <div className="flex flex-col justify-between  bg-white  rounded-md w-full p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]">
//               {" "}
//               <div className="flex items-center gap-2">
//                 <div>
//                   <img className="w-[40px]" src={item.scrap_img} alt="" />
//                 </div>
//                 <div className="">
//                   {" "}
//                   <p className="text-sm text-gray-600">{item.text}</p>
//                   <p className="font-bold text-xl">{item.num}</p>
//                 </div>
//               </div>
//               <div>
//                 <img src={item.scrap} alt="" />
//               </div>
//               <div className="text-sm text-gray-600">
//                 Increase by{" "}
//                 <span
//                   className={`font-semibold rounded-md text-xs  ${item.textColor} ${item.bgColor}`}
//                 >
//                   {" "}
//                   {item.increase}
//                 </span>{" "}
//                 this week
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="p-6 bg-white shadow-md rounded-lg w-full">
//         <h2 className="text-xl font-semibold mb-4">
//           Production Efficiency by Process
//         </h2>
//         <div className="w-full h-64 md:h-80 lg:h-96">
//           <Line data={data} options={options} />
//         </div>
//       </div>
//       {/* <div className="mt-6">
//         {" "}
//         <div className="bg-white shadow-md rounded-2xl p-4">
//           <h2 className="text-lg font-medium mb-2">Vac Prestrech by Time </h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={output}>
//               <CartesianGrid stroke="#e0e0e0" />
//               <XAxis dataKey="name" fontSize={10} />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line
//                 dataKey="2022"
//                 stroke="#8884d8"
//                 strokeWidth={2}
//                 dot={{ r: 4 }}
//               />
//               <Line
//                 dataKey="2023"
//                 stroke="#ff6b6b"
//                 strokeWidth={2}
//                 dot={{ r: 4 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div> */}
//       {/*
//       <div className=" mt-6  ">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white shadow-md rounded-2xl p-4">
//             <h2 className="text-lg font-medium mb-2">Forming Temp by Time</h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={forming}>
//                 <CartesianGrid stroke="#e0e0e0" />
//                 <XAxis dataKey="name" fontSize={10} />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line
//                   type="bumpX"
//                   dataKey="2022"
//                   stroke="#8884d8"
//                   strokeWidth={2}
//                   dot={{ r: 4 }}
//                 />
//                 <Line
//                   type="bumpX"
//                   dataKey="2023"
//                   stroke="#ff6b6b"
//                   strokeWidth={2}
//                   dot={{ r: 4 }}
//                 />
//                 <Line
//                   type="bumpX"
//                   dataKey="2024"
//                   stroke="#00bcd4"
//                   strokeWidth={2}
//                   dot={{ r: 4 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="bg-white shadow-md rounded-2xl p-4">
//             <h2 className="text-lg font-medium mb-2">
//               Cooling Time & Cool Delay by Time
//             </h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={coolingTime}>
//                 <CartesianGrid stroke="#e0e0e0" />
//                 <XAxis dataKey="name" fontSize={10} />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line
//                   type="bumpX"
//                   dataKey="2022"
//                   stroke="#8884d8"
//                   strokeWidth={2}
//                   dot={{ r: 4 }}
//                 />
//                 <Line
//                   type="bumpX"
//                   dataKey="2023"
//                   stroke="#ff6b6b"
//                   strokeWidth={2}
//                   dot={{ r: 4 }}
//                 />
//                 <Line
//                   type="bumpX"
//                   dataKey="2024"
//                   stroke="#00bcd4"
//                   strokeWidth={2}
//                   dot={{ r: 4 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default Production;

const Production = () => {
  const [chartData, setChartData] = useState<
    { processName: string; efficiency: number }[]
  >([]);
  const [totals, setTotals] = useState<{
    totalEfficiency: number;
    totalScrapCost: number;
    totalSupplierReturnCost: number;
  }>({ totalEfficiency: 0, totalScrapCost: 0, totalSupplierReturnCost: 0 });
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/admin/production-efficiency`
        );
        setChartData(res.data.data);
        setTotals(res.data.totals); // set totals for display
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: chartData.map((item) => item.processName),
    datasets: [
      {
        label: "Production Efficiency (%)",
        data: chartData.map((item) => item.efficiency),
        borderColor: "#052C89",
        fill: true,
        backgroundColor: "rgba(5, 44, 137, 0.1)",
        yAxisID: "y1",
        pointBackgroundColor: "#052C89",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: { dataset: any; raw: any }) => {
            if (context.dataset.label === "Production Efficiency (%)") {
              return `${context.raw}%`;
            }
            return `₹${context.raw}`;
          },
        },
      },
      legend: { display: true },
    },
    scales: {
      y1: {
        type: "linear",
        position: "left",
        beginAtZero: true,
        max: 100,
        ticks: { callback: (value: any) => `${value}%` },
        title: { display: true, text: "Efficiency (%)" },
      },
    },
  };
  console.log("optionsoptions", options);

  // Data cards for totals
  const totalsCards = [
    {
      text: "Total Efficiency",
      num: `${totals.totalEfficiency}%`,
      scrap_img: "/icons/efficiency.png",
    },
    {
      text: "Total Scrap Cost",
      num: `₹${totals.totalScrapCost}`,
      scrap_img: "/icons/scrap.png",
    },
    {
      text: "Total Supplier Return",
      num: `₹${totals.totalSupplierReturnCost}`,
      scrap_img: "/icons/return.png",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="font-semibold text-2xl mb-4">Production</h1>

      {/* Totals Cards */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {totalsCards.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between bg-white rounded-md w-full p-4 shadow-md"
          >
            <div className="flex items-center gap-2">
              <img className="w-10" src={item.scrap_img} alt="" />
              <div>
                <p className="text-sm text-gray-600">{item.text}</p>
                <p className="font-bold text-xl">{item.num}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="p-6 bg-white shadow-md rounded-lg w-full">
        <h2 className="text-xl font-semibold mb-4">
          Production Efficiency by Process
        </h2>
        <div className="w-full h-64 md:h-80 lg:h-96">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Production;
