import * as Yup from "yup";
export const stockOrderValidation = Yup.object().shape({
  orderNumber: Yup.string().required("Order Number is required"),
  orderDate: Yup.date().required("Order Date is required"),
  shipDate: Yup.date()
    .required("Ship Date is required")
    .min(Yup.ref("orderDate"), "Ship date can't be before the order date"),
  // customerId: Yup.string().required(
  //   "Please select a customer or add a new one."
  // ),
  // customerId: Yup.string().required(
  //   "Please select a customer or add a new one."
  // ),
  customerName: Yup.string().required("Customer Name is required"),
  customerEmail: Yup.string().email("Invalid email format"),

  customerPhone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number must be at most 15 digits"),
  cost: Yup.number()
    .typeError("Cost must be a number")
    .positive("Cost must be positive")
    .required("Cost is required"),
  productQuantity: Yup.number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be positive")
    .integer("Quantity must be a whole number")
    .required("Quantity is required"),
  productDescription: Yup.string().required("Product Description is required"),
});
export const customOrderValidation = Yup.object().shape({
  orderDate: Yup.date().required("Order date is required"),
  shipDate: Yup.date()
    .required("Ship date is required")
    .min(Yup.ref("orderDate"), "Ship date cannot be before order date"),
  // customerId: Yup.string().required("Please select or add a customer"),
  customerName: Yup.string().required("Customer name is required"),
  customerEmail: Yup.string().email("Invalid email format"),
  customerPhone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number must be at most 15 digits"),
  productId: Yup.string().required("Product number is required"),
  // part_id: Yup.string().required("Part Number is required"),
  productQuantity: Yup.number()
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
  totalCost: Yup.number().required("Total cost could not be calculated"),
  // processDetails: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       totalTime: Yup.number()
  //         .typeError("Must be a number")
  //         .required("Time is required")
  //         .min(1, "Time must be > 0"),
  //       process: Yup.string().required("Process is required"),
  //       assignTo: Yup.string().required("Assignment is required"),
  //     })
  //   )
  //   .min(1, "At least one process is required"),
});

export const stockOrderShedule = Yup.object().shape({
  customerName: Yup.string().required("Customer name is required"),
  shipDate: Yup.date().required("Ship date is required").nullable(),
  partNumber: Yup.string(),
});
