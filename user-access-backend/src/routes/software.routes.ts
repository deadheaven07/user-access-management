import { Router } from "express";
import { createSoftware, getAllSoftware } from "../controllers/software.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, authorize("Admin"), createSoftware);
router.get("/",  getAllSoftware);

export default router;
