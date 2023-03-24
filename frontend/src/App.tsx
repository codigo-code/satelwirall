import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Roles } from "satelnet-constants";
import { Login, Dashboard, Admin } from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";
import { store } from "./redux/store";
import { Unauthorized } from "./pages/Unauthorized";
function App() {
  return (
    <SnackbarProvider maxSnack={1}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />
            {/* ADMIN */}
            <Route element={<ProtectedRoute allowedRoles={[Roles.ADMIN]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>
            {/* DASHBOARD */}
            <Route
              element={
                <ProtectedRoute
                  allowedRoles={[
                    Roles.ADMIN,
                    Roles.COMERCIAL,
                    Roles.OPERATIONAL,
                    Roles.OPERATIONAL_COMMERCIAL
                  ]}
                />
              }
            >
              <Route path="/" element={<Dashboard />} />
            </Route>
            <Route path="unauthorized" element={<Unauthorized />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </SnackbarProvider>
  );
}

export default App;
