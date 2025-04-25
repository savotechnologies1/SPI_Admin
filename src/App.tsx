import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import SignIn from "./auth/SignIn";
import DashboardDetails from "./pages/dashboard/DasboardDetails";
import Employees from "./pages/Employee_Information/Employees";
import AddSuppliers from "./pages/supplier/AddSuppliers";
import AddEmployees from "./pages/Employee_Information/AddEmployees";
import SignUp from "./auth/SignUp";
import ForgetPassowrd from "./auth/ForgetPassword";
import OTP from "./auth/OTP";
import ResetPassword from "./auth/ResetPassword";

import EditSuppliers from "./pages/supplier/EditSuppliers";
import SupplierOrders from "./pages/supplier/SupplierOrders";
import SupplierInventory from "./pages/supplier/SupplierInventory";
import SupplierPartList from "./pages/supplier/SupplierPartList";

import CurrentQuality from "./pages/productionLive/CurrentQuality";
import Settings from "./pages/settings/Settings";
import StationLogin from "./pages/production_response/StationLogin";

import VacationList from "./pages/Employee_Information/VacationList";
import VacationApproval from "./pages/Employee_Information/VacationApproval";
import TimeClockList from "./pages/Employee_Information/TimeClockList";
import TimeClockUpdate from "./pages/Employee_Information/TimeClockUpdate";
import WorkInstruction from "./pages/Work_Instrcution.tsx/WorkInstruction";
import AddWorkInstruction from "./pages/Work_Instrcution.tsx/AddWorkInstruction";
import EditWorkInstrcution from "./pages/Work_Instrcution.tsx/EditWorkInstruction";
import ApplyWorkInstruction from "./pages/Work_Instrcution.tsx/ApplyWorkInstruction";
import NewCustomer from "./pages/customerInfo/NewCustomer";
import EditCustomer from "./pages/customerInfo/EditCustomer";
import ProcessList from "./pages/process/ProcessList";
import EditProcess from "./pages/process/EditPorcess";
import Import from "./pages/import/Import";
import UserAccess from "./pages/userAccess/UserAccess";
import PartForm from "./pages/product&BOM/PartForm";
import { PartProvider } from "./components/Context/PartContext";
import PartTable from "./pages/product&BOM/PartTable";
import EditPartForm from "./pages/product&BOM/EditPartForm";
import ProductTree from "./pages/product&BOM/ProductTree";

const App = () => {
  return (
    <PartProvider>
      <Router>
        <Routes>
          {/* Routes without the layout */}
          <Route path="sign-in" element={<SignIn />} />

          <Route path="sign-up" element={<SignUp />} />
          <Route path="forget-password" element={<ForgetPassowrd />} />
          <Route path="otp" element={<OTP />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="station-login" element={<StationLogin />} />

          {/* Routes with the layout */}

          <Route
            path="/"
            element={
              localStorage.getItem("loggedIn") === "true" ? (
                <Layout />
              ) : (
                <Navigate to="/sign-in" />
              )
            }
          >
            <Route index element={<DashboardDetails />} />
            <Route path="dashboardDetailes" element={<DashboardDetails />} />

            <Route path="/employees" element={<Employees />} />
            <Route path="vacation-list" element={<VacationList />} />
            <Route path="vacation-approval" element={<VacationApproval />} />
            <Route path="time-clock" element={<TimeClockList />} />
            <Route path="update" element={<TimeClockUpdate />} />
            <Route path="dashboard/addEmployees" element={<AddEmployees />} />

            <Route path="supplier-list" element={<SupplierPartList />} />
            <Route path="add-supplier" element={<AddSuppliers />} />
            <Route path="edit-supplier" element={<EditSuppliers />} />
            <Route path="supplier-order" element={<SupplierOrders />} />
            <Route path="supplier-inventory" element={<SupplierInventory />} />
            <Route path="work-instruction" element={<WorkInstruction />} />
            <Route
              path="add-work-instruction"
              element={<AddWorkInstruction />}
            />
            <Route
              path="edit-work-instruction"
              element={<EditWorkInstrcution />}
            />
            <Route
              path="apply-work-instruction"
              element={<ApplyWorkInstruction />}
            />

            <Route path="new-customer" element={<NewCustomer />} />
            <Route path="edit-customer" element={<EditCustomer />} />

            <Route path="process-list" element={<ProcessList />} />
            <Route path="edit-process" element={<EditProcess />} />

            <Route path="partform" element={<PartForm />} />
            <Route path="edit-partform" element={<EditPartForm />} />
            <Route path="product-tree" element={<ProductTree />} />
            <Route path="part-table" element={<PartTable />} />

            <Route path="import" element={<Import />} />
            <Route path="user-access" element={<UserAccess />} />

            <Route path="current-quality" element={<CurrentQuality />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </PartProvider>
  );
};

export default App;
