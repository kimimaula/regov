import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import ForgotPassword from "./Pages/ForgotPassword";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
