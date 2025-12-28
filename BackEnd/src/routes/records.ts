import { Router } from "express";
import { authRequired } from "../middleware/authRequired";
import { getRecordById, getAllRecords, getRecordsByGameId } from "../controllers/RecordController";

const router = Router();
router.get("/game/:id", authRequired, getRecordsByGameId);
router.get("/", authRequired, getAllRecords);
router.get("/:id", authRequired, getRecordById);
export default router;
