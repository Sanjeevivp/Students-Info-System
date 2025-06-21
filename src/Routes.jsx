import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import LoginScreen from "pages/login-screen";
import AdminDashboard from "pages/admin-dashboard";
import StudentManagement from "pages/student-management";
import StudentProfileDetail from "pages/student-profile-detail";
import StudentDashboard from "pages/student-dashboard";
import ReportsGeneration from "pages/reports-generation";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/login-screen" element={<LoginScreen />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/student-management" element={<StudentManagement />} />
          <Route path="/student-profile-detail" element={<StudentProfileDetail />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/reports-generation" element={<ReportsGeneration />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;