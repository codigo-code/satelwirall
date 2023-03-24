import { Router } from "express";
import {
    putCoordination,
    getAllCoordinations,
    getCoordinationsByStatusType,
    delCoordination
} from "../controller/coordination.controller";

const router: Router = Router();

router.get("/list", getAllCoordinations);
router.get("/list-by-status", getCoordinationsByStatusType);
router.post("", putCoordination);
router.delete("", delCoordination)

export default router;
