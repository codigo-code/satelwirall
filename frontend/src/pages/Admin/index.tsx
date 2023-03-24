import NavBar from "../../components/NavBar";
import { routes } from "../../components/NavBar/utils";
import UserAdmin from "../../screens/Admin";
import { IUser } from "satelnet-types";
import { useEffect, useState } from "react";
import { createUser, updateUser, getList } from "../../services";
import { useSnackbar } from "notistack";
import { iTableUser } from "../../screens/Admin/types";

export const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);
  const navBarRoutes = [routes.home];
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (fetching) {
      if (!loading) setLoading(true);
      getList()
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          enqueueSnackbar(error, {
            variant: "error",
          });
        })
        .finally(() => {
          setLoading(false);
          setFetching(false);
        });
    }
  }, [fetching]);

  const handleCreateUser = (newData: iTableUser): Promise<iTableUser> => {
    setLoading(true);
    const userToCreate: IUser = {
      email: newData.email ?? "",
      name: newData.name ?? "",
      role: newData.role ?? "none",
    };

    return createUser(userToCreate)
      .then((data) => {
        enqueueSnackbar("User creado", {
          variant: "success",
        });
        return Promise.resolve(newData);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
        return Promise.resolve(newData);
      })
      .finally(() => {
        setFetching(true);
      });
  };

  const handleUpdateUser = (
    newData: iTableUser,
    oldData: iTableUser
  ): Promise<iTableUser> => {
    setLoading(true);
    const userToUpDate: IUser = {
      email: newData.email ?? "",
      name: newData.name ?? "",
      role: newData.role ?? "none",
    };

    return updateUser(userToUpDate)
      .then((data) => {
        enqueueSnackbar("Usuario actualizado", {
          variant: "success",
        });
        return Promise.resolve(newData);
      })
      .catch((error) => {
        enqueueSnackbar("error", {
          variant: "error",
        });
        return Promise.reject(error);
      })
      .finally(() => {
        setLoading(false);
        setFetching(true);
      });
  };

  return (
    <div className="relative w-full h-screen">
      <NavBar routes={navBarRoutes} />
      <UserAdmin
        data={users}
        updateUser={handleUpdateUser}
        createUser={handleCreateUser}
        loading={loading}
      />
    </div>
  );
};
