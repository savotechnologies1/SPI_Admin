import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import signin from "../assets/signin.png";
import { useState } from "react";
import fb from "../assets/facebook_ic.png";
import google from "../assets/google_ic.png";
import apple from "../assets/apple_ic.png";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const ForgetPassword = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: unknown) => {
    console.log("Submitted data:", data);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Image Section */}
      <div className="hidden xl:block md:w-1/2 bg-gray-100 ">
      
        <img
          src={signin}
          alt="Containers"
          className="w-full h-full object-cover md:h-full md:min-h-screen"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full xl:w-1/2 bg-white flex items-center justify-center py-10 md:py-0">
        <div className="absolute top-6 right-0 xl:right-6 hidden lg:block">
          <img className="w-1/2 xl:w-full max-w-[150px]" src={logo} alt="Logo" />
        </div>

        <div className="w-full sm:max-w-xl xl:max-w-md px-6 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left mb-2">
            Forget Password
          </h2>
          <p className="text-[#89868D] text-sm md:text-base mb-6 text-center md:text-left">
            Enter your email for the verification process, we will send 4 digits code to your email.
          </p>

          <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabList className="flex bg-[#F2F6FD] rounded-full p-1">
              <Tab
                className="py-2 px-4 md:px-6 cursor-pointer text-sm md:text-base text-center flex-1"
                selectedClassName="bg-white rounded-full shadow-sm font-medium"
              >
                Email
              </Tab>
              <Tab
                className="py-2 px-4 md:px-6 cursor-pointer text-sm md:text-base text-center flex-1"
                selectedClassName="bg-white rounded-full shadow-sm font-medium"
              >
                Mobile Number
              </Tab>
            </TabList>

            <TabPanel className="mt-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email format",
                      },
                    })}
                    placeholder="Enter your email"
                    className="w-full p-3 rounded-lg bg-[#F6F7FA] border border-[#F6F7FA] focus:outline-none focus:ring-2 focus:ring-[#052C89] focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{String(errors.email.message)}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#052C89] text-white p-3 rounded-lg font-medium hover:bg-[#041E66] transition-colors mt-4"
                >
                  Send OTP
                </button>
              </form>
            </TabPanel>

            <TabPanel className="mt-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">Mobile Number</label>
                  <input
                    type="tel"
                    {...register("mobile", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Invalid mobile number (10 digits required)",
                      },
                    })}
                    placeholder="Enter your mobile number"
                    className="w-full p-3 rounded-lg bg-[#F6F7FA] border border-[#F6F7FA] focus:outline-none focus:ring-2 focus:ring-[#052C89] focus:border-transparent"
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-xs mt-1">{String(errors.mobile.message)}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#052C89] text-white p-3 rounded-lg font-medium hover:bg-[#041E66] transition-colors mt-4"
                >
                  Send OTP
                </button>
              </form>
            </TabPanel>
          </Tabs>

          <div className="flex items-center justify-center my-4 text-[#6A707C] text-sm">
            <span className="h-px bg-gray-300 flex-1"></span>
            <span className="px-3">Or Login With</span>
            <span className="h-px bg-gray-300 flex-1"></span>
          </div>

          <div className="flex gap-4 justify-center mb-6">
            {[fb, google, apple].map((icon, index) => (
              <button
                key={index}
                className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img src={icon} alt="" className="w-5 h-5" />
              </button>
            ))}
          </div>

          <div className="text-center text-sm">
            Remember Password?{" "}
            <Link
              to="/sign-in"
              className="text-[#4AA6BB] hover:underline font-medium"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;