import { Router } from "express";
import { authRequired } from "../middleware/authRequired";
import {
  getRecordById,
  getAllRecords,
  getRecordsByGameId,
  createRecord,
} from "../controllers/RecordController";

const router = Router();

router.get("/game/:id", authRequired, getRecordsByGameId);
router.get("/", authRequired, getAllRecords);
router.get("/:id", authRequired, getRecordById);
router.post("/", authRequired, createRecord);
export default router;
