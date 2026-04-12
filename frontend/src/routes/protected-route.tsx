import { Navigate } from 'react-router-dom';
import { hasValidSession } from '../utils/session';

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  if (!hasValidSession()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
