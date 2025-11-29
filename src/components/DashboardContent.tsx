import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./dashboard/Home";
import Emissions from "./dashboard/Emissions";
import Goals from "./dashboard/Goals";
import Indicators from "./dashboard/Indicators";
import Reports from "./dashboard/Reports";
import Initiatives from "./dashboard/Initiatives";
import Scenarios from "./dashboard/Scenarios";
import Alerts from "./dashboard/Alerts";
import History from "./dashboard/History";
import Users from "./dashboard/Users";

const DashboardContent = () => {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="emissions" element={<Emissions />} />
        <Route path="goals" element={<Goals />} />
        <Route path="indicators" element={<Indicators />} />
        <Route path="reports" element={<Reports />} />
        <Route path="initiatives" element={<Initiatives />} />
        <Route path="scenarios" element={<Scenarios />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="history" element={<History />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </div>
  );
};

export default DashboardContent;