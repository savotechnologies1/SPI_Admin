import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import signin from "../assets/signin.png";
import { useState } from "react";

const ResetPassword = () => {
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
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-4">
            Reset Password
          </h2>
          
          <p className="text-gray-600 text-center mb-8">
            Enter new password and confirm new password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Password Field */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                New Password
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
                Confirm New Password
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#213C70] hover:bg-[#1a315a] text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300 mt-4"
            >
              Reset Password
            </button>

            {/* Back to Login Link */}
            <div className="text-center text-gray-600 mt-6">
              Remember your password?{" "}
              <Link
                to="/sign-in"
                className="text-[#4AA6BB] hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;