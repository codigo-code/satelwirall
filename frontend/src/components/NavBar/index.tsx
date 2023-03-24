import { useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { NavBarRoutes } from "./utils";

interface Props {
  routes?: NavBarRoutes[];
  components?: JSX.Element;
}

const NavBar = ({ routes, components }: Props) => {
  const navigation = useNavigate();
  const handleLogout = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL_BASE}/auth/logout`, {
      headers: {
        "Content-Type": "application/json",
        pragma: "no-cache",
        "cache-control": "no-cache",
      },
      credentials: "include",
    }).then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigation("/login");
    });
  };

  return (
    <div className="flex items-center justify-between w-full px-5 py-3 bg-slate-600">
      <div
        className="w-48 cursor-pointer"
        onClick={() => {
          navigation("/");
        }}
      >
        <img
          src={require("../../assets/default-logo.png")}
          alt="satelnet img"
        />
      </div>
      {components}
      <div className="flex items-center justify-center gap-2">
        {routes?.map((data, index) => (
          <div
            key={`nabvar-index${index}`}
            className="px-4 py-2 underline rounded-md cursor-pointer text-slate-50 hover:transition-colors hover:text-blue-800"
            onClick={() => {
              navigation(data.route);
            }}
          >
            {data.title}
          </div>
        ))}
        <div
          className="navBarButtons bg-slate-500 hover:bg-slate-400"
          onClick={handleLogout}
        >
          Logout
          <TbLogout />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
