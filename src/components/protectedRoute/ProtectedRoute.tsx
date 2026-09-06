import { Navigate, Outlet } from "react-router-dom";
import { routes } from "../../shared/lib/constants";

interface ProtectedRouteProps {
  onlyOnAuth?: boolean;
  isAuth: boolean;
}
export const ProtectedRoute = ({ onlyOnAuth, isAuth }: ProtectedRouteProps) => {
  if (onlyOnAuth && isAuth) {
    return <Navigate to={routes.main} />;
  }
  if (!onlyOnAuth && !isAuth) {
    return <Navigate to={routes.auth} />;
  }
  return <Outlet />;
};
