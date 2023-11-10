import { Router } from 'express';
import { createRegistration, readRegistration, updateRegistration, deleteRegistration } from '../controllers/registrationController';

const router = Router();

router.post('/registrations', createRegistration);
router.get('/registrations', readRegistration);
router.get('/registrations/:id', readRegistration);
router.put('/registrations/:id', updateRegistration);
router.delete('/registrations/:id', deleteRegistration);

export default router;
