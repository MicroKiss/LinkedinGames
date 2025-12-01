import { Router } from 'express';
import db from '../database/models';
import { authRequired } from '../middleware/authRequired';


const router = Router();
router.get('/', authRequired, async (req, res) => {
  const users = await db.User.findAll();
  res.json(users);
});

export default router;