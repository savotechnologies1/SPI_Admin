import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import setting from "../assets/settings_icon.png";
import passwordIcon from "../assets/password_icon'.png";
import visibleIcon from "../assets/visible_icon.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "./https/authApi";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { FaSpinner } from "react-icons/fa";

interface SignInFormData {
  userName: string;
  password: string;
}

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await loginApi(data);

      if (response && (response.status === 201 || response.status === 200)) {
        login(response.data.token, response.data.user);
        navigate("/", { replace: true });
      }
    } catch (error: unknown) {
      // Improved error handling
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      const errorMessage =
        axiosError.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-[#F5F6FA] min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <img
            src={logo}
            alt="Logo"
            className="
    h-8 
    sm:h-10 
    md:h-12 
    lg:h-14 
    xl:h-16 
    2xl:h-18 
    w-auto 
    max-w-[120px] 
    sm:max-w-[150px] 
    md:max-w-[180px] 
    lg:max-w-[220px] 
    object-contain
  "
          />

          <img src={setting} alt="Settings" />
        </div>

        <h2 className="text-3xl font-bold text-center mb-6 uppercase tracking-wide text-gray-800">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-gray-700">
              Username
            </label>
            <input
              type="text"
              {...register("userName", { required: "Username is required" })}
              placeholder="Enter your username"
              className={`w-full border p-2 rounded outline-none focus:ring-2 focus:ring-brand/50 ${
                errors.userName ? "border-red-500" : "border-gray-300"
              }`}
              autoComplete="username"
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1 text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="********"
                className={`w-full border p-2 rounded outline-none focus:ring-2 focus:ring-brand/50 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                autoComplete="current-password"
              />
              <img
                src={showPassword ? visibleIcon : passwordIcon}
                alt="Toggle visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5 opacity-60 hover:opacity-100"
                onClick={togglePasswordVisibility}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-end mb-6">
            <Link
              to="/forget-password"
              className="text-red-600 text-sm font-medium hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-3 rounded text-white font-bold flex items-center justify-center gap-2 transition-all ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-brand hover:bg-brand-dark active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
