import { useForm } from "react-hook-form";

const ProductForm = () => {
  // const [formData, setFormData] = useState({
  //   orderNumber: "",
  //   orderDate: "2025-02-26",
  //   shipDate: "2025-02-26",
  //   customer: "Cortez Herring",
  //   customerName: "",
  //   customerEmail: "",
  //   customerPhone: "",
  //   productNumber: "",
  //   cost: "",
  //   quantity: "",
  //   description: "",
  //   file: null,
  //   partFamily: "Cortez Herring",
  //   partNumber: "",
  //   partDesc: "",
  //   partQuantity: "",
  //   partCost: "",
  //   time: "09:33 AM",
  //   process: "Cortez Herring",
  //   assignTo: "Cortez Herring",
  // });

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Search Part */}
        <div className="bg-white p-4">
          <label className="block font-semibold mb-1">
            Search Part For Update
          </label>
          <input
            type="text"
            placeholder="Search part for update....."
            className="border py-3 px-4 rounded-md w-full text-gray-600 placeholder-black"
            {...register("searchPart")}
          />
        </div>

        {/* Part Family, Part, and Supplier */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 ">
          <div>
            <label className="block font-semibold mb-1">
              Select Part Family
            </label>
            <select
              {...register("partFamily")}
              className="border py-3 px-4 rounded-md w-full text-gray-600"
            >
              <option value="" disabled selected>
                Select Part Family
              </option>
              <option value="family1">Family 1</option>
              <option value="family2">Family 2</option>
              <option value="family3">Family 3</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Select Part</label>
            <select
              {...register("part")}
              className="border py-3 px-4 rounded-md w-full text-gray-600"
            >
              <option value="" disabled selected>
                Select Part
              </option>
              <option value="part1">Part 1</option>
              <option value="part2">Part 2</option>
              <option value="part3">Part 3</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Supplier</label>
            <select
              {...register("supplier")}
              className="border py-3 px-4 rounded-md w-full text-gray-600"
            >
              <option value="" disabled selected>
                Select Supplier
              </option>
              <option value="supplier1">Supplier 1</option>
              <option value="supplier2">Supplier 2</option>
              <option value="supplier3">Supplier 3</option>
            </select>
          </div>
        </div>

        {/* Return Quantity and Scrap Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 ">
          <div>
            <label className="block font-semibold mb-1">Return Quantity</label>
            <select
              {...register("returnQuantity1")}
              className="border py-3 px-4 rounded-md w-full text-gray-600"
            >
              <option value="" disabled selected>
                Select Return Quantity
              </option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Scrap Status</label>
            <select
              {...register("scrapStatus1")}
              className="border py-3 px-4 rounded-md w-full text-gray-600"
            >
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Return Quantity</label>
            <select
              {...register("returnQuantity2")}
              className="border py-3 px-4 rounded-md w-full text-gray-600"
            >
              <option value="" disabled selected>
                Select Return Quantity
              </option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Scrap Status</label>
            <select
              {...register("scrapStatus2")}
              className="border py-3 px-4 rounded-md w-full text-gray-600"
            >
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </div>
        </div>

        {/* Add More Parts */}
        <div className="bg-white p-4">
          <button
            type="button"
            className="text-[#4092FF] text-sm hover:text-blue-800 flex items-center border-b border-[#4092FF]"
          >
            <span className="text-sm mr-1 bg-[#4092FF] rounded-full  text-white px-1 ">
              +
            </span>{" "}
            Add More Parts
          </button>
        </div>

        {/* Submit and Reset Buttons */}
        <div className="flex items-center justify-start bg-white p-6">
          <button
            type="submit"
            className="px-6 py-2 bg-brand text-white text-md hover:bg-[#1a2e57] transition rounded-md"
          >
            Save Scrap
          </button>
          <button
            type="reset"
            className="px-6 py-2 text-red-500 hover:text-red-700 transition rounded-md flex items-center"
          >
            <span className="text-lg mr-1">🔄</span> Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
