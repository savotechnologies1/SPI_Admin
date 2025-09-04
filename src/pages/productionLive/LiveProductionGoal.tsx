// import img1 from "../../assets/green.png";
// import img2 from "../../assets/yellow.png";
// import img3 from "../../assets/orange.png";
// import PieChart from "./PieChart";
// import Thermoforming from "./Thermoforming";
// import CutTrim from "./Cut$Trim";
// import Sanding from "./Sanding";
// import Inspection from "./Inspection";
// import shape_1 from "../../assets/shape_1.png";
// import shape_2 from "../../assets/shape_2.png";
// import shape_3 from "../../assets/shape_3.png";
// import ProcessTable from "./Cut$Trim";
// const data_1 = [
//   {
//     num: "1",
//     text: "shift",
//     img: img1,
//     shape: shape_1,
//   },
//   {
//     num: "129",
//     text: "Actual",
//     img: img2,
//     shape: shape_2,
//   },
//   {
//     num: "1",
//     text: "Scrap",
//     img: img3,
//     shape: shape_3,
//   },
// ];

// const LiveProductionGoal = () => {
//   return (
//     <div className="p-4 mt-5">
//       <div className="flex justify-between w-full  gap-4">
//         <div className="xl:w-[70%] flex flex-col justify-between ">
//           <div>
//             <h1 className="font-bold text-2xl mt-4">
//               Live Production Goal Board
//             </h1>
//           </div>
//           <div>
//             <h1>Hour By Hour</h1>
//             <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
//               {data_1.map((item) => (
//                 <div className="flex justify-between items-center bg-white  rounded-md w-full">
//                   <div className="p-2">
//                     <p className="font-bold text-2xl">{item.num}</p>
//                     <p>{item.text}</p>
//                   </div>
//                   <div className="relative right-0">
//                     <img src={item.shape} alt="" />
//                     <div className="absolute right-4 top-6">
//                       <img src={item.img} alt="" />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="xl:w-[30%] ">
//           <PieChart />
//         </div>
//       </div>

//       <div className="grid gird-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
//         <div className="bg-white">
//           <ProcessTable />
//         </div>
//         <div className="bg-white">
//           <ProcessTable />
//         </div>
//         <div className="bg-white">
//           <ProcessTable />
//         </div>
//         <div className="bg-white">
//           <ProcessTable />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveProductionGoal;

// LiveProductionGoal.jsx
import img1 from "../../assets/green.png";
import img2 from "../../assets/yellow.png";
import img3 from "../../assets/orange.png";
import PieChart from "./PieChart";
import Thermoforming from "./Thermoforming";
import CutTrim from "./Cut$Trim";
import Sanding from "./Sanding";
import Inspection from "./Inspection";
import shape_1 from "../../assets/shape_1.png";
import shape_2 from "../../assets/shape_2.png";
import shape_3 from "../../assets/shape_3.png";
import ProcessTable from "./Cut$Trim";
import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_SERVER_URL;
const LiveProductionGoal = () => {
  const [overviewData, setOverviewData] = useState({
    hourByHour: [],
    pieChartData: [],
  });
  const [processTablesData, setProcessTablesData] = useState([]);

  useEffect(() => {
    // Fetch overview data
    fetch(`${BASE_URL}/api/admin/production/overview`)
      .then((res) => res.json())
      .then((data) => setOverviewData(data))
      .catch((error) => console.error("Error fetching overview:", error));

    // Fetch hourly process data
    fetch(`${BASE_URL}/api/admin/production/processes/hourly`)
      .then((res) => res.json())
      .then((data) => setProcessTablesData(data))
      .catch((error) => console.error("Error fetching process data:", error));
  }, []);

  console.log("2222222222222222", processTablesData);
  return (
    <div className="p-4 mt-5">
      <div className="flex justify-between w-full gap-4">
        <div className="xl:w-[70%] flex flex-col justify-between ">
          <div>
            <h1 className="font-bold text-2xl mt-4">
              Live Production Goal Board
            </h1>
          </div>
          <div>
            <h1>Hour By Hour</h1>
            <div className="flex flex-col md:flex-row mt-2 gap-4">
              {overviewData.hourByHour.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white rounded-md w-full"
                >
                  <div className="p-2">
                    <p className="font-bold text-2xl">{item.value}</p>
                    <p>{item.label}</p>
                  </div>
                  {/* You'll need to map your image assets based on item.image or a type */}
                  <div className="relative right-0">
                    {/* Placeholder for shape/image - you'll need to handle these based on your API */}
                    <img src={`/assets/${item.image}`} alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="xl:w-[30%]">
          <PieChart data={overviewData.pieChartData} />
        </div>
      </div>

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

export default LiveProductionGoal;
