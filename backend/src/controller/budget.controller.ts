import {
  createBudget,
  deleteBudget,
  getBudgets,
  getBudgetsByStatus,
  updateBudget,
} from "./../services/budgetService";
import { IBudget, IUser } from "satelnet-types";
import { Request, Response } from "express";

export const postBudget = async (req: Request, res: Response) => {
  const data: IBudget = req.body;
  data.createdAt = new Date();
  data.updatedAt = new Date();
  data.updatedBy = req.user as IUser;
  // if user with email already exists return 403
  const savedBudget = await createBudget(data);
  if (!savedBudget) {
    res.sendStatus(403);
  } else {
    res.send(savedBudget).status(200);
  }
};

export const putBudget = async (req: Request, res: Response) => {
  const data: IBudget = req.body;
  data.updatedAt = new Date();
  data.updatedBy = req.user as IUser;
  const updatedBudget = await updateBudget(data);
  if (!updatedBudget) res.send("Budget not found").status(404);
  res.send(updatedBudget);
};

export const delBudget = async (req: Request, res: Response) => {
  const id = req.query.id;
  if (!id) res.send("Bad request").status(400);
  const deleteResult = deleteBudget(id as string);
  if (!deleteResult) res.send("Budget not found").status(404);
  res.send(deleteResult);
};

export const getAllBudgets = async (req: Request, res: Response) => {
  const allBudgets = await getBudgets();
  res.send(allBudgets).status(200);
};

export const getBudgetsByStatusType = async (req: Request, res: Response) => {
  const queryArray = req?.query?.status as string;
  const allBudgets = await getBudgetsByStatus(queryArray.split(","));
  res.send(allBudgets).status(200);
};
