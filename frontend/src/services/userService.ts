import { IUser } from "satelnet-types";
const URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE as string;

const isAuthenticated = () => {
  return fetch(`${URL_BASE}/isAuth`, {
    headers: {
      "Content-Type": "application/json",
      pragma: "no-cache",
      "cache-control": "no-cache",
    },
    credentials: "include",
  });
};

const createUser = (user: IUser): Promise<IUser> => {
  return fetch(`${URL_BASE}/user`, {
    headers: {
      "Content-Type": "application/json",
      pragma: "no-cache",
      "cache-control": "no-cache",
    },
    method: "POST",
    credentials: "include",
    body: JSON.stringify(user),
  })
    .then((data) => {
      if(data.status === 403) throw new Error(`User ${user.email} already exists!`)
      return data.json()
    }) as Promise<IUser>;
};

const updateUser = (data: IUser): Promise<IUser> => {
  return fetch(`${URL_BASE}/user`, {
    headers: {
      "Content-Type": "application/json",
      pragma: "no-cache",
      "cache-control": "no-cache",
    },
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(data),
  })
    .then((data) => data.json())
    .catch((err) => {
      return err;
    }) as Promise<IUser>;
};

const getList = (): Promise<IUser[]> => {
  return fetch(`${URL_BASE}/user/list`, {
    headers: {
      "Content-Type": "application/json",
      pragma: "no-cache",
      "cache-control": "no-cache",
    },
    method: "GET",
    credentials: "include",
  })
    .then((data) => data.json())
    .catch((err) => {
      return err;
    }) as Promise<IUser[]>;
};
export { isAuthenticated, createUser, updateUser, getList };
