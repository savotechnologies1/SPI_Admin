import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import setting from "../assets/settings_icon.png";
import password from "../assets/password_icon'.png";
import visible from "../assets/visible_icon.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "./https/authApi";
import { toast } from "react-toastify";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  interface FormData {
    userName: string;
    password: string;
  }

  const onSubmit = async (data: FormData) => {
    try {
      const response = await loginApi(data);
      console.log("responseresponse", response);
      toast.success(response.message);
      navigate("/");
    } catch (error: unknown) {
      toast.error(error.response.message);
    }
  };

  return (
    <div className="bg-[#F5F6FA] min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <img src={logo} alt="Logo" className="w-20 2xl:w-32" />
          <img src={setting} alt="Settings" />
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">ADMIN LOGIN</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block font-semibold">Username</label>
            <input
              type="text"
              {...register("userName", { required: "Name is required" })}
              placeholder="Enter your userName"
              className="w-full border p-2 rounded"
            />
            {errors.userName && (
              <p className="text-red-500">{errors.userName.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="********"
                className="w-full border p-2 rounded"
              />
              <img
                src={showPassword ? visible : password}
                alt="Toggle visibility"
                className="absolute right-3 top-3 cursor-pointer w-6"
                onClick={togglePasswordVisibility}
              />
            </div>
            {errors.password && (
              <p className="text-red-500">{String(errors.password.message)}</p>
            )}
          </div>
          <Link
            to="/forget-password"
            className="text-red-700 text-sm flex justify-end mb-5"
          >
            Forget Password
          </Link>
          <button
            type="submit"
            className="w-full bg-brand text-white p-3 rounded"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
