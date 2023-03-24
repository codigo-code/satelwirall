import moment from "moment";
import { IUser } from "satelnet-types";
import { iTableUser } from "./types";

export const getFormattedData = (users: IUser[]): iTableUser[] => {
  return users.map((user: IUser) => {
    return {
      email: user.email,
      updatedBy: user.updatedBy?.email ?? "none",
      updatedAt: user?.updatedAt
        ? moment(user.updatedAt).format("dddd, MMMM Do YYYY, h:mm:ss a")
        : "none",
      name: user.name ?? "none",
      role: user.role,
    };
  });
};
