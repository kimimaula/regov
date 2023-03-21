import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import ForgotPassword from "./Pages/ForgotPassword";
import Registration from "./Pages/Registration";
import HomePage from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { PageLayout } from "./Components";

const App = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PageLayout>
            <Login />
          </PageLayout>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PageLayout>
            <ForgotPassword />
          </PageLayout>
        }
      />
      <Route
        path="/registration"
        element={
          <PageLayout>
            <Registration />
          </PageLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PageLayout>
            <Dashboard />
          </PageLayout>
        }
      />
      <Route
        path="/"
        element={
          <PageLayout>
            <HomePage />
          </PageLayout>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
