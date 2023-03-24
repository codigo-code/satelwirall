import { useNavigate, useSearchParams } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { useEffect, useRef } from "react";
import { useSnackbar } from "notistack";

export const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  let [searchParams] = useSearchParams();
  const isComponentMounted = useRef(true);
  const { isAuth, loading } = useIsAuthenticated(isComponentMounted);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);

  useEffect(() => {
    if (searchParams.has("unauthorized")) {
      enqueueSnackbar("unauthorized user", {
        variant: "error",
        preventDuplicate: true,
      });
    }
  }, []);
  return (
    <div className="container flex items-center justify-center w-full h-screen m-auto ">
      <div className="flex flex-col items-center justify-between p-20 bg-gray-100 rounded shadow-md h-96">
        <div className="w-72">
          <img
            src={require("../../assets/satelnet.png")}
            alt="satelnet img"
          />
        </div>
        <LoadingOverlay loading={loading} />
        <a
          className="flex items-center justify-between h-12 gap-1 p-1 text-white border rounded bg-sky-600 hover:bg-sky-500 hover:transition-colors"
          href={`${process.env.REACT_APP_BACKEND_URL_BASE}/auth/google`}
        >
          <FcGoogle className="w-10 h-10 p-2 bg-white" />
          <p className="mx-4">Sign in with Google</p>
        </a>
      </div>
    </div>
  );
};

