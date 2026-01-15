import { Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ReviewPage from "./pages/reviewPage/ReviewPage";
import FormBuilderPage from "./adminPages/form/FormBuilderPage";
import EvaluationProgressPage from "./pages/evaluationProgress/EvaluationProgressPage";
import EmpTablePage from "./pages/emp/EmpTablePage";
import HistoryPage from "./pages/historyPage/HistoryPage";
import HistoryDetailPage from "./pages/historyPage/HistoryDetailPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import Forbidden from "./pages/Forbidden";
import AdminEmployeePage from "./adminPages/adminEmployeePage/AdminEmployeePage";

import { Provider } from "./components/ui/provider";
import { Toaster } from "./components/ui/toaster";
import SigninPage from "./pages/auth/SigninPage";
// import ProtectedRoute from "./components/ui/ProtectedRoute";

function App() {
  return (
    <Provider>
      <Toaster />
      <Routes>
        <Route path="/login" element={<SigninPage />} />
        <Route path="/" element={<SigninPage />} />

        <Route element={<Layout />}>
          {/* protected */}
          <Route
            path="/review"
            element={
              <ProtectedRoute menuKey="review">
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<ReviewPage />} />
            <Route path="employee/:employeeNo" element={<ReviewPage />} />
          </Route>
          <Route
            path="/form-builder"
            element={
              <ProtectedRoute menuKey="form-builder">
                <FormBuilderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/evaluation-progress"
            element={
              <ProtectedRoute menuKey="evaluation-progress">
                <EvaluationProgressPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-employee-list"
            element={
              <ProtectedRoute menuKey="my-employee-list">
                <EmpTablePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute menuKey="history">
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<HistoryPage />} />
            <Route path="employee/:employeeNo" element={<HistoryPage />} />
            <Route path=":formSubmissionId" element={<HistoryDetailPage />} />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute menuKey="admin">
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route path="employee" element={<AdminEmployeePage />} />
          </Route>
        </Route>

        {/* forbidden */}
        <Route path="/403" element={<Forbidden />} />
      </Routes>
    </Provider>
  );
}

export default App;
