import { Router } from 'express';
const authController = require('../controllers/authController');
const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;