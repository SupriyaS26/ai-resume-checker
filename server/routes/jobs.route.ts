// routes/jobs.route.ts
import express from "express";
import { getJobRecommendations } from "../controllers/jobs.controller";

const router = express.Router();

router.post("/recommendations", getJobRecommendations);

export default router;
