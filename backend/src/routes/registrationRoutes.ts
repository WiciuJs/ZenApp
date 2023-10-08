import { Router } from 'express';
import RegistrationController from '../controllers/registrationController';
const router = Router();

router.post('/registrations', RegistrationController.create);
router.get('/registrations', RegistrationController.read);
router.get('/registrations/:id', RegistrationController.read);
router.put('/registrations/:id', RegistrationController.update);
router.delete('/registrations/:id', RegistrationController.delete);

export default router;

