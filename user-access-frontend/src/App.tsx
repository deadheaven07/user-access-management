import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import CreateSoftwarePage from "./pages/CreateSoftwarePage";
import RequestAccessPage from "./pages/RequestAccessPage";
import PendingRequestsPage from "./pages/PendingRequestsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar /> 

      <Routes>
        <Route
  path="/"
  element={
    <ProtectedRoute allowedRoles={["Admin", "Manager", "Employee"]}>
      <Dashboard />
    </ProtectedRoute>
  }
/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/create-software"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <CreateSoftwarePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/request-access"
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <RequestAccessPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pending-requests"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <PendingRequestsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
