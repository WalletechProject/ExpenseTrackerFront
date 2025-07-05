import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoutes";
import Register from "../pages/Register";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import Income from "../pages/Income";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />{" "}
          <Route element={<PrivateRoute />}>
            <Route
              path="/"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/expenses"
              element={
                <Layout>
                  <Expenses />
                </Layout>
              }
            />
            <Route
              path="/income"
              element={
                <Layout>
                  <Income />
                </Layout>
              }
            />
          </Route>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
