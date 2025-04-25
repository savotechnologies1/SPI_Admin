import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import signin from "../assets/signin.png";
import { useState } from "react";
import fb from "../assets/facebook_ic.png";
import google from "../assets/google_ic.png";
import apple from "../assets/apple_ic.png";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: unknown) => {
    console.log("Submitted data:", data);
  };

  const password = watch("password");

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

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center py-8 lg:py-0 relative">
        {/* Logo - Hidden on mobile, visible on desktop */}
        <div className="absolute top-6 right-6 hidden lg:block">
          <img className="w-40" src={logo} alt="Company Logo" />
        </div>

        {/* Mobile Logo - Centered at top */}
        <div className="absolute top-4 left-0 right-0 mx-auto lg:hidden">
          <img className="w-32 mx-auto" src={logo} alt="Company Logo" />
        </div>

        <div className="w-full max-w-md px-6 lg:px-8 mt-16 lg:mt-0">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6">
            Create an account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
                className={`w-full p-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#052C89]`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="••••••••"
                  className={`w-full p-3 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#052C89]`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <span className="text-sm font-medium">Hide</span>
                  ) : (
                    <span className="text-sm font-medium">Show</span>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="••••••••"
                  className={`w-full p-3 rounded-lg border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#052C89]`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <span className="text-sm font-medium">Hide</span>
                  ) : (
                    <span className="text-sm font-medium">Show</span>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message as string}
                </p>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-[#213C70] hover:bg-[#1a315a] text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300"
            >
              Sign Up
            </button>

            {/* Social Login Divider */}
            <div className="flex items-center justify-center my-4 text-gray-500 text-sm">
              <span className="h-px bg-gray-300 flex-1"></span>
              <span className="px-3">Or sign up with</span>
              <span className="h-px bg-gray-300 flex-1"></span>
            </div>

            {/* Social Login Buttons */}
            <div className="flex gap-4 justify-center mb-6">
              {[
                { src: fb, alt: "Facebook" },
                { src: google, alt: "Google" },
                { src: apple, alt: "Apple" },
              ].map((social) => (
                <button
                  key={social.alt}
                  type="button"
                  className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img src={social.src} alt={social.alt} className="w-5 h-5" />
                </button>
              ))}
            </div>

            {/* Login Link */}
            <div className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="text-[#4AA6BB] hover:underline font-medium"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;