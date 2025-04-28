import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
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
