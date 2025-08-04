import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import jobRoutes from "./routes/jobs.route";

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: path.join(__dirname, "uploads/") });

app.post("/api/analyze", upload.single("resume"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const skills = ["JavaScript", "React", "Node.js"];
  const suggestions = ["Frontend Developer"];
  return res.json({ skills, suggestions });
});

app.use("/api/jobs", jobRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
