import {
  Routes,
  Route,
  BrowserRouter as Router,
  // Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import SignIn from "./auth/SignIn";
import DashboardDetails from "./pages/dashboard/DasboardDetails";
import SignUp from "./auth/SignUp";
import ForgetPassowrd from "./auth/ForgetPassword";
import OTP from "./auth/OTP";
import ResetPassword from "./auth/ResetPassword";
import CurrentQuality from "./pages/productionLive/CurrentQuality";
import Settings from "./pages/settings/Settings";
import StationLogin from "./pages/production_response/StationLogin";
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
import { ToastContainer } from "react-toastify";
import AddProcess from "./pages/process/AddProcess";
import CustomerList from "./pages/customerInfo/CustomerList";
import WorkInstructionList from "./pages/Work_Instrcution.tsx/WorkInstructionList";
import { useAuth } from "./context/AuthContext";
import SupplierList from "./pages/supplier_chain/supplierList";
import EditSuppliers from "./pages/supplier_chain/EditSuppliers";
import SupplierOrders from "./pages/supplier_chain/SupplierOrders";
import SupplierInventory from "./pages/supplier_chain/SupplierInventory";
import SupplierPartList from "./pages/supplier_chain/SupplierPartList";
import StationLogout from "./pages/production_response/StationLogout";
import RunSchedule from "./pages/production_response/RunSchedule";
import RunWithScan from "./pages/production_response/RunWithScan";
import Training from "./pages/production_response/Training";
import ScrapEntry from "./pages/production_response/ScrapEntry";
import TimeClockList from "./pages/Employee_Information/TimeClockList";
import AddSuppliers from "./pages/supplier_chain/AddSuppliers";
import ProductNumber from "./pages/product&BOM/ProductNumber";
import EditProductForm from "./pages/product&BOM/EditProductForm";
import Employees from "./pages/Employee_Information/Employee_Information/Employees";
import AddEmployee from "./pages/Employee_Information/Employee_Information/AddEmployee";
import EditEmployee from "./pages/Employee_Information/Employee_Information/EditEmployee";
import VacationApproval from "./pages/Employee_Information/Employee_Information/VacationApproval";
import TimeClockUpdate from "./pages/Employee_Information/Employee_Information/TimeClockUpdate";
import ClockInOut from "./pages/timeClock/timeClock/ClockInOut";
import VacationRequest from "./pages/timeClock/timeClock/VacationRequest";
import VacationList from "./pages/Employee_Information/Employee_Information/VacationList";
import TimeSheet from "./pages/timeClock/timeClock/TimeSheet";

const App = () => {
  const { token } = useAuth();

  return (
    <PartProvider>
      <ToastContainer />
      <Router basename="/admin">
        <Routes>
          {/* Public Routes */}
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="forget-password" element={<ForgetPassowrd />} />
          <Route path="otp-verify" element={<OTP />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="station-login" element={<StationLogin />} />
          <Route path="station-logout" element={<StationLogout />} />

          <Route path="run-schedule" element={<RunSchedule />} />
          <Route path="run-with-scan" element={<RunWithScan />} />
          <Route path="training" element={<Training />} />

          {/* Protected Routes */}
          {/* <Route
            path="/"
            element={
              token ? <Layout /> : <Navigate to="/sign-in" replace />
            }
          > */}
          <Route path="/" element={token ? <Layout /> : <SignIn />}>
            <Route index element={<DashboardDetails />} />
            <Route path="dashboardDetailes" element={<DashboardDetails />} />
            <Route path="work-instruction" element={<WorkInstruction />} />
            <Route
              path="add-work-instruction"
              element={<AddWorkInstruction />}
            />
            <Route
              path="edit-work-instruction/:id"
              element={<EditWorkInstrcution />}
            />
            <Route
              path="apply-work-instruction"
              element={<ApplyWorkInstruction />}
            />
            <Route
              path="work-instructions-list"
              element={<WorkInstructionList />}
            />

            <Route path="new-customer" element={<NewCustomer />} />
            <Route path="edit-customer/:id" element={<EditCustomer />} />
            <Route path="customer-list" element={<CustomerList />} />
            <Route path="process-list" element={<ProcessList />} />
            <Route path="edit-process/:id" element={<EditProcess />} />
            <Route path="add-process" element={<AddProcess />} />
            <Route path="partform" element={<PartForm />} />
            <Route path="add-product-number" element={<ProductNumber />} />
            <Route path="edit-part/:id" element={<EditPartForm />} />
            <Route path="edit-product/:id" element={<EditProductForm />} />
            <Route path="product-tree" element={<ProductTree />} />
            <Route path="part-table" element={<PartTable />} />
            <Route path="import" element={<Import />} />
            <Route path="user-access" element={<UserAccess />} />
            <Route path="current-quality" element={<CurrentQuality />} />
            <Route path="settings" element={<Settings />} />
            <Route path="all-supplier" element={<SupplierList />} />
            <Route path="add-supplier" element={<AddSuppliers />} />
            <Route path="edit-supplier/:id" element={<EditSuppliers />} />
            <Route path="supplier-order" element={<SupplierOrders />} />
            <Route path="supplier-inventory" element={<SupplierInventory />} />
            <Route path="supplier-list" element={<SupplierPartList />} />
            <Route path="Scrap-entry" element={<ScrapEntry />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/edit-employee" element={<EditEmployee />} />
            <Route path="vacation-list" element={<VacationList />} />
            <Route path="vacation-approval" element={<VacationApproval />} />
            <Route path="time-clock" element={<TimeClockList />} />
            <Route path="update" element={<TimeClockUpdate />} />
            <Route path="clock-in-out" element={<ClockInOut />} />
            <Route path="vaction-request" element={<VacationRequest />} />
            <Route path="time-sheet" element={<TimeSheet />} />
          </Route>
        </Routes>
      </Router>
    </PartProvider>
  );
};

export default App;
