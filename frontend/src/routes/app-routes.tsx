import { Route, Routes } from 'react-router-dom';
import DashboardPage from '../pages/dashboard/dashboard-page';
import HomePage from '../pages/home/home-page';
import LoginPage from '../pages/login/login-page';
import CreateProjectPage from '../pages/projects/create-project-page';
import EditProjectPage from '../pages/projects/edit-project-page';
import UpdateGoalsPage from '../pages/projects/update-goals-page';
import RegisterPage from '../pages/register/register-page';
import ProtectedRoute from './protected-route';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/new"
        element={
          <ProtectedRoute>
            <CreateProjectPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:id/edit"
        element={
          <ProtectedRoute>
            <EditProjectPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:id/goals"
        element={
          <ProtectedRoute>
            <UpdateGoalsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
