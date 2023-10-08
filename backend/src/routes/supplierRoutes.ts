import express, { Router } from 'express';
import {createSupplier,getAllSuppliers,getSupplierById,deleteSupplier,} from '../controllers/supplierController';

const router: Router = express.Router();

router.post('/suppliers', createSupplier);
router.get('/suppliers', getAllSuppliers);
router.get('/suppliers/:id', getSupplierById);
router.delete('/suppliers/:id', deleteSupplier);

export default router;
