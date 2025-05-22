import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Software } from "../models/Software";

const softwareRepo = AppDataSource.getRepository(Software);

export const createSoftware = async (req: Request, res: Response) : Promise<void>=> {
  try {
    const { name , description , accessLevels } = req.body;
    
     if (!Array.isArray(accessLevels)) {
      res.status(400).json({ message: "accessLevels must be an array" });
      return;
    }

    const newSoftware = softwareRepo.create({ name, description, accessLevels });
    await softwareRepo.save(newSoftware);

    res.status(201).json({  message: "Software added" ,newSoftware});

    
  } catch (error) {
    console.error("Create software error:",error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllSoftware = async (_req: Request, res: Response) => {
  try {
    const softwareList = await softwareRepo.find();
    res.status(200).json(softwareList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
