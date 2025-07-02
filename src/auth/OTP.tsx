import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import signin from "../assets/signin.png";
import { otpVarify } from "./https/authApi";
import { ChangeEvent, useState } from "react";

const OTP = () => {
  const { handleSubmit } = useForm();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if current has value
    if (value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };
  const onSubmit = async () => {
    const otpString = otp.join("");
    const email = localStorage.getItem("email");
    try {
      const response = await otpVarify({
        email: email,
        otp: otpString,
      });
      if (response.status === 200) {
        navigate("/reset-password");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Image Section - Hidden on mobile */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gray-100">
        <img
          src={signin}
          alt="Containers"
          className="w-full h-full object-cover min-h-[50vh] lg:min-h-screen"
        />
      </div>

      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center py-8 lg:py-0 relative">
        <div className="absolute top-6 right-6 hidden lg:block">
          <img className="w-40" src={logo} alt="Company Logo" />
        </div>

        <div className="absolute top-4 left-0 right-0 mx-auto lg:hidden">
          <img className="w-32 mx-auto" src={logo} alt="Company Logo" />
        </div>

        <div className="w-full max-w-md px-6 lg:px-8 mt-16 lg:mt-0">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-4">
            OTP Verification
          </h2>

          <p className="text-gray-600 text-center mb-8 px-4 lg:px-0">
            Enter the 4-digit code we sent to your Email/Phone Number.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  className="w-16 h-16 border-2 border-[#052C89] rounded-lg text-center text-2xl focus:outline-none focus:ring-2 focus:ring-[#052C89]"
                />
              ))}
            </div>
            <div className="text-center text-[#F2451C] mb-6">
              <p className="font-medium">00:30</p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#213C70] hover:bg-[#1a315a] text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300"
            >
              Continue
            </button>
            <div className="text-center text-gray-600">
              <span>Didn't receive a code? </span>
              <button
                type="button"
                className="text-[#F2451C] font-semibold hover:underline focus:outline-none"
              >
                Resend
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTP;
