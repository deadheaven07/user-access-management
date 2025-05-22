import { Router } from "express";
import { submitAccessRequest,getAllRequests,updateRequestStatus } from "../controllers/request.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";


const router = Router();

router.get("/", authenticate, authorize("Manager"), getAllRequests);

router.post("/", authenticate, authorize("Employee"), submitAccessRequest);

// PATCH /api/requests/:id(Manager only)
router.patch("/:id", authenticate, authorize("Manager"), updateRequestStatus);


export default router;
