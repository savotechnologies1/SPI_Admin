import { useForm } from "react-hook-form";
import { FaChevronRight } from "react-icons/fa";
import logo from "../../assets/logo.png";
import setting from "../../assets/settings_icon.png";
import { NavLink, useNavigate } from "react-router-dom";

const StationLogin = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    alert("Form submitted!");
  };

  const navigate = useNavigate();

  const RunSchedule = () => {
    navigate("/run-schedule");
  };
  const RunWithScrap = () => {
    navigate("/run-with-scan");
  };
  const Training = () => {
    navigate("/training");
  };

  return (
    <>
      <div className="bg-[#F5F6FA]">
        <div className="justify-between flex flex-row items-center">
          <div>
            <img className="w-[126px]" src={logo} alt="" />
          </div>
          <div className="flex items-center gap-2">
            <img src={setting} alt="" />
            <p className="font-semibold text-sm">Need Help?</p>
          </div>
        </div>
        <div className="min-h-screen  flex items-center justify-center">
          <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-6">
              Station / Process Login
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Station */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Station
                </label>
                <select
                  {...register("station", { required: true })}
                  className="w-full mt-1 p-3 border rounded-md"
                >
                  <option value="">Select Process Name</option>
                  <option value="Cut Trim">Cut Trim</option>
                  <option value="Inspection">Inspection</option>
                  <option value="Packaging">Packaging</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <select
                  {...register("name", { required: true })}
                  className="w-full mt-1 p-3 border rounded-md"
                >
                  <option value="">No Selection</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Alice Brown">Alice Brown</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={RunSchedule}
                  className="w-full bg-brand text-white py-2 rounded-md  transition"
                >
                  Run Schedule
                </button>

                <div className="flex justify-between ">
                  <button
                    onClick={RunWithScrap}
                    type="button"
                    className="w-full bg-gradient-to-r from-[#5BE49B] to-[#00A76F] text-white py-2  rounded-md  transition"
                  >
                    Run With Scan
                  </button>

                  <button
                    onClick={Training}
                    type="button"
                    className="w-full bg-gradient-to-r from-[#FFAC82] to-[#FF5630] text-white py-2 rounded-md  transition ml-2"
                  >
                    Training
                  </button>
                </div>
                <NavLink to="/scrap-entry">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center border border-gray-300 py-2 mt-6 rounded-md hover:bg-gray-100 transition font-bold"
                  >
                    Scrap Entry <FaChevronRight className="ml-2 " />
                  </button>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StationLogin;
