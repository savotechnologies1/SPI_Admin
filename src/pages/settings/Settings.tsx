import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Settings = () => {
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhotoChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };
  const form1 = useForm(); // For Account form
  const form2 = useForm(); // For Language/Currency form

  const onSubmit = (data: any) => {
    console.log(data);
  };
  const onSubmit1 = (data: any) => {
    console.log(data);
  };

  return (
    <div className="p-8  min-h-screen">
      <div className=" mx-auto  p-">
        <h1 className="text-2xl font-bold mb-2">Account</h1>
        <div className="flex justify-between  items-center mb-6">
          <div className="flex gap-2 items-center ">
            <p
              className={`text-[14px] text-black`}
              onClick={() => ("dashboardDetailes")}
            >
              <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
            </p>
            <span>
              <FaCircle className="text-[6px] text-gray-500" />
            </span>
            <span className="text-[14px] hover:cursor-pointer">Account</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Profile Card */}
          <div className="bg-white p-6 shadow rounded-lg">
            <div className="flex flex-col items-center mt-12">
              <div className="w-32 h-32 rounded-full shadow-xl relative group overflow-hidden">
                {/* Image Preview */}
                {photo ? (
                  <img
                    src={photo}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full transition-opacity duration-300 "
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-400 group-hover:opacity-40 transition-opacity duration-300">
                    Update Photo
                  </div>
                )}

                {/* Hidden Input */}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  onChange={handlePhotoChange}
                />

                {/* Overlay Text */}
              </div>

              <p className="text-sm mt-4 text-gray-600">
                Allowed: .jpeg, .jpg, .png, .gif
              </p>
              <p className="text-sm">Max size of 3.1 MB</p>

              <div className="flex items-center mt-4">
                <span className="mr-2">Public profile</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div
                    className={`relative w-11 h-6 rounded-full peer dark:bg-[#00A76F] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00A76F] `}
                  ></div>
                </label>
              </div>

              <button className="bg-[#FF563014] text-[#B71D18] px-4 py-2 mt-4 rounded-md font-semibold">
                Delete user
              </button>
            </div>
          </div>

          {/* Right Form */}
          <div className=" md:col-span-2 bg-white p-4 rounded-lg shadow-md">
            <form
              onSubmit={form1.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="col-span-2 md:col-span-1">
                <label className="text-sm font-medium text-[#637381]">
                  Name
                </label>
                <input
                  type="text"
                  {...form1.register("name")}
                  placeholder="Name"
                  className="w-full border px-4 py-2 rounded-md "
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="text-sm font-medium text-[#637381]">
                  Email
                </label>
                <input
                  type="email"
                  {...form1.register("email")}
                  placeholder="Email"
                  className="w-full border px-4 py-2 rounded-md "
                />
              </div>

              <div  className="col-span-2 md:col-span-1">
                <label className="text-sm font-medium text-[#637381]">
                  Phone Number
                </label>
                <input
                  type="text"
                  {...form1.register("phone")}
                  placeholder="365-374-4961"
                  className="w-full border px-4 py-2 rounded-md "
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="text-sm font-medium text-[#637381]">
                  Address
                </label>
                <input
                  type="text"
                  {...form1.register("address")}
                  placeholder="Address"
                  className="w-full border px-4 py-2 rounded-md "
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="text-sm font-medium text-[#637381]">
                  Country
                </label>
                <select
                  {...form1.register("country")}
                  className="w-full border px-4 py-2 rounded-md "
                >
                  <option>USA</option>
                  <option>UK</option>
                  <option>Canada</option>
                </select>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="text-sm font-medium text-[#637381]">
                  City
                </label>
                <input
                  type="text"
                  {...form1.register("city")}
                  placeholder="city"
                  className="w-full border px-4 py-2 rounded-md "
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="text-sm font-medium text-[#637381]">
                  State/Region
                </label>
                <input
                  type="text"
                  {...form1.register("state")}
                  placeholder="State/Region"
                  className="w-full border px-4 py-2 rounded-md "
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#637381]">
                  Zip/Code
                </label>
                <input
                  type="text"
                  {...form1.register("zip")}
                  placeholder="Zip code"
                  className="w-full border px-4 py-2 rounded-md "
                />
              </div>

              <div className="col-span-2">
                <label className="text-sm font-medium ">About</label>
                <textarea
                  {...form1.register("about")}
                  placeholder="About"
                  className="w-full border px-4 py-2 rounded-md "
                />
              </div>

              <div className="col-span-2 flex justify-end">
                <button
                onClick={form1.handleSubmit(onSubmit)}
                  type="submit"
                  className="bg-brand text-white px-6 py-2 rounded-sm"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-6">
          <div className=" bg-white p-6 rounded-lg shadow-md">
            <form
              onSubmit={form2.handleSubmit(onSubmit1)}
            
            className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Language */}
              <div className="col-span-4 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LANGUAGE
                </label>
                <select
                  {...form2.register("language")}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md bg-white"
                >
                  <option>English (UK)</option>
                  <option>English (US)</option>
                  <option>Other Languages...</option>
                </select>
              </div>

              {/* Currency */}
              <div className= "col-span-4 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CURRENCY
                </label>
                <select
                  {...form2.register("currency")}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md bg-white"
                >
                  <option>$ USD</option>
                  <option>€ EUR</option>
                  <option>£ GBP</option>
                  <option>Other Currencies...</option>
                </select>
              </div>

              {/* Notifications */}
              <div className="col-span-4 md:col-span-2">
                <div className="flex flex-col">
                  <input
                    type="text"
                    id="notifications"
                    {...form2.register("notifications")}
                    placeholder=" Notification "
                    className="w-full p-2 border border-gray-300 rounded-md   "
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="col-span-4 md:col-span-1">
                <input
                  type="text"
                  id="Terms"
                  {...form2.register("Terms&Conditions")}
                  placeholder=" Terms and conditions"
                  className="w-full p-2 border border-gray-300 rounded-md  "
                />
              </div>

              {/* Change Password */}
              <div className="col-span-4 md:col-span-1">
                <NavLink to="/forget-password">
                  <button
                    type="button"
                    className="w-full p-2 border border-gray-300 rounded-md hover:bg-blue-100 transition"
                  >
                    Change Password
                  </button>
                </NavLink>
              </div>

              {/* Auto Approval */}
              <div className="col-span-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoApproval"
                    {...form2.register("autoApproval")}
                    className="h-4 w-4 text-brand focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="autoApproval" className="ml-2 block text-xs md:text-sm ">
                    Auto approve all process/orders when received (uncheck to
                    manually edit)
                  </label>
                </div>
              </div>

              {/* Delete Account */}
              <div className=" col-span-4 md:col-span-2">
                <button
                  type="button"
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete Account
                </button>
              </div>

              {/* Save Settings Button */}
              <div className=" flex md:justify-end col-span-4 md:col-span-2">
                <button
                onClick={form2.handleSubmit(onSubmit1)}
                  type="submit"
                  className="bg-brand text-white px-3  md:px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm md:text-base"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
