import Chart from "./Chart";
import OrderStatus from "./OrderStatus";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../redux/profileSlice";
import { dashBoardData } from "./https/dashboardApi";
import Productivity from "./Productivity";
import DashboardCards from "./DashBoardCard";
import { AppDispatch } from "../../redux/store";

interface ProductivityItem {
  process: string;
  machineName: string;
  completedPartCost: number;
  cycleTime: number;
  totalQty: number;
  scrapQuantity: number;
  productivity: number;
  efficiency: number;
}

interface OrderItem {
  date: string;
  orderNo: string;
  firstName: string;
  lastName: string;
  product?: string;
  qty: number;
}

interface OrderList {
  total: number;
  list: OrderItem[];
}

interface DashboardDetailsData {
  productivityData: ProductivityItem[];
  openOrders?: OrderList;
  fulfilledOrders?: OrderList;
}

const DasboardDetails = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [dashboardDetails, setDashboardDetails] =
    useState<DashboardDetailsData | null>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [selectedMonthForApi, setSelectedMonthForApi] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const profile: any = useSelector((state: any) => state.profile.data);
  const apiUrl = import.meta.env.VITE_SERVER_URL;
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const dashboardApi = async (month: string) => {
    try {
      const data = await dashBoardData(month);
      setDashboardDetails(data as DashboardDetailsData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    dashboardApi(selectedMonthForApi);
    if (profile?.profileImg) {
      const imageUrl = `${apiUrl}/uploads/profileImg/${profile.profileImg}`;
      setPhoto(imageUrl);
      setProfileImg(profile.profileImg);
    }
  }, [profile, selectedMonthForApi]);

  const handleMonthChangeFromChild = (month: string) => {
    setSelectedMonthForApi(month);
  };

  if (!dashboardDetails) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-4 mt-5">
      <h1 className="text-xl font-semibold mt-4">Welcome back, Admin👋</h1>
      <DashboardCards dashboardDetails={dashboardDetails} />
      <div className="py-4">
        <div className=" mt-8 bg-gray-100 w-full">
          <Chart />
        </div>

        <div className="py-8  "></div>
        <Productivity productivity={dashboardDetails.productivityData} />
        <div className="py-4">
          <OrderStatus
            orders={dashboardDetails}
            onMonthChange={handleMonthChangeFromChild}
          />
        </div>
      </div>
    </div>
  );
};

export default DasboardDetails;
