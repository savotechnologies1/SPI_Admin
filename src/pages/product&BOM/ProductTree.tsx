import { useContext, useEffect, useState } from "react";
import { PartContext } from "../../components/Context/PartContext";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import add from "../../assets/add.png";
import { productTree } from "./https/partProductApis";

export default function ProductTree() {
  const partContext = useContext(PartContext);

  if (!partContext) {
    throw new Error("PartContext is not provided.");
  }

  const { parts } = partContext;

  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/edit-product/${id}`);
  };
  const [customerData, setCustomerData] = useState<[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const rowsPerPage = 5;

  const fetchCustomerList = async (page = 1) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await productTree(page, rowsPerPage, searchVal);
      setCustomerData(response.result);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      throw error;
    }
  };

  console.log("customerDatacustomerData", customerData);

  useEffect(() => {
    fetchCustomerList(currentPage);
  }, [currentPage, searchVal]);

  return (
    <div className="p-4 mt-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="font-bold text-xl md:text-2xl text-black">
            Browse Product
          </h1>
        </div>

        <div className="flex relative">
          <button className="py-2 px-7 rounded-lg border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
            <NavLink to="/add-product-number">
              <span className="">New Product Number</span>
            </NavLink>
          </button>
          <div className="absolute top-3 left-2">
            <img src={add} alt="" className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="flex justify-between  items-center">
        <div className="flex gap-2 items-center ">
          <p
            className={`text-[14px] text-black`}
            onClick={() => "dashboardDetailes"}
          >
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">
            product and Bom
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">
            {" "}
            Browse Product
          </span>
        </div>
      </div>
      <div className=" mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
        <div className="flex justify-between gap-4 items-center mb-6">
          {/* <div className="w-full">
            <input
              type="text"
              placeholder="Search..."
              className="border w-full px-3 py-2 rounded-md"
            />
          </div> */}
          {/* <div>
            <BsThreeDotsVertical
              className="text-black hover:text-black cursor-pointer text-lg"
              title="More Options"
            />
          </div> */}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse  border-gray-300 ">
            <thead className="bg-gray-200">
              <tr className="whitespace-nowrap">
                <th className="border p-2 font-semibold text-gray-600">
                  Product Number
                </th>
                <th className="border p-2 font-semibold text-gray-600">
                  Part Number
                </th>
                <th className="border p-2 font-semibold text-gray-600">
                  Process
                </th>
                <th className="border p-2 font-semibold text-gray-600">
                  Part Family
                </th>
                <th className="border p-2 font-semibold text-gray-600">
                  Cycle Time
                </th>
                {/* <th className="border p-2 font-semibold text-gray-600">
                  Availble stock
                </th>
                <th className="border p-2 font-semibold text-gray-600">
                  order qty.
                </th> */}
                <th className="border p-2 font-semibold text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {customerData.flatMap((product, productIndex) =>
                product.parts.map((part, partIndex) => (
                  <tr
                    key={`${productIndex}-${partIndex}`}
                    className="hover:bg-gray-100 text-center"
                  >
                    <td className="border-b border-dashed p-2">
                      {product.productNumber}
                    </td>
                    <td className="border-b border-dashed p-2">
                      {part.partNumber}
                    </td>
                    <td className="border-b border-dashed p-2">
                      {part.partFamily || "Not Available"}
                    </td>

                    <td className="border-b border-dashed p-2">
                      {part.process?.processName
                        ? `${part.process.processName} `
                        : "Not Available"}
                    </td>
                    <td className="border-b border-dashed p-2">
                      {part.process.cycleTime
                        ? `$${part.process.cycleTime}`
                        : "Not Available"}
                    </td>
                    {/* <td className="border-b border-dashed p-2">
                      {product.availStock || "Not Available"}
                    </td>
                    <td className="border-b border-dashed p-2">
                      {product.supplierOrderQty || "Not Available"}
                    </td> */}
                    <td className="flex items-center gap-4 border-b border-dashed p-2">
                      <FiEdit2
                        className="text-black cursor-pointer text-lg"
                        title="Quick Edit"
                        onClick={() => handleClick(product.product_id)}
                      />
                      {/* <BsThreeDotsVertical
                        className="text-black hover:text-black cursor-pointer text-lg"
                        title="More Options"
                      /> */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
