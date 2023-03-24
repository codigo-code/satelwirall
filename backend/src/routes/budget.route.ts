import { Router } from "express";
import {
  putBudget,
  getAllBudgets,
  getBudgetsByStatusType,
  delBudget,
} from "../controller/budget.controller";

const router: Router = Router();

router.get("/list", getAllBudgets);
router.get("/list-by-status", getBudgetsByStatusType);
router.post("", putBudget);
router.delete("", delBudget);

export default router;
