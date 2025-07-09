import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { toast } from "react-toastify";
import { customOrderValidation } from "../../utils/validation.tsx";
import { FaTrash } from "react-icons/fa";
import {
  CustomerInterface,
  ProductNumberInterface,
  PartNumberInterface,
  processInterface,
} from "./../../utils/Interfaces.tsx";
import {
  addCustomOrder,
  selectCustomer,
  selectProductNumber,
  selectPartNumber,
  selectProcess,
} from "./https/schedulingApis";

const generateNewOrderNumber = () => Date.now().toString();
const initialProcess = { totalTime: "", process: "", assignTo: "" };

const CustomOrderForm = () => {
  const [customerList, setCustomerList] = useState<CustomerInterface[]>([]);
  const [productList, setProductList] = useState<ProductNumberInterface[]>([]);
  const [processList, setProcessList] = useState<processInterface[]>([]);
  const [partList, setPartList] = useState<PartNumberInterface[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );
  const [singleUnitCost, setSingleUnitCost] = useState<number | null>(null);

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
    fetchPartNumber();
    fetchProcess();
  }, []);

  //fetch customers
  const fetchCustomers = async () => {
    try {
      const response: CustomerInterface[] = await selectCustomer();
      setCustomerList(response || []);
      // toast.success("Stock order fetch successfully!");
    } catch (error) {
      console.error("Error fetching customer:", error);
      toast.error("Failed to fetch stock order. Please try again.");
      setCustomerList([]);
    }
  };

  // fetching Product Numbers
  const fetchProducts = async () => {
    try {
      const response: ProductNumberInterface[] = await selectProductNumber();
      setProductList(response || []);
      // setProductsOnlyList(response);
    } catch (error) {
      console.error("Error fetching product number:", error);
      toast.error("Failed to fetch product number. Please try again.");
    }
  };

  //fetching Part Number
  const fetchPartNumber = async () => {
    try {
      const response: PartNumberInterface[] = await selectPartNumber();
      setPartList(response || []);
    } catch (error) {
      console.error("Error fetching part number:", error);
      toast.error("Failed to fetch part number. Please try again.");
    }
  };

  const fetchProcess = async () => {
    try {
      const response: processInterface[] = await selectProcess();
      setProcessList(response || []);
    } catch (error) {
      console.error("Error fetching part number:", error);
      toast.error("Failed to fetch part number. Please try again.");
    }
  };

  const initialFormValues = {
    orderNumber: generateNewOrderNumber(),
    orderDate: new Date().toISOString().split("T")[0],
    shipDate: "",
    customerId: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    productNumber: "",
    partNumber: "",
    cost: "",
    totalCost: "",
    productQuantity: "",
    processDetails: [initialProcess],
  };

  return (
    <div className="p-4 bg-white rounded-2xl border shadow-md">
      <Formik
        initialValues={initialFormValues}
        validationSchema={customOrderValidation}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            console.log("Values", values);

            // await addCustomOrder(values);
            resetForm({
              values: {
                ...initialFormValues,
                orderNumber: generateNewOrderNumber(),
              },
            });
            setSelectedCustomerId(null);
            setSingleUnitCost(null);
          } catch (error) {
            console.error("Submission error:", error);
            toast.error("Failed to create order. Please try again.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, errors, touched, isSubmitting }) => {
          const handleCustomerSelectChange = (
            e: React.ChangeEvent<HTMLSelectElement>
          ) => {
            const value = e.target.value;
            setFieldValue("customerId", value);
            if (value === "new") {
              setSelectedCustomerId(null);
              setFieldValue("customerName", "");
              setFieldValue("customerEmail", "");
              setFieldValue("customerPhone", "");
            } else if (value) {
              setSelectedCustomerId(value);
              const selected = customerList.find((c) => c.id === value);
              if (selected) {
                setFieldValue("customerName", selected.name);
                setFieldValue("customerEmail", selected.email);
                setFieldValue("customerPhone", selected.customerPhone);
              }
            } else {
              setSelectedCustomerId(null);
              setFieldValue("customerName", "");
              setFieldValue("customerEmail", "");
              setFieldValue("customerPhone", "");
            }
          };

          const handleProductSelectChange = (
            e: React.ChangeEvent<HTMLSelectElement>
          ) => {
            const selectedProdNumber = e.target.value;
            setFieldValue("productNumber", selectedProdNumber);
            if (selectedProdNumber) {
              const selected = productList.find(
                (p) => p.partNumber === selectedProdNumber
              );
              if (selected) {
                const unitCost = selected.cost;
                const quantity = 1;
                setSingleUnitCost(unitCost);
                setFieldValue("cost", unitCost.toFixed(2));
                setFieldValue("productQuantity", quantity);
                setFieldValue("totalCost", (unitCost * quantity).toFixed(2));
              }
            } else {
              setSingleUnitCost(null);
              setFieldValue("cost", "");
              setFieldValue("productQuantity", "");
              setFieldValue("totalCost", "");
            }
          };

          const handlePartSelectChange = (
            e: React.ChangeEvent<HTMLSelectElement>
          ) => {
            const selectedPartNumber = e.target.value;
            setFieldValue("partNumber", selectedPartNumber);
          };

          const handleQuantityChange = (
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            const quantityStr = e.target.value;
            setFieldValue("productQuantity", quantityStr);
            const newQuantity = Number(quantityStr);
            if (singleUnitCost !== null && newQuantity >= 1) {
              const totalCost = singleUnitCost * newQuantity;
              setFieldValue("totalCost", totalCost.toFixed(2));
            } else {
              setFieldValue("totalCost", "");
            }
          };

          return (
            <Form>
              {/* --- Form sections are collapsed for brevity, no changes inside them --- */}
              {/* Order Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 ">
                <div>
                  <label className="font-semibold">Order Number</label>
                  <Field
                    name="orderNumber"
                    type="text"
                    readOnly
                    className="border py-3 px-4 rounded-md w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="font-semibold">Order Date</label>
                  <Field
                    name="orderDate"
                    type="date"
                    className="border py-3 px-4 rounded-md w-full"
                  />
                  <ErrorMessage
                    name="orderDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="font-semibold">Ship Date</label>
                  <Field
                    name="shipDate"
                    type="date"
                    className={`border py-3 px-4 rounded-md w-full ${
                      touched.shipDate && errors.shipDate
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="shipDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 bg-white px-6">
                <div>
                  <label className="font-semibold">Select Customer</label>
                  <select
                    name="customerId"
                    value={values.customerId}
                    onChange={handleCustomerSelectChange}
                    className={`border px-2 py-3 rounded-md w-full ${
                      touched.customerId && errors.customerId
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    <option value="">Select a customer</option>
                    <option value="new">➕ Add New Customer</option>
                    {customerList.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    name="customerId"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="font-semibold">Customer Name</label>
                  <Field
                    name="customerName"
                    readOnly={selectedCustomerId !== null}
                    placeholder="Enter Customer Name"
                    className={`border py-3 px-4 rounded-md w-full ${
                      selectedCustomerId !== null ? "bg-gray-100" : ""
                    } ${
                      touched.customerName && errors.customerName
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="customerName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="font-semibold">Customer Email</label>
                  <Field
                    name="customerEmail"
                    type="email"
                    readOnly={selectedCustomerId !== null}
                    placeholder="Enter Customer Email"
                    className={`border py-3 px-4 rounded-md w-full ${
                      selectedCustomerId !== null ? "bg-gray-100" : ""
                    } ${
                      touched.customerEmail && errors.customerEmail
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="customerEmail"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="font-semibold">Customer Phone</label>
                  <Field
                    name="customerPhone"
                    readOnly={selectedCustomerId !== null}
                    placeholder="Enter Customer Phone"
                    className={`border py-3 px-4 rounded-md w-full ${
                      selectedCustomerId !== null ? "bg-gray-100" : ""
                    } ${
                      touched.customerPhone && errors.customerPhone
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="customerPhone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 bg-white px-6 ">
                <div>
                  <label className="font-semibold">Product Number</label>
                  <select
                    name="productNumber"
                    value={values.productNumber}
                    onChange={handleProductSelectChange}
                    className={`border px-2 py-3 rounded-md w-full 
                    ${
                      touched.productNumber && errors.productNumber
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    <option value="">Select a product</option>
                    {productList.map((p) => (
                      <option key={p.part_id} value={p.partNumber}>
                        {p.partNumber}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    name="productNumber"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold">Unit Cost</label>
                  <p className="border py-3 px-4 rounded-md w-full bg-gray-100 min-h-[48px] flex items-center">
                    {singleUnitCost !== null
                      ? `$${singleUnitCost.toFixed(2)}`
                      : ""}
                  </p>
                </div>
                <div>
                  <label className="font-semibold">Product Quantity</label>
                  <Field
                    name="productQuantity"
                    type="number"
                    placeholder="Quantity"
                    onChange={handleQuantityChange}
                    min="1"
                    className={`border py-3 px-4 rounded-md w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                      touched.productQuantity && errors.productQuantity
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="productQuantity"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="font-semibold">Total Cost</label>
                  <Field
                    name="totalCost"
                    readOnly
                    placeholder="Total Cost"
                    className="border py-3 px-4 rounded-md w-full bg-gray-100"
                  />
                  <ErrorMessage
                    name="totalCost"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Part Number Field */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-white px-6">
                <div className="col-span-1">
                  <label className="font-semibold">Part Number</label>
                  <select
                    name="partNumber"
                    value={values.partNumber}
                    onChange={handlePartSelectChange}
                    className={`border px-2 py-3 rounded-md w-full 
                    ${
                      touched.partNumber && errors.partNumber
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    <option value="">Select a part number</option>
                    {partList.map((p) => (
                      <option key={p.part_id} value={p.partNumber}>
                        {p.partNumber}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    name="partNumber"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* --- Process Details  --- */}
              <div className="bg-white px-6 mt-4">
                <FieldArray name="processDetails">
                  {({ push, remove }) => (
                    <div>
                      {values.processDetails.map((_, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4 p-4 border rounded-md relative"
                        >
                          {/* Total Time */}
                          <div className="md:col-span-1">
                            <label className="font-semibold">
                              Total Time (minutes)
                            </label>
                            <Field
                              name={`processDetails[${index}].totalTime`}
                              min="1"
                              type="number"
                              placeholder="e.g., 65"
                              className="border py-3 px-4 rounded-md w-full"
                            />
                            <ErrorMessage
                              name={`processDetails[${index}].totalTime`}
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          {/* Select Process */}
                          <div className="md:col-span-1">
                            <label className="font-semibold">
                              Select Process
                            </label>
                            <Field
                              as="select"
                              name={`processDetails[${index}].process`}
                              className="border px-2 py-3 rounded-md w-full"
                            >
                              <option value="">Select Process</option>
                              {processList.map((p) => (
                                <option key={p.id} value={p.name}>
                                  {p.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name={`processDetails[${index}].process`}
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          {/* Assign To */}
                          <div className="md:col-span-1">
                            <label className="font-semibold">
                              Assign To Part Number
                            </label>
                            <Field
                              name={`processDetails[${index}].assignTo`}
                              type="text"
                              placeholder="Enter Part Number"
                              className="border py-3 px-4 rounded-md w-full"
                            />
                            <ErrorMessage
                              name={`processDetails[${index}].assignTo`}
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          {/* Remove Icon */}
                          <div className="md:col-span-1 flex justify-center items-center h-full">
                            {index > 0 && (
                              <FaTrash
                                onClick={() => remove(index)}
                                className="text-red-500 cursor-pointer hover:text-red-700 text-xl"
                                title="Remove Process"
                              />
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Add Button */}
                      <button
                        type="button"
                        onClick={() => push(initialProcess)}
                        className="bg-brand text-white p-2 text-sm rounded-sm hover:bg-[#1a2e57]"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 bg-brand text-white text-md hover:bg-[#1a2e57] transition ml-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Custom Order"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CustomOrderForm;
