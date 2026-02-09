import Chart from "./Chart";
import OrderStatus from "./OrderStatus";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../redux/profileSlice";
import { useNavigate } from "react-router-dom";
import { dashBoardData } from "./https/dashboardApi";
import Productivity from "./Productivity";
import DashboardCards from "./DashBoardCard";

const DasboardDetails = () => {
  const [photo, setPhoto] = useState(null);
  const [dashboardDetails, setDashboardDetails] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [selectedMonthForApi, setSelectedMonthForApi] = useState("");
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const apiUrl = import.meta.env.VITE_SERVER_URL;
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const dashboardApi = async (month) => {
    try {
      const data = await dashBoardData(month);
      setDashboardDetails(data);
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

  const handleMonthChangeFromChild = (month) => {
    setSelectedMonthForApi(month);
  };
  console.log("dashboardDetailsdashboardDetails", dashboardDetails);

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
