import { Router } from "express";
import { getCars, addCar, updateCar } from "../controllers/carsController";
import { authenticate, requireRole } from "../middleware/auth";

const router = Router();

router.get("/", getCars);
router.post("/", authenticate, requireRole("agency"), addCar);
router.put("/:id", authenticate, requireRole("agency"), updateCar);

export default router;
