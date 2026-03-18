import { Router } from "express";
import { createBooking, getAgencyBookings } from "../controllers/bookingsController";
import { authenticate, requireRole } from "../middleware/auth";

const router = Router();

router.post("/", authenticate, requireRole("customer"), createBooking);
router.get("/agency", authenticate, requireRole("agency"), getAgencyBookings);

export default router;
