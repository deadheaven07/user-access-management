import { Request, Response } from "express";
import { Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken";

// Repository setup
const userRepository = AppDataSource.getRepository(User);

// ✅ Add proper type: (req: Request, res: Response): Promise<void>
export const signup = async (req: Request, res: Response): Promise<void> => {
  console.log("📥 Received signup request"); //testing purpose
  try {
    const { username, password } = req.body;

    const existingUser = await userRepository.findOneBy({ username });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      username,
      password: hashedPassword,
      role: "Employee"
    });

    await userRepository.save(user);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  console.log("📥 Received login request"); // testing purpose
  try {
    const { username, password } = req.body;

    const user = await userRepository.findOneBy({ username });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login error" });
  }
};
