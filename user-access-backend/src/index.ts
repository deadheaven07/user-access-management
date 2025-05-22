import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth.routes";
import softwareRoutes from "./routes/software.routes";
import requestRoutes from "./routes/request.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/software", softwareRoutes);


app.get("/", (req, res) => {
  res.send("✅ Server is running");
});

AppDataSource.initialize().then(() => {
  console.log("📦 Connected to PostgreSQL");

  
  app.use("/api/auth", authRoutes);
  app.use("/api/requests", requestRoutes);
  //app.use("/api/software", softwareRoutes); 
  app.post("/ping", (req, res) => {
    console.log("📥 POST /ping hit with body:", req.body);
    res.json({ message: "pong" });
  });


  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}).catch((error: any) => {
  console.error("❌ Error initializing database:", error);
});

