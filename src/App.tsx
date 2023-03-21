import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import ForgotPassword from "./Pages/ForgotPassword";
import Registration from "./Pages/Registration";
import HomePage from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./Components";

const App = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/registration"
        element={
          <PublicRoute>
            <Registration />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/"
        element={
          <PublicRoute>
            <HomePage />
          </PublicRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
