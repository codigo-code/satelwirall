import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import { setCurrentUser } from "../../redux/states/users";
import { LoadingOverlay } from "../LoadingOverlay";
interface Props {
  allowedRoles: string[];
}
const ProtectedRoute = ({ allowedRoles }: Props) => {
  const dispatch = useDispatch();
  const isComponentMounted = useRef(true);
  const { loading, isAuth, error, role } =
    useIsAuthenticated(isComponentMounted);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading) {
      if (!isAuth && error) navigate("/login", { replace: true });
      else {
        dispatch(
          setCurrentUser({
            role,
          })
        );
        if (!allowedRoles.includes(role)) {
          navigate("/unauthorized", { replace: true });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, loading, error, role]);

  if (loading) return <LoadingOverlay loading={true} />;

  return <Outlet />;
};

export default ProtectedRoute;
