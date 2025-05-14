import data from "../../components/Data/newEmpData";
import arrow from "../../assets/right_arrow.png";

const NewEmployees = () => {
  return (
    <div className=" py-6 px-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-semibold  ">New Employees</h1>
        </div>

        <div className="flex items-center px-3 py-1 rounded-lg border gap-2 w-24">
          <button className=" ">View all </button>
          <div>
            <img src={arrow} alt="" />
          </div>
        </div>
      </div>

      <div className="flex flex-col  mt-4">
        {data.map((item) => (
          <div
            key={item.email}
            className="flex items-center gap-4 p-4 rounded-md  bg-white"
          >
            {/* Employee Avatar */}
            <div className="w-12 h-12">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            {/* Employee Details */}
            <div className="flex-grow text-start">
              <p className="text-base font-semibold text-[#052C89]">
                {item.name}
              </p>
              <p className="text-sm text-gray-500">{item.email}</p>
            </div>

            {/* Arrow Icon */}
            <div className="w-6 h-6 flex justify-center items-center">
              <img
                src={item.img}
                alt="Arrow Icon"
                className="w-full h-full object-contain cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewEmployees;
