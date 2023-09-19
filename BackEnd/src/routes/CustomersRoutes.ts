import { Router } from 'express';
import CustomerSchema from '../controllers/CustomerController';

const router = Router();

router.post('/users', CustomerSchema.create);
router.get('/users', CustomerSchema.getAllUsers);
router.get('/users/:id', CustomerSchema.getAllUsers);
router.put('/users/:id', CustomerSchema.update);
router.delete('/users/:id', CustomerSchema.delete);

export default router;
