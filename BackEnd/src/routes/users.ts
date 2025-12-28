import { Router } from 'express';
import db from '../database/models';
import { authRequired } from '../middleware/authRequired';
import { getUserById } from '../controllers/UserController';


const router = Router();
router.get('/', authRequired, async (req, res) => {
  const users = await db.User.findAll();
  res.json(users);
});

router.get('/:id',authRequired, getUserById);

export default router;