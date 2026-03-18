import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/pages/Login";
import RegisterCustomer from "@/pages/RegisterCustomer";
import RegisterAgency from "@/pages/RegisterAgency";
import AvailableCars from "@/pages/AvailableCars";
import AddEditCar from "@/pages/AddEditCar";
import AgencyBookings from "@/pages/AgencyBookings";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/cars" replace />} />
            <Route path="/cars" element={<AvailableCars />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register/customer" element={<RegisterCustomer />} />
            <Route path="/register/agency" element={<RegisterAgency />} />
            <Route
              path="/agency/cars/add"
              element={
                <ProtectedRoute role="agency">
                  <AddEditCar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agency/cars/edit/:id"
              element={
                <ProtectedRoute role="agency">
                  <AddEditCar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agency/bookings"
              element={
                <ProtectedRoute role="agency">
                  <AgencyBookings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}
