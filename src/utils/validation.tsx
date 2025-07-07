import * as Yup from 'yup';


export const stockOrderValidation = Yup.object().shape({
    orderNumber: Yup.string().required("Order Number is required"),
    orderDate: Yup.date().required("Order Date is required"),
    shipDate: Yup.date()
        .required("Ship Date is required")
        .min(Yup.ref("orderDate"), "Ship date can't be before the order date"),
    customerId: Yup.string().required("Please select a customer or add a new one."),
    customerName: Yup.string().required("Customer Name is required"),
    customerEmail: Yup.string().email("Invalid email format").required("Customer Email is required"),
    customerPhone: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be only digits")
        .min(7, "Phone number must be at least 7 digits")
        .max(15, "Phone number must be at least 15 digits")
        .required("Customer Phone is required"),
    productNumber: Yup.string().required("Product Number is required"),
    cost: Yup.number().typeError("Cost must be a number").positive("Cost must be positive").required("Cost is required"),
    productQuantity: Yup.number().typeError("Quantity must be a number").positive("Quantity must be positive").integer("Quantity must be a whole number").required("Quantity is required"),
    productDescription: Yup.string().required("Product Description is required"),
});


