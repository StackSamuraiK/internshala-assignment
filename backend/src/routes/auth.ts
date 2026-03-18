import { Router } from "express";
import { registerCustomer, registerAgency, login } from "../controllers/authController";

const router = Router();

router.post("/register/customer", registerCustomer);
router.post("/register/agency", registerAgency);
router.post("/login", login);

export default router;
