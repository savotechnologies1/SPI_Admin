import { MdLogout } from "react-icons/md";
import cloud from "../../assets/cloud_done.png";
import { useNavigate } from "react-router-dom";

const StationLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/station-login");
  };
  return (
    <>
      <div className="bg-[#F5F6FA] h-screen">
        <div className="p-4 ">
          <div className="bg-white shadow-sm rounded-lg p-8 w-full  flex flex-col space-y-6 items-center ">
            <img src={cloud} alt="" />

            <p className="font-semibold text-lg">Porcess Station Logout</p>

            <div>
              <button
                onClick={handleLogout}
                className="bg-brand p-2 flex gap-2 items-center"
              >
                <MdLogout color="white" />

                <p className="text-sm text-white">End the job</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StationLogout;
