import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  children?: ReactElement;
  admin?: boolean;
  adminOnly?: boolean;
  isAuthenticated: boolean;
  redirect?: string;
};

const ProtectedRoute = ({
  children,
  admin,
  adminOnly,
  redirect = "/",
  isAuthenticated,
}: Props) => {
  console.log('isAuthenticated:', isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={redirect} replace />;
  }
  if (adminOnly && !admin) {
    return <Navigate to={redirect} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
