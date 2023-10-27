import express, { Router } from 'express';
import {
  getTreatments,
  addTreatment,
  getTreatmentById,
  getTreatmentByName,
  updateTreatment,
  deleteTreatment
} from '../controllers/treatmentController';

const router: Router = express.Router();

router.post('/treatments', addTreatment);
router.get('/treatments', getTreatments);
router.get('/treatments/:id', getTreatmentById);
router.get('/treatments/name/:name', getTreatmentByName);
router.put('/treatments/:id', updateTreatment);
router.delete('/treatments/:id', deleteTreatment);

export default router;
