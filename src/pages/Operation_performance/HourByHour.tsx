// import img1 from "../../assets/green.png";
// import img2 from "../../assets/yellow.png";
// import img3 from "../../assets/orange.png";
// import scrap_1 from "../../assets/scrap_1.png";
// import scrap_2 from "../../assets/scrap_2.png";
// import scrap_3 from "../../assets/scrap_3.png";
// import scrap_cost from "../../assets/scrap_cost.png";
// import customer_return from "../../assets/customer_return.png";
// import supplier_return from "../../assets/supplier_return.png";
// import Thermoforming from "../productionLive/Thermoforming";
// import CutTrim from "../productionLive/Cut$Trim";
// import Sanding from "../productionLive/Sanding";
// import Inspection from "../productionLive/Inspection";
// const data_1 = [
//   {
//     num: "$5,00,000",
//     text: "Scrap Cost",
//     img: img1,
//     scrap: scrap_1,
//     scrap_img: scrap_cost,
//     increase: "-$10k",
//     bgColor: "bg-orange-50",
//     textColor: "text-red-500",
//   },
//   {
//     num: "01",
//     text: "Customer Return",
//     img: img2,
//     scrap: scrap_2,
//     scrap_img: customer_return,
//     increase: "+200",
//     bgColor: "bg-green-50",
//     textColor: "text-green-500",
//   },
//   {
//     num: "15,000",
//     text: "Supplier Return",
//     img: img3,
//     scrap: scrap_3,
//     scrap_img: supplier_return,
//     increase: "+200",
//     bgColor: "bg-blue-50",
//     textColor: "text-green-500",
//   },
// ];
// const HourByHour = () => {
//   return (
//     <div>
//       <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
//         {data_1.map((item) => (
//           <div className="flex flex-col justify-between  bg-white  rounded-md w-full p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]">
//             {" "}
//             <div className="flex items-center gap-2">
//               <div>
//                 <img className="w-[40px]" src={item.scrap_img} alt="" />
//               </div>
//               <div className="">
//                 {" "}
//                 <p className="text-sm text-gray-600">{item.text}</p>
//                 <p className="font-bold text-xl">{item.num}</p>
//               </div>
//             </div>
//             <div>
//               <img src={item.scrap} alt="" />
//             </div>
//             <div className="text-sm text-gray-600">
//               Increase by{" "}
//               <span
//                 className={`font-semibold rounded-md text-xs  ${item.textColor} ${item.bgColor}`}
//               >
//                 {" "}
//                 {item.increase}
//               </span>{" "}
//               this week
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid gird-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
//         <div className="bg-white">
//           <Thermoforming />
//         </div>
//         <div className="bg-white">{/* <CutTrim /> */}</div>
//         <div className="bg-white">
//           <Sanding />
//         </div>
//         <div className="bg-white">
//           <Inspection />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HourByHour;

import img1 from "../../assets/green.png";
import img2 from "../../assets/yellow.png";
import img3 from "../../assets/orange.png";
import scrap_1 from "../../assets/scrap_1.png";
import scrap_2 from "../../assets/scrap_2.png";
import scrap_3 from "../../assets/scrap_3.png";
import scrap_cost from "../../assets/scrap_cost.png";
import customer_return from "../../assets/customer_return.png";
import supplier_return from "../../assets/supplier_return.png";
import Thermoforming from "../productionLive/Thermoforming";
import CutTrim from "../productionLive/Cut$Trim";
import Sanding from "../productionLive/Sanding";
import Inspection from "../productionLive/Inspection";
import axios from "axios";
import { useEffect, useState } from "react";
import ProcessTable from "../productionLive/Cut$Trim";
const data_1 = [
  {
    num: "30",
    text: "Total Actual",
    // img: img1,
    // scrap: scrap_1,
    scrap_img: scrap_cost,
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
    num: "15",
    text: "Total Scrap",
    // img: img3,
    // scrap: scrap_3,
    scrap_img: supplier_return,
    // increase: "+200",
    bgColor: "bg-blue-50",
    textColor: "text-green-500",
  },
];
// helper: get current shift
const getShiftHours = (shift) => {
  if (shift === 1) {
    return [
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
    ];
  } else if (shift === 2) {
    return [
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
    ];
  } else {
    return [
      "22:00",
      "23:00",
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
    ];
  }
};
const HourByHour = () => {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const [overviewData, setOverviewData] = useState({
    hourByHour: [],
    pieChartData: [],
  });
  const [processTablesData, setProcessTablesData] = useState([]);
  // useEffect(() => {
  //   // Fetch overview data
  //   fetch("http://localhost:8080/api/admin/production/overview")
  //     .then((res) => res.json())
  //     .then((data) => setOverviewData(data))
  //     .catch((error) => console.error("Error fetching overview:", error));

  //   // Fetch hourly process data
  //   fetch("http://localhost:8080/api/admin/production/processes/hourly")
  //     .then((res) => res.json())
  //     .then((data) => setProcessTablesData(data))
  //     .catch((error) => console.error("Error fetching process data:", error));
  // }, []);
  const fetchData = async () => {
    const response = await axios.get(
      `${BASE_URL}/api/admin/production/overview`
    );
    console.log("responseresponse", response);
  };

  const fetcHourlyhData = async () => {
    const response = await axios.get(
      `${BASE_URL}/api/admin/production/processes/hourly`
    );
    setProcessTablesData(response.data);
  };
  useEffect(() => {
    fetchData();
    fetcHourlyhData();
  }, []);

  console.log("overviewDataoverviewData", processTablesData);
  const currentHour = new Date().getHours();
  let shift = 1;
  if (currentHour >= 6 && currentHour < 14) shift = 1;
  else if (currentHour >= 14 && currentHour < 22) shift = 2;
  else shift = 3;

  const allowedHours = getShiftHours(shift);

  // const filteredData = hourlyData.filter((item) =>
  //   allowedHours.includes(item.hour)
  // );
  return (
    <div>
      <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
        {data_1.map((item) => (
          <div className="flex flex-col justify-between  bg-white  rounded-md w-full p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]">
            {" "}
            <div className="flex items-center gap-2">
              <div>
                <img className="w-[40px]" src={item.scrap_img} alt="" />
              </div>
              <div className="">
                {" "}
                <p className="text-sm text-gray-600">{item.text}</p>
                <p className="font-bold text-xl">{item.num}</p>
              </div>
            </div>
            <div>
              <img src={item.scrap} alt="" />
            </div>
            {/* <div className="text-sm text-gray-600">
              Increase by{" "}
              <span
                className={`font-semibold rounded-md text-xs  ${item.textColor} ${item.bgColor}`}
              >
                {" "}
                {item.increase}
              </span>{" "}
              this week
            </div> */}
          </div>
        ))}
      </div>

      {/* <div className="grid gird-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        <div className="bg-white">
          <Thermoforming />
        </div>
       
        <div className="bg-white">
          <Sanding />
        </div>
        <div className="bg-white">
          <Inspection />
        </div>
      </div> */}
      <div className="grid gird-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {processTablesData.map((process, index) => (
          <div key={index} className="bg-white">
            <ProcessTable
              processName={process.processName}
              hourlyData={process.hourlyData}
              total={process.total}
              employees={process.employees}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourByHour;
