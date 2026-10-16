import { Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Employees from "./pages/Employees";
import Leave from "./pages/Leave";
import Attendence from "./pages/Attendence";
import Login from "./components/oth/Login";
import GPS from "./pages/GPS";
import { useEffect } from "react";
import { userLocation } from "./utils/helperfn";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          {/* ROLE protected */}
          <Route element={<ProtectedRoutes role={["admin", "operator"]} />}>
            <Route path="/employee" element={<Employees />} />
          </Route>
          <Route element={<ProtectedRoutes role={["admin"]} />}>
            <Route path="/gps" element={<GPS />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/attendence" element={<Attendence />} />
            <Route path="/advance" element={<Attendence />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
