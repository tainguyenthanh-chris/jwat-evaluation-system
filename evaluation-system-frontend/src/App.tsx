import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ReviewPage from "./pages/reviewPage/ReviewPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/review" element={<ReviewPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
