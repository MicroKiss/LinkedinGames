import { Router } from "express";
import { authRequired } from "../middleware/authRequired";
import {
  getRecordById,
  getAllRecords,
  getRecordsByGameId,
  createRecord,
} from "../controllers/RecordController";

const router = Router();
/**
 * @swagger
 * /records/game/{id}:
 *   get:
 *     summary: Get all records for a specific game
 *     tags:
 *       - Records
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Game ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   gameId:
 *                     type: integer
 *                   time:
 *                     type: number
 *       401:
 *        description: Unauthorized
 *       404:
 *         description: No records found
 */
router.get("/game/:id", authRequired, getRecordsByGameId);
router.get("/", authRequired, getAllRecords);
router.get("/:id", authRequired, getRecordById);
router.post("/", authRequired, createRecord);
export default router;
