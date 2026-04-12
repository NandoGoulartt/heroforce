import { Route, Routes } from 'react-router-dom';
import DashboardPage from '../pages/dashboard/dashboard-page';
import LoginPage from '../pages/login/login-page';
import ProtectedRoute from './protected-route';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}