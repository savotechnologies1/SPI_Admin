import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SupplierOption {
  id: string;
  name: string;
}
interface ProductOption {
  id: string;
  partNumber: string;
}
interface OrderFormValues {
  order_number: string;
  order_date: any;
  supplier_id: string;
  part_id: string;
  quantity: string;
  cost: string;
  need_date: any;
}

const validationSchema = Yup.object({
  order_date: Yup.date().required("Order Date is required").nullable(),
  supplier_id: Yup.string(),
  part_id: Yup.string().required("Product is required"),
  quantity: Yup.number().required("Quantity is required"),
  cost: Yup.number().required("Cost is required"),
  need_date: Yup.date().required("Required By Date is required").nullable(),
});

const EditSupplierOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplierData, setSupplierData] = useState<SupplierOption[]>([]);
  const [productData, setProductData] = useState<ProductOption[]>([]);
  const [initialValues, setInitialValues] = useState<OrderFormValues | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const suppliers = await selectSupplier();
        const productsResponse = await selectProductApi();
        setSupplierData(suppliers || []);
        setProductData(productsResponse.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchOrderDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const orderDetails = await supplierOrderDetail(id);
        setInitialValues({
          order_number: orderDetails.data.order_number || "",
          order_date: orderDetails.data.order_date
            ? new Date(orderDetails.data.order_date)
            : null,
          supplier_id: orderDetails.data.supplier_id || "",
          part_id: orderDetails.data.part_id || "",
          quantity: orderDetails.data.quantity || "",
          cost: orderDetails.data.cost || "",
          need_date: orderDetails.data.need_date
            ? new Date(orderDetails.data.need_date)
            : null,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownData();
    fetchOrderDetails();
  }, [id]);

  const handleUpdate = async (
    values: OrderFormValues,
    { setSubmitting }: FormikHelpers<OrderFormValues>,
  ) => {
    if (!id) return;
    try {
      await editSupplierOrder(id, values);
      alert("Order updated successfully!");
      navigate("/supplier-order-list");
    } catch (error) {
      alert("Failed to update order.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-4 mt-5">Loading...</div>;
  if (!initialValues) return <div className="p-4 mt-5">No data found.</div>;

  return (
    <div className="m-5">
      <h1 className="font-bold text-[20px] md:text-[24px] mt-10 text-black">
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
          {({ resetForm, setFieldValue, values }) => (
            <Form className="space-y-8">
              <div>
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
                    <label className="font-semibold text-gray-700 block mb-2">
                      Order Date
                    </label>
                    <DatePicker
                      selected={values.order_date}
                      onChange={(date) => setFieldValue("order_date", date)}
                      dateFormat="MM/dd/yyyy"
                      className="border py-3 px-4 rounded-md w-full"
                      placeholderText="MM/DD/YYYY"
                    />
                    <ErrorMessage
                      name="order_date"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-semibold text-gray-700 block mb-2">
                      Supplier
                    </label>
                    <Field
                      as="select"
                      name="supplier_id"
                      className="border py-3 px-4 rounded-md w-full"
                    >
                      <option value="">-- Select Supplier --</option>
                      {supplierData.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">
                  Item Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="md:col-span-2">
                    <label className="font-semibold text-gray-700 block mb-2">
                      Select Product
                    </label>
                    <Select
                      options={productData.map((item) => ({
                        value: item.id,
                        label: item.partNumber,
                      }))}
                      onChange={(opt) =>
                        setFieldValue("part_id", opt ? opt.value : "")
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
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-2">
                      Order Quantity
                    </label>
                    <Field
                      name="quantity"
                      type="number"
                      className="border py-3 px-4 rounded-md w-full"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-2">
                      Total Cost ($)
                    </label>
                    <Field
                      name="cost"
                      type="number"
                      className="border py-3 px-4 rounded-md w-full"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-semibold text-gray-700 block mb-2">
                      Required By (Need Date)
                    </label>
                    <DatePicker
                      selected={values.need_date}
                      onChange={(date) => setFieldValue("need_date", date)}
                      dateFormat="MM/dd/yyyy"
                      className="border py-3 px-4 rounded-md w-full"
                      placeholderText="MM/DD/YYYY"
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
                  className="text-gray-600 font-semibold px-6 py-3 rounded-lg"
                  onClick={() => resetForm()}
                >
                  <FontAwesomeIcon icon={faRotateRight} /> Reset
                </button>
                <button
                  type="submit"
                  className="bg-brand text-white font-bold px-6 py-3 rounded-lg"
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
