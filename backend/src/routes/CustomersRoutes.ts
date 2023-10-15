import { Router } from "express";
import CustomerController from "../controllers/customerController";

const router = Router();

router.post("/customer", CustomerController.create);
router.get("/customer", CustomerController.getAllCustomers);
router.get("/customer/:id", CustomerController.getAllCustomers);
router.put("/customer/:id", CustomerController.update);
router.delete("/customer/:id", CustomerController.delete);

export default router;
