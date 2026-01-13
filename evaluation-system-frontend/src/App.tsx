import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ReviewPage from "./pages/reviewPage/ReviewPage";
import FormBuilderPage from "./pages/form/FormBuilderPage";
import EvaluationProgressPage from "./pages/evaluationProgress/EvaluationProgressPage";
import EmpTablePage from "./pages/emp/EmpTablePage";
import HistoryPage from "./pages/historyPage/HistoryPage";
import HistoryDetailPage from "./pages/historyPage/HistoryDetailPage";

import { Provider } from "./components/ui/provider";
import { Toaster } from "./components/ui/toaster";
import SigninPage from "./pages/auth/SigninPage";
import ProtectedRoute from "./components/ui/ProtectedRoute";

function App() {
  return (
    <Provider>
      <Toaster />

      <Routes>
        <Route path="/login" element={<SigninPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/form-builder" element={<FormBuilderPage />} />
            <Route
              path="/evaluation-progress"
              element={<EvaluationProgressPage />}
            />
            <Route path="/employees-list" element={<EmpTablePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route
              path="/history/:formSubmissionId"
              element={<HistoryDetailPage />}
            />
          </Route>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
