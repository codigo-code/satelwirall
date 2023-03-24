import { IUser } from "satelnet-types";
import { Request, Response } from "express";
import {
  createUser,
  updateUser,
  getUsers,
  getUserByEmail,
} from "../services/userService";

export const get = async (req: Request, res: Response) => {
  const user = await getUserByEmail(req.user as IUser);
  if (!user) res.send("User not found").status(404);
  res.send(user);
};

export const postUser = async (req: Request, res: Response) => {
  const data: IUser = req.body;
  data.createdAt = new Date();
  data.updatedAt = new Date();
  data.updatedBy = req.user as IUser;
  // if user with email already exists return 403
  const savedUser = await createUser(data);
  if (!savedUser) {
    res.sendStatus(403);
  } else {
    res.send(savedUser).status(200);
  }
};

export const putUser = async (req: Request, res: Response) => {
  const data: IUser = req.body;
  data.updatedAt = new Date();
  data.updatedBy = req.user as IUser;
  const updatedUser = await updateUser(data);
  if (!updatedUser) res.send("User not found").status(404);
  res.send(updatedUser);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = await getUsers();
  res.send(allUsers).status(200);
};
