import Chart from "./Chart";
import Card from "./Card";
import icon1 from "../../assets/icon_1.png";
import icon2 from "../../assets/icon_2.png";
import icon3 from "../../assets/icon_3.png";
import icon4 from "../../assets/icon_4.png";
import overlay2 from "../../assets/Overlay_2.png";
import overlay21 from "../../assets/Overlay_21.png";
import overlay3 from "../../assets/Overlay_3.png";
import overlay31 from "../../assets/Overlay_31.png";
import overlay4 from "../../assets/Overlay_4.png";
import overlay41 from "../../assets/Overlay_41.png";
import TopSuppliers from "./TopSuppliers";
import NewEmployees from "./NewEmployees";
import OrderStatus from "./OrderStatus";
import TopPerformer from "./TopPerformer";
import ProcessTable from "./Process";

const DasboardDetails = () => {

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Welcome back, Admin👋</h1>

      <div className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 ">
          <Card
            title="Order Schedule"
            value="55+"
            img={icon1}
            bgColor="bg-green-50"
            overlay2={overlay3}
            overlay21={overlay31}
          />
          <Card
            title=" Total Supplier"
            value="320+"
            img={icon2}
            bgColor="bg-red-50"
            overlay2={overlay2}
            overlay21={overlay21}
          />
          <Card
            title="Total Production"
            value="220+"
            img={icon3}
            bgColor="bg-red-50"
            overlay2={overlay3}
            overlay21={overlay31}
          />
          <Card
            title="Production Live"
            value="50+"
            img={icon4}
            bgColor="bg-red-50"
            overlay2={overlay4}
            overlay21={overlay41}
          />
        </div>

        <div className=" mt-8 bg-gray-100 w-full">
          <Chart />
        </div>

        <div className="mt-8  p flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-[60%] bg-white rounded-xl">
            <TopSuppliers />
          </div>
          <div className="w-full lg:w-[40%] bg-white rounded-xl">
            <NewEmployees />
          </div>
        </div>

        <div className="py-8  ">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between rounded-lg   gap-20 lg:gap-4 w-full ">
            <div className="flex flex-col gap-4 w-full lg:w-[40%] p-4 py-10 bg-white  rounded-md shadow-md  ">
              {" "}
              <TopPerformer />
            </div>

            <div className="w-full  lg:w-[70%] flex lg:items-center  p-6 bg-white rounded-md shadow-md  overflow-x-auto">
              <ProcessTable />
            </div>
          </div>
        </div>

        <div className="py-4">
          <OrderStatus />
        </div>
      </div>
    </div>
  );
};

export default DasboardDetails;
