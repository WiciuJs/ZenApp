import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

router.post('/users', UserController.create);
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getAllUsers);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

export default router;
