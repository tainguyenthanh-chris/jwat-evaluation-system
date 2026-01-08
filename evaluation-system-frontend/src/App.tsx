import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ReviewPage from "./pages/reviewPage/ReviewPage";
import FormBuilderPage from "./pages/form/FormBuilderPage";
import { Provider } from "./components/ui/provider";
import { Toaster } from "./components/ui/toaster";
import EmpTablePage from "./pages/emp/EmpTablePage";

function App() {
  return (
    <Provider>
      <Toaster />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/review" element={<ReviewPage />}></Route>
          <Route path="/form-builder" element={<FormBuilderPage />}></Route>
          <Route path="/employees-list" element={<EmpTablePage />}></Route>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
