import { useForm } from "react-hook-form";
import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const VacationRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data :any) => {
    console.log("📦 Request Data:", data);
  };
  return (
    <div>
      <div className="p-7">
        {/* Title */}
        <div>
          <h1 className="font-bold text-[20px] md:text-[24px] text-black">
            Vacation Request
          </h1>
        </div>

        {/* Breadcrumb */}
        <div className="flex justify-between mt-2 items-center">
          <div className="flex gap-4 items-center ">
            <p className={`text-xs  text-black`}>
              <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
            </p>
            <span>
              <FaCircle className="text-[6px] text-gray-500" />
            </span>
            <span className="text-xs s hover:cursor-pointer">time O’clock</span>
            <span>
              <FaCircle className="text-[6px] text-gray-500" />
            </span>
            <span className="text-xs  hover:cursor-pointer">
              Vacation Request
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="mt-4 bg-white p-2 sm:p-6 w-full rounded-2xl xl:w-2/3">
          {/* Start Date and End Date */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" bg-white  w-full rounded-2xl ">
              {/* Start Date and End Date */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
                <div className="w-full">
                  <label className="font-semibold">Start Date</label>
                  <input
                    {...register("startDate", {
                      required: "Start date is required",
                    })}
                    type="date"
                    placeholder="Start Date"
                    className="border py-4 px-4 rounded-md w-full"
                  />
                  {errors.startDate && (
                    <p className="text-red-500 text-sm">
                      {String(errors.startDate.message)}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <label className="font-semibold">End Date</label>
                  <input
                    {...register("endDate", {
                      required: "End date is required",
                    })}
                    type="date"
                    placeholder="End Date"
                    className="border py-4 px-4 rounded-md w-full"
                  />
                  {errors.endDate && (
                    <p className="text-red-500 text-sm">
                      {String(errors.endDate.message)}
                    </p>
                  )}
                </div>
              </div>

              {/* How Many Hours */}
              <label className="font-semibold">How Many Hours</label>
              <div className="mt-2 w-full mb-6">
                <input
                  {...register("hours", {
                    required: "Please enter hours",
                    min: { value: 1, message: "Hours must be at least 1" },
                  })}
                  type="number"
                  placeholder="Enter Hours"
                  className="border py-4 px-4 rounded-md w-full"
                />
                {errors.hours && (
                  <p className="text-red-500 text-sm">{String(errors.hours.message)}</p>
                )}
              </div>

              {/* PIN */}
              <label className="font-semibold">PIN</label>
              <div className="mt-2 w-full">
                <input
                  {...register("pin", {
                    required: "PIN is required",
                    minLength: { value: 4, message: "Minimum 4 digits" },
                  })}
                  type="password"
                  placeholder="Enter PIN"
                  className="border py-4 px-4 rounded-md w-full"
                />
                {errors.pin && (
                  <p className="text-red-500 text-sm">{String(errors.pin.message)}</p>
                )}
              </div>

              {/* Button */}
              <div className="mt-6 text-end">
                <button
                  type="submit"
                  className="bg-brand text-white px-5 py-3 rounded-lg"
                >
                  Request Now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VacationRequest;
