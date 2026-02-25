import { NavLink } from "react-router-dom";
import img1 from "../../assets/green.png";
import img2 from "../../assets/yellow.png";
import img3 from "../../assets/orange.png";
import scrap_1 from "../../assets/scrap_1.png";
import scrap_2 from "../../assets/scrap_2.png";
import scrap_3 from "../../assets/scrap_3.png";
import scrap_cost from "../../assets/scrap_cost.png";
import customer_return from "../../assets/customer_return.png";
import supplier_return from "../../assets/supplier_return.png";
import SupplierReturn from "./SupplierReturn";
import ScrapBar from "./ScrapBar";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ReturnTable from "./ReturnTable";

interface QualityDataItem {
  processName?: string;
  machineName?: string;
  partDescription?: string;
  partNumber?: string;
  scrapQuantity: number;
  scheduleQuantity: number;
}

interface ReturnItem {
  date: string;
  customerName?: string;
  supplierName?: string;
  partNumber: string;
  quantity: number;
}

const QualityPerformance = () => {
  const [qualityData, setQualityData] = useState<QualityDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const today = new Date();
  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(today);
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const [totalData, setTotalData] = useState<number | undefined>();
  const [customerReturns, setCustomerReturns] = useState<ReturnItem[]>([]);
  const [supplierReturns, setSupplierReturns] = useState<ReturnItem[]>([]);
  const fetchQualityData = async () => {
    try {
      setLoading(true);
      let query = "";
      if (startDate && endDate) {
        query = `?startDate=${startDate.toISOString().split("T")[0]}&endDate=${
          endDate.toISOString().split("T")[0]
        }`;
      }

      const res = await fetch(
        `${BASE_URL}/api/frontLine/quality-performance-data${query}`,
      );
      const data = await res.json();
      if (data && data.data) {
        setTotalData(data.totalScrapQty);
        setQualityData(data.data);
        setCustomerReturns(data.customerScrapDetails || []);
        setSupplierReturns(data.supplierScrapDetails || []);
      }
    } catch (error) {
      console.error("Error fetching quality performance:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQualityData();
  }, [startDate, endDate]);

  if (loading) return <p>Loading...</p>;

  const data_1 = [
    {
      num: totalData ?? 0,
      text: "Scrap Cost",
      img: img1,
      scrap: scrap_1,
      scrap_img: scrap_cost,
      bgColor: "bg-orange-50",
      textColor: "text-red-500",
    },
  ];
  return (
    <div>
      <div className="p-7">
        <div>
          <h1 className="font-bold text-[20px] md:text-[24px] text-black">
            Quality Performance
          </h1>
        </div>
        <div className="flex justify-between mt-2 items-center">
          <div className="flex gap-4 items-center ">
            <p className={`text-sm  text-black font-semibold`}>
              <NavLink to={"/dashboardDetailes"}>Quality Performance :</NavLink>
            </p>

            <div className="flex items-center gap-2">
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date || today)}
                dateFormat="MM/dd/yyyy"
                className="border rounded-md p-1 text-xs"
              />
              <span>-</span>
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date || today)}
                dateFormat="MM/dd/yyyy"
                className="border rounded-md p-1 text-xs"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h1 className="font-semibold text-xl">Scrap</h1>
          <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
            {data_1.map((item) => (
              <div className="flex flex-col justify-between  bg-white  rounded-md w-full p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]">
                <div className="flex items-center gap-2">
                  <div>
                    <img className="w-[40px]" src={item.scrap_img} alt="" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{item.text}</p>
                    <p className="font-bold text-xl">{item.num}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ReturnTable
          title="Customer Return"
          data={customerReturns}
          nameLabel="Customer Name"
        />
        <ReturnTable
          title="Supplier Return"
          data={supplierReturns}
          nameLabel="Customer Name"
        />
        <div className="mt-6">
          <SupplierReturn qualityData={qualityData} />
        </div>
        <div className="mt-6 bg-white rounded-md shadow-sm">
          <ScrapBar qualityData={qualityData} />
        </div>
      </div>
    </div>
  );
};

export default QualityPerformance;
