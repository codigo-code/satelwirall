import { IUser } from "satelnet-types";
import { Roles } from "satelnet-constants";
import { NextFunction, Request, Response } from "express";
import { getUserByEmail } from "../services/userService";
import createHttpError from "http-errors";
import moment from "moment";
import { logOutUtils } from "../utils";

const isAuthenticated = (req: Request) => {
  return req.isAuthenticated() && req.user && req.session;
};

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isAuthenticated(req)) {
    const user = await getUserByEmail(req.user as IUser);
    req.body = { role: user?.role };
    next();
    return;
  } else {
    next(createHttpError(401));
  }
};

export const onlyWhitRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isAuthenticated(req)) {
    const reqUser = req.user as IUser;
    const user = await getUserByEmail(reqUser);
    const date1 = moment(reqUser.lastLogin);
    const date2 = moment(user?.updatedAt);
    if (date2.isSameOrAfter(date1) && user?.updatedAt !== undefined) {
      logOutUtils(req, res);
      next(createHttpError(401));
      return;
    }
    if (user?.role !== Roles.NONE) {
      next();
      return;
    } else {
      next(createHttpError(401));
      return;
    }
  } else {
    next(createHttpError(401));
    return;
  }
};

export const onlyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isAuthenticated(req)) {
    const reqUser = req.user as IUser;
    const user = await getUserByEmail(reqUser);
    const date1 = moment(reqUser.lastLogin);
    const date2 = moment(user?.updatedAt);
    if (date2.isSameOrAfter(date1) && user?.updatedAt !== undefined) {
      logOutUtils(req, res);
      next(createHttpError(401));
      return;
    }
    if (user?.role === Roles.ADMIN) {
      next();
      return;
    } else {
      next(createHttpError(401));
      return;
    }
  } else {
    next(createHttpError(401));
    return;
  }
};
