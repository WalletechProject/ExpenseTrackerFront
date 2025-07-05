import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoutes";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<div>Sign Up Page</div>} />

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<div>Home Page</div>} />
          </Route>

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
