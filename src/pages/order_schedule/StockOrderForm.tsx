import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addStockOrder, selectCustomer, selectProductNumber } from "./https/schedulingApis";
import { stockOrderValidation } from "../../utils/validation";
import { CustomerInterface, ProductNumberInterface } from "../../utils/Interfaces";
import { toast } from "react-toastify";

const generateNewOrderNumber = () => Date.now().toString();

const StockOrderForm = () => {

  const [customerList, setCustomerList] = useState<CustomerInterface[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [productNumberList, setProductNumberList] = useState<ProductNumberInterface[]>([]);
  const [singleUnitCost, setSingleUnitCost] = useState<number | null>(null);


  useEffect(() => {
    getCustomer();
    getProductNumber();
  }, []);


  const getCustomer = async () => {
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

  const getProductNumber = async () => {
    try {
      const response: ProductNumberInterface[] = await selectProductNumber();
      console.log("getProductNumber", response);
      setProductNumberList(response || []);
      // toast.success("Product Number fetch successfully!");
    } catch (error) {
      console.error("Error fetching product number:", error);
      toast.error("Failed to fetch product number. Please try again.");
    }
  }


  function setFieldValue(arg0: string, arg1: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="p-4 bg-white rounded-2xl border shadow-md">
      <Formik
        initialValues={{
          orderNumber: generateNewOrderNumber(),
          orderDate: new Date().toISOString().split("T")[0],
          shipDate: "",
          customerId: "",
          customerName: "",
          customerEmail: "",
          customerPhone: "",
          productNumber: "",
          cost: "",
          totalCost: "",
          productQuantity: "",
          productDescription: "",
        }}
        validationSchema={stockOrderValidation}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            console.log("values", values);

            await addStockOrder(values);
            resetForm({
              values: {
                orderNumber: generateNewOrderNumber(),
                orderDate: new Date().toISOString().split("T")[0],
                shipDate: "",
                customerId: "",
                customerName: "",
                customerEmail: "",
                customerPhone: "",
                productNumber: "",
                cost: "",
                totalCost: "",
                productQuantity: "",
                productDescription: "",
              }
            });
            setSelectedCustomerId(null);
            setSingleUnitCost(null);
          } catch (error) {
            console.error("Submission error:", error);
            toast.error("Failed to create order. A new Order ID has been generated. Please try again.");
            setFieldValue('orderNumber', generateNewOrderNumber());
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, errors, touched, isSubmitting, handleBlur }) => {

          const handleSelectChange = (
            e: React.ChangeEvent<HTMLSelectElement>
          ) => {
            const value = e.target.value;

            if (value === "new") {
              const newCustomerId = crypto.randomUUID();
              setFieldValue("customerId", newCustomerId);
              setSelectedCustomerId(null);
              setFieldValue("customerName", "");
              setFieldValue("customerEmail", "");
              setFieldValue("customerPhone", "");
            } else if (value) {
              setFieldValue("customerId", value);
              setSelectedCustomerId(value);
              const selectedCustomer = customerList.find(
                (c) => c.id === value
              );

              if (selectedCustomer) {
                setFieldValue("customerName", selectedCustomer.name);
                setFieldValue("customerEmail", selectedCustomer.email);
                setFieldValue(
                  "customerPhone",
                  selectedCustomer.customerPhone
                );
              }
            } else {
              // This handles clearing the fields if "Select a customer" is re-selected.
              setFieldValue("customerId", "");
              setSelectedCustomerId(null);
              setFieldValue("customerName", "");
              setFieldValue("customerEmail", "");
              setFieldValue("customerPhone", "");
            }
          };

          const handleProductSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedPartNumber = e.target.value;
            setFieldValue("productNumber", selectedPartNumber);

            if (selectedPartNumber) {
              const selectedProduct = productNumberList.find(p => p.partNumber === selectedPartNumber);
              if (selectedProduct) {
                const unitCost = selectedProduct.cost;
                const quantity = 1; // Default quantity

                setSingleUnitCost(unitCost); // For display and recalculation
                setFieldValue("cost", unitCost.toFixed(2)); // CHANGED: Set UNIT cost in the 'cost' field
                setFieldValue("productQuantity", quantity);
                setFieldValue("productDescription", selectedProduct.partDescription);
                setFieldValue("totalCost", (unitCost * quantity).toFixed(2)); // ADDED: Set initial TOTAL cost
              }
            } else {
              setSingleUnitCost(null);
              setFieldValue("cost", "");
              setFieldValue("productQuantity", "");
              setFieldValue("productDescription", "");
              setFieldValue("totalCost", ""); // ADDED: Clear total cost
            }
          };

          const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const quantityValue = e.target.value;
            let newQuantity = Number(quantityValue);

            setFieldValue("productQuantity", quantityValue); // Set the raw value to allow clearing the input

            if (newQuantity < 1 && quantityValue !== "") {
              newQuantity = 1;
            }

            // Recalculate total cost if we have a unit cost and a valid quantity
            if (singleUnitCost !== null && newQuantity >= 1) {
              const totalCost = singleUnitCost * newQuantity;
              // CHANGED: Update the 'totalCost' field, not the 'cost' field
              setFieldValue("totalCost", totalCost.toFixed(2));
            } else {
              // If quantity is cleared or invalid, clear the total cost
              // CHANGED: Update the 'totalCost' field
              setFieldValue("totalCost", "");
            }
          };
          // const handleProductSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
          //   const selectedPartNumber = e.target.value;
          //   setFieldValue("productNumber", selectedPartNumber);

          //   if (selectedPartNumber) {
          //     const selectedProduct = productNumberList.find(p => p.partNumber === selectedPartNumber);
          //     if (selectedProduct) {
          //       // Store the single unit cost in our state
          //       setSingleUnitCost(selectedProduct.cost);
          //       // Set the form's total cost field
          //       setFieldValue("cost", selectedProduct.cost);
          //       // Set the default quantity to 1
          //       setFieldValue("productQuantity", 1);
          //       setFieldValue("productDescription", selectedProduct.partDescription);
          //     }
          //   } else {
          //     // If deselected, clear all related fields
          //     setSingleUnitCost(null);
          //     setFieldValue("cost", "");
          //     setFieldValue("productQuantity", "");
          //     setFieldValue("productDescription", "");
          //   }
          // };

          // const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          //   let newQuantity = Number(e.target.value);

          //   // Prevent quantity from being less than 1 during calculation
          //   if (newQuantity < 1 && e.target.value !== "") {
          //     newQuantity = 1;
          //   }

          //   setFieldValue("productQuantity", e.target.value === "" ? "" : newQuantity);

          //   // Recalculate total cost if we have a unit cost and a valid quantity
          //   if (singleUnitCost !== null && newQuantity >= 1) {
          //     const totalCost = singleUnitCost * newQuantity;
          //     setFieldValue("cost", totalCost.toFixed(2));
          //   } else {
          //     // If quantity is cleared or invalid, clear the total cost
          //     setFieldValue("cost", "");
          //   }
          // };

          return (
            <Form>
              {/* Channel & Platform */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 ">
                <div>
                  <label className="font-semibold">Order Number</label>
                  <Field
                    name="orderNumber"
                    type="text"
                    readOnly
                    className="border py-3 px-4 rounded-md w-full placeholder-gray-600 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="font-semibold">Order Date</label>
                  <Field
                    name="orderDate"
                    type="date"
                    className="border py-3 px-4 rounded-md w-full placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="font-semibold">Ship Date</label>
                  <Field
                    name="shipDate"
                    type="date"
                    className={`border py-3 px-4 rounded-md w-full placeholder-gray-600 ${touched.shipDate && errors.shipDate ? 'border-red-500' : ''}`}
                  />
                  <ErrorMessage name="shipDate" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 bg-white px-6 ">
                <div className="flex flex-col ">
                  <label className="font-semibold">Select Customer</label>
                  <select
                    name="customerId"
                    value={values.customerId}
                    onChange={handleSelectChange}
                    className={`border px-2 py-3 rounded-md ${touched.customerId && errors.customerId ? 'border-red-500' : ''}`}
                  >
                    <option value="" label="Select a customer" />
                    <option value="new">➕ Add New Customer</option>
                    {customerList.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage name="customerId" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="font-semibold">Customer Name</label>
                  <Field
                    name="customerName"
                    type="text"
                    readOnly={selectedCustomerId !== null}
                    placeholder="Enter Customer Name"
                    className={`border py-3 px-4 rounded-md w-full placeholder-gray-600 ${selectedCustomerId !== null ? 'bg-gray-100' : ''} ${touched.customerName && errors.customerName ? 'border-red-500' : ''}`}
                  />
                  <ErrorMessage name="customerName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label className="font-semibold">Customer Email</label>
                  <Field
                    name="customerEmail"
                    type="email"
                    readOnly={selectedCustomerId !== null}
                    placeholder="Enter Customer Email"
                    className={`border py-3 px-4 rounded-md w-full placeholder-gray-600 ${selectedCustomerId !== null ? 'bg-gray-100' : ''} ${touched.customerEmail && errors.customerEmail ? 'border-red-500' : ''}`}
                  />
                  <ErrorMessage name="customerEmail" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label className="font-semibold">Customer Phone</label>
                  <Field
                    name="customerPhone"
                    type="text"
                    readOnly={selectedCustomerId !== null}
                    placeholder="Enter Customer Phone"
                    className={`border py-3 px-4 rounded-md w-full placeholder-gray-600 ${selectedCustomerId !== null ? 'bg-gray-100' : ''} ${touched.customerPhone && errors.customerPhone ? 'border-red-500' : ''}`}
                  />
                  <ErrorMessage name="customerPhone" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 bg-white px-6 ">
                <div className="md:col-span-1">
                  <label className="font-semibold">Product Number</label>
                  <select
                    name="productNumber"
                    value={values.productNumber}
                    onChange={handleProductSelectChange}
                    onBlur={handleBlur}
                    className={`border px-2 py-3 rounded-md w-full placeholder-gray-600 ${touched.productNumber && errors.productNumber ? 'border-red-500' : ''}`}
                  >
                    <option value="" label="Select a product" />
                    {productNumberList.map((product) => (
                      <option key={product.part_id} value={product.partNumber}>
                        {product.partNumber}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage name="productNumber" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Unit Cost */}
                <div>
                  <label className="font-semibold">Unit Cost</label>
                  <p className="border py-3 px-4 rounded-md w-full bg-gray-100 min-h-[48px] flex items-center">
                    {singleUnitCost !== null ? `$${singleUnitCost.toFixed(2)}` : ''}
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
                    className={`border py-3 px-4 rounded-md w-full text-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${touched.productQuantity && errors.productQuantity ? 'border-red-500' : ''}`}
                  />
                  <ErrorMessage name="productQuantity" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="font-semibold">Total Cost</label>
                  {/* CHANGED: This field is now bound to 'totalCost' */}
                  <Field
                    name="totalCost"
                    type="number"
                    placeholder="Total Cost"
                    readOnly
                    className={`border py-3 px-4 rounded-md w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-100 ${touched.totalCost && errors.totalCost ? 'border-red-500' : ''}`}
                  />
                  <ErrorMessage name="totalCost" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 mt-4 bg-white px-6 ">
              </div>

              <div className="grid grid-cols-1 mt-4 bg-white px-6 ">
                <div className="col-span-2">
                  <label className="font-semibold">Product Description</label>
                  <Field
                    name="productDescription"
                    as="textarea"
                    rows="4"
                    placeholder="Description"
                    className={`border py-3 px-4 rounded-md w-full placeholder-gray-600 bg-gray-100 ${touched.productDescription && errors.productDescription ? 'border-red-500' : ''}`}
                  />
                  <ErrorMessage name="productDescription" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button type="submit" className="px-6 py-2 bg-brand text-white text-md hover:bg-[#1a2e57] transition ml-6" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Stock Order'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default StockOrderForm;
