import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
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
import OperationPerformance from "./pages/Operation_performance/OperationPerformance";
import QualityPerformance from "./pages/qualityPerformance/QualityPerformance";
import ContinuousImprovement from "./pages/Continuous_Improvement/ContinuousImprovement";
import CustomerRelation from "./pages/Customer_Relation/CustomerRelation";
import BusinessIntelligence from "./pages/business-intelligence/BusinessIntelligence";
import BusinessAnalysis from "./pages/business-analysis/BusinessAnalysis";
import Projection from "./pages/projection/Projection";
import StockOrder from "./pages/order_schedule/StockOrder";
import CustomOrder from "./pages/order_schedule/CustomOrder";
import StockOrderSchedule from "./pages/order_schedule/StockOrderSchedule";
import CustomOrderSchedule from "./pages/order_schedule/CustomOrderSchedule";
import CustomOrderDetails from "./pages/order_schedule/CustomOrderDetails";
import DailySchedule from "./pages/order_schedule/DailySchedule";
import LaborForecast from "./pages/order_schedule/LaborForecast";
import InventoryStatus from "./pages/order_schedule/InventoryStatus";
import CapacityStatus from "./pages/order_schedule/CapacityStatus";
import LiveProductionGoal from "./pages/productionLive/LiveProductionGoal";
import CurrentStatus from "./pages/productionLive/CurrentStatus";
import EmailPasswordModal from "./pages/Employee_Information/Employee_Information/EmailPasswordModal";
import StockOrderScheduleList from "./pages/order_schedule/StockOrderScheduleList";
import AllScrapEntries from "./pages/production_response/AllScrapEntries";
import EditPartScrapEntry from "./pages/production_response/EditPartScrapEntry";

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
          <Route
            path="station-login"
            element={token ? <StationLogin /> : <SignIn />}
          />
          <Route
            path="station-logout"
            element={token ? <StationLogin /> : <SignIn />}
          />

          <Route
            path="run-schedule/:id"
            element={token ? <RunSchedule /> : <SignIn />}
          />
          <Route
            path="run-with-scan/:id"
            element={token ? <RunWithScan /> : <SignIn />}
          />
          <Route
            path="training/:id"
            element={token ? <Training /> : <Training />}
          />
          <Route
            path="scrap-entry"
            element={token ? <ScrapEntry /> : <Training />}
          />
          <Route
            path="edit-part-scrap-entry/:id"
            element={token ? <EditPartScrapEntry /> : <Training />}
          />
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

            <Route path="stock-order" element={<StockOrder />} />
            <Route path="custom-order" element={<CustomOrder />} />
            <Route
              path="stock-order-schedule"
              element={<StockOrderSchedule />}
            />
            <Route
              path="stock-order-schedule-list"
              element={<StockOrderScheduleList />}
            />
            <Route
              path="custom-order-schedule"
              element={<CustomOrderSchedule />}
            />
            <Route
              path="email-password-detail"
              element={<EmailPasswordModal />}
            />
            <Route path="custom-details" element={<CustomOrderDetails />} />
            <Route path="daily-schedule" element={<DailySchedule />} />
            <Route path="labor-forecast" element={<LaborForecast />} />
            <Route path="inventory-status" element={<InventoryStatus />} />
            <Route path="capacity-status" element={<CapacityStatus />} />
            <Route path="live-production" element={<LiveProductionGoal />} />
            <Route path="current-status" element={<CurrentStatus />} />
            <Route path="current-quality" element={<CurrentQuality />} />
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
            <Route path="scrap-entries" element={<AllScrapEntries />} />

            <Route path="/employees" element={<Employees />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/edit-employee/:id" element={<EditEmployee />} />
            <Route path="vacation-list" element={<VacationList />} />
            <Route path="vacation-approval" element={<VacationApproval />} />
            <Route path="time-clock" element={<TimeClockList />} />
            <Route path="update" element={<TimeClockUpdate />} />
            <Route path="clock-in-out" element={<ClockInOut />} />
            <Route path="vaction-request" element={<VacationRequest />} />
            <Route path="time-sheet" element={<TimeSheet />} />
            <Route
              path="operation-performance"
              element={<OperationPerformance />}
            />
            <Route
              path="quality-performance"
              element={<QualityPerformance />}
            />
            <Route
              path="continuous-improvement"
              element={<ContinuousImprovement />}
            />
            <Route path="customer-relation" element={<CustomerRelation />} />
            <Route
              path="business-intelligence"
              element={<BusinessIntelligence />}
            />
            <Route path="business-analysis" element={<BusinessAnalysis />} />
            <Route path="projecion" element={<Projection />} />
          </Route>
        </Routes>
      </Router>
    </PartProvider>
  );
};

export default App;
