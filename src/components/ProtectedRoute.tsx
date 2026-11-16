// Joao Ricardo
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// se nao estiver logado manda pro login, e guarda a pagina que a pessoa queria abrir
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" state={{ voltarPara: location.pathname }} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
