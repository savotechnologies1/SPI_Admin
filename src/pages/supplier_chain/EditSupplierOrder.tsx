import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  editSupplierOrder,
  selectSupplier,
  supplierOrderDetail,
} from "./https/suppliersApi";
import { selectProductApi } from "../Work_Instrcution.tsx/https/workInstructionApi";
import Select from "react-select";
import { FaCircle } from "react-icons/fa";
const validationSchema = Yup.object({
  order_date: Yup.date().required("Order Date is required"),
  supplier_id: Yup.string(),
  firstName: Yup.string(),
  lastName: Yup.string(),
  email: Yup.string().email(),
  part_id: Yup.string().required("Product is required"),
  quantity: Yup.number().required("Quantity is required"),
  cost: Yup.number().required("Cost is required"),
  need_date: Yup.date().required("Required By Date is required"),
});
const EditSupplierOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplierData, setSupplierData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const suppliers = await selectSupplier();
        const productsResponse = await selectProductApi();
        setSupplierData(suppliers || []);
        setProductData(productsResponse.data || []);
      } catch (error) {
        console.error("Failed to fetch dropdown data:", error);
      }
    };

    const fetchOrderDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        console.log(`Fetching details for order ID: ${id}`);
        const orderDetails = await supplierOrderDetail(id);
        console.log("orderDetails", orderDetails);

        setInitialValues({
          order_number: orderDetails.data.order_number || "",
          order_date: orderDetails.data.order_date
            ? new Date(orderDetails.data.order_date).toISOString().split("T")[0]
            : "",
          supplier_id: orderDetails.data.supplier_id || "",
          part_id: orderDetails.data.part_id || "",
          quantity: orderDetails.data.quantity || "",
          cost: orderDetails.data.cost || "",
          need_date: orderDetails.data.need_date
            ? new Date(orderDetails.data.need_date).toISOString().split("T")[0]
            : "",
        });
        setError(null);
      } catch (err) {
        console.error("Failed to fetch order details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownData();
    fetchOrderDetails();
  }, [id]);
  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      await editSupplierOrder(id, values);
      alert("Order updated successfully!");
      navigate("/supplier-order-list");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) {
    return <div className="p-4 mt-5">Loading order details...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  if (!initialValues) {
    return <div className="p-4 mt-5">No order data found.</div>;
  }

  return (
    <div className="m-5">
      <h1 className="font-bold text-[20px] md:text-[24px] text-black">
        Edit Supplier Order
      </h1>

      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center ">
          <p
            className={`text-xs sm:text-[16px] text-black`}
            onClick={() => "dashboardDetailes"}
          >
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            Supply Chain
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            Edit Supplier Order
          </span>
        </div>
      </div>
      <div className="p-6 bg-white rounded-2xl border shadow-md max-w-4xl m-6">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({ resetForm, setFieldValue, values, touched, errors }) => (
            <Form className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">
                  Edit Order Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-2">
                      Order Number
                    </label>
                    <p className="border py-3 px-4 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed">
                      {values.order_number}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="order_date"
                      className="font-semibold text-gray-700 block mb-2"
                    >
                      Order Date
                    </label>
                    <Field
                      id="order_date"
                      name="order_date"
                      type="date"
                      className="border py-3 px-4 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="order_date"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="supplier_id"
                      className="font-semibold text-gray-700 block mb-2"
                    >
                      Supplier
                    </label>
                    <Field
                      as="select"
                      id="supplier_id"
                      name="supplier_id"
                      className="border py-3 px-4 rounded-md w-full"
                    >
                      <option value="">-- Select Supplier --</option>
                      {supplierData.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="supplier_id"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">
                  Item Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="part_id"
                      className="font-semibold text-gray-700 block mb-2"
                    >
                      Select Product
                    </label>
                    <Select
                      options={productData.map((item) => ({
                        value: item.id,
                        label: item.partNumber,
                      }))}
                      onChange={(option) =>
                        setFieldValue("part_id", option ? option.value : "")
                      }
                      value={
                        productData
                          .map((item) => ({
                            value: item.id,
                            label: item.partNumber,
                          }))
                          .find((opt) => opt.value === values.part_id) || null
                      }
                      isClearable
                      id="part_id"
                      placeholder="Search or select a product..."
                    />
                    <ErrorMessage
                      name="part_id"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="quantity"
                      className="font-semibold text-gray-700 block mb-2"
                    >
                      Order Quantity
                    </label>
                    <Field
                      id="quantity"
                      name="quantity"
                      type="number"
                      placeholder="e.g., 100"
                      className="border py-3 px-4 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cost"
                      className="font-semibold text-gray-700 block mb-2"
                    >
                      Total Cost ($)
                    </label>
                    <Field
                      id="cost"
                      name="cost"
                      type="number"
                      placeholder="e.g., 550.50"
                      className="border py-3 px-4 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="cost"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="need_date"
                      className="font-semibold text-gray-700 block mb-2"
                    >
                      Required By (Need Date)
                    </label>
                    <Field
                      id="need_date"
                      name="need_date"
                      type="date"
                      className="border py-3 px-4 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="need_date"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center gap-4 pt-6 border-t">
                <button
                  type="button"
                  className="text-gray-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => resetForm()}
                >
                  <FontAwesomeIcon icon={faRotateRight} /> Reset Changes
                </button>
                <button
                  type="submit"
                  className="bg-brand text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditSupplierOrder;
