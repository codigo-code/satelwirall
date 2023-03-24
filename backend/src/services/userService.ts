import { IUser } from "satelnet-types";
import { User } from "../db/models/user.schema";

export const createUser = async (data: IUser) => {
  const user = new User(data);
  const userResult = await getUserByEmail(data);
  if (userResult) return null;
  return await (await user.save({})).populate("updatedBy");
};

export const updateUser = async (data: IUser) => {
  const user = await User.findOneAndUpdate({ email: data.email }, data, {
    returnOriginal: false,
  }).exec();
  return user;
};

export const getUsers = async () => {
  const users = await User.find().populate("updatedBy");
  return users;
};

export const getUserByEmail = async (data: IUser) => {
  const user = User.findOne({ email: data.email }).exec();
  return user;
};
