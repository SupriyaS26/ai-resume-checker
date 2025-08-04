import { Request, Response } from "express";
import { fetchJobsFromJSearch } from "../services/jsearch.service";
import {
  extractSkillsFromJobDescription,
  computeMatchScore,
} from "../utils/skillMatch";

export async function getJobRecommendations(req: Request, res: Response) {
  const { skills } = req.body;

  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({ message: "Skills are required" });
  }

  try {
    // Fetch jobs from JSearch API
    const jobs = await fetchJobsFromJSearch(skills[0]); // You can loop over skills if needed

    // Normalize resume skills (lowercase, trim, etc.)
    const normalizedResumeSkills: string[] = skills.map((s: string) =>
      s.toLowerCase().replace(/\s+/g, "").replace(/\./g, "").trim()
    );

    // Score each job
    const scoredJobs = jobs.map((job: any) => {
      const jobSkills = extractSkillsFromJobDescription(
        job.job_description || ""
      );

      const {
        score,
        matchedSkills,
        missingSkills,
        timeline,
      } = computeMatchScore(jobSkills, normalizedResumeSkills);

      return {
        ...job,
        score,
        matchedSkills,
        missingSkills,
        timeline,
      };
    });

    res.json({ jobs: scoredJobs });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      message: "Error fetching jobs",
      error: error.message,
    });
  }
}
