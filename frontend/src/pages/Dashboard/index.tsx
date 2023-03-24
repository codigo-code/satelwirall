import NavBar from "../../components/NavBar";
import { useSelector } from "react-redux";
import { routes } from "../../components/NavBar/utils";

import { RootState } from "../../redux/store";
import { Roles } from "satelnet-constants";
import CommercialOperational from "../../screens/CommercialOperational";
import { useEffect, useState } from "react";
import {
  COMMERCIAL,
  OPERATIONAL,
  SCREEN_COORDITANTION,
  SCREEN_OPERATIONALS,
} from "../../constants/views";
import { TbFileDollar, TbListCheck, TbSwitch } from "react-icons/tb";
import CoordinationSheet from "../../screens/CoordinationSheet";

export const Dashboard = () => {
  const currentUser = useSelector((store: RootState) => store.user.currentUser);
  const navBarRoutes = currentUser?.role === Roles.ADMIN ? [routes.admin] : [];
  const [screen, setScreen] = useState(SCREEN_OPERATIONALS);
  const [showSwitch, setShowSwitch] = useState<boolean>(false);
  const [view, setView] = useState<string>("");

  useEffect(() => {
    const allowersUsers = [Roles.ADMIN, Roles.OPERATIONAL_COMMERCIAL];
    const aux = allowersUsers.includes(currentUser?.role ?? "");
    setShowSwitch(aux);
    setView(
      aux
        ? COMMERCIAL
        : currentUser?.role === Roles.COMERCIAL
        ? COMMERCIAL
        : OPERATIONAL
    );
  },[currentUser]);

  const handleView = () => {
    setView((prev) => (prev === COMMERCIAL ? OPERATIONAL : COMMERCIAL));
  };
  return (
    <div className="w-full h-screen">
      <NavBar
        components={
          <div className="flex gap-6">
            {showSwitch && screen === SCREEN_OPERATIONALS && (
              <div
                className="bg-orange-400 navBarButtons hover:bg-orange-300"
                onClick={handleView}
              >
                <TbSwitch />
                Cambiar a vista{" "}
                {view === OPERATIONAL ? "comercial" : "operacional"}
              </div>
            )}
            <div
              className="navBarButtons"
              onClick={() => setScreen(SCREEN_OPERATIONALS)}
            >
              <TbFileDollar />
              Costos Operacionales
            </div>
            <div
              className="navBarButtons"
              onClick={() => setScreen(SCREEN_COORDITANTION)}
            >
              <TbListCheck />
              Planilla de Coordinacion
            </div>
          </div>
        }
        routes={navBarRoutes}
      />
      {screen === SCREEN_OPERATIONALS ? (
        <CommercialOperational view={view} />
      ) : <CoordinationSheet/>}
    </div>
  );
};
