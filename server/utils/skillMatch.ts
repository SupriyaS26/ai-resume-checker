// utils/match.utils.ts

// Very basic keyword extractor (you can make it better later)
export function extractSkillsFromJobDescription(description: string): string[] {
  const commonSkills = [
    "java",
    "javascript",
    "python",
    "react",
    "nodejs",
    "node.js",
    "typescript",
    "html",
    "css",
    "mongodb",
    "express",
    "sql",
    "aws",
    "docker",
    "git",
  ];

  const desc = description.toLowerCase().replace(/\./g, "");

  return commonSkills.filter(skill => desc.includes(skill));
}

export function computeMatchScore(jobSkills: string[], resumeSkills: string[]) {
  const normalize = (s: string) =>
    s.toLowerCase().replace(/\s+/g, "").replace(/\./g, "").trim();

  const normJobSkills = jobSkills.map(normalize);
  const normResumeSkills = resumeSkills.map(normalize);

  const matchedSkills = normJobSkills.filter(skill => normResumeSkills.includes(skill));
  const missingSkills = normJobSkills.filter(skill => !normResumeSkills.includes(skill));

  const score = Math.round((matchedSkills.length / (matchedSkills.length + missingSkills.length || 1)) * 100);

  let timeline = "";
  if (score < 50 && missingSkills.length > 0) {
    timeline = `You could qualify for this in 2 months if you learn ${missingSkills[0]}`;
  } else if (score < 80 && missingSkills.length > 0) {
    timeline = `You could qualify in 1 month by learning ${missingSkills[0]}`;
  }

  return { score, matchedSkills, missingSkills, timeline };
}
