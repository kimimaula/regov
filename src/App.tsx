import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import ForgotPassword from "./Pages/ForgotPassword";
import Registration from "./Pages/Registration";
import HomePage from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Events from "./Pages/Events";
import Event from "./Pages/Event";
import Admin from "./Pages/Admin";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./Components";

console.log("---app is deployed");
const App = () => {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <PublicRoute>
            <Admin />
          </PublicRoute>
        }
      />
      <Route
        path="/events"
        element={
          <PublicRoute>
            <Events />
          </PublicRoute>
        }
      />
      <Route
        path="/event/:id"
        element={
          <PublicRoute>
            <Event />
          </PublicRoute>
        }
      />
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
      <Route
        path="*"
        element={
          <PublicRoute>
            <ErrorPage />
          </PublicRoute>
        }
      />
    </Routes>
  );
};

export default App;
