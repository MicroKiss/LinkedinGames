import { Router } from 'express';
import { authRequired } from '../middleware/authRequired';
import { getUserById, getAllUsers } from '../controllers/UserController';


const router = Router();

router.get('/', authRequired, getAllUsers);

router.get('/:id',authRequired, getUserById);

export default router;