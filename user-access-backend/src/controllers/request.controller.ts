import { Request as ExpressRequest, Response } from "express";
import { AppDataSource } from "../data-source";
import { Software } from "../models/Software";
import { Request as AccessRequest } from "../models/Request";
import { AuthRequest } from "../middleware/auth.middleware";

const requestRepo = AppDataSource.getRepository(AccessRequest);
const softwareRepo = AppDataSource.getRepository(Software);

export const submitAccessRequest = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { softwareId, accessType, reason } = req.body;

    const software = await softwareRepo.findOneBy({ id: softwareId });
    if (!software) {
      res.status(404).json({ message: "Software not found" });
      return;
    }

    const accessRequest = requestRepo.create({
      software,
      user: req.user, // From JWT middleware
      accessType,
      reason,
      status: "Pending"
    });

    await requestRepo.save(accessRequest);

    res.status(201).json({ message: "Access request submitted", request: accessRequest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting request" });
  }
};
export const updateRequestStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const requestId = Number(req.params.id);
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      res.status(400).json({ message: "Invalid status. Must be 'Approved' or 'Rejected'." });
      return;
    }

    const accessRequest = await requestRepo.findOne({
      where: { id: requestId },
      relations: ["user", "software"],
    });

    if (!accessRequest) {
      res.status(404).json({ message: "Access request not found" });
      return;
    }

    if (accessRequest.status !== "Pending") {
      res.status(400).json({ message: "Request has already been processed" });
      return;
    }

    accessRequest.status = status;
    await requestRepo.save(accessRequest);

    res.status(200).json({ message: `Request ${status.toLowerCase()}`, request: accessRequest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating request status" });
  }
};
export const getAllRequests = async (req: ExpressRequest, res: Response): Promise<void> => {
  try {
    const requestRepo = AppDataSource.getRepository(AccessRequest);
    const requests = await requestRepo.find({ relations: ["user", "software"] });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};

