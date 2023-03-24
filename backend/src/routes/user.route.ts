import express, {Router} from 'express';
import {
  postUser,
  putUser,
  getAllUsers,
} from "../controller/user.controller";

const router: Router = Router();

// router.get("/me", getUser);
router.get("/list", getAllUsers);
router.post("", postUser);
router.put("", putUser);

export default router;
