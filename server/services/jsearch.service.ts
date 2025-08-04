// services/jsearch.service.ts
import axios from "axios";

const API_KEY = process.env.RAPIDAPI_KEY;

export async function fetchJobsFromJSearch(skill: string) {
  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params: {
      query: skill,
      page: "1",
      num_pages: "1"
    },
    headers: {
      "X-RapidAPI-Key":"4a172f6a81mshb87ab42c1d61ac8p1de700jsn73424785415b" ,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.data || [];
  } catch (error: any) {
    console.error("JSearch API Error:", {
    message: error.message,
    response: error.response?.data,
    status: error.response?.status
  });
  throw new Error("Failed to fetch job recommendations");
  }
}
export function computeMatchScore(jobSkills: string[], resumeSkills: string[]): { score: number, missingSkills: string[], matchedSkills: string[] } {
  const matchedSkills = jobSkills.filter(skill => resumeSkills.includes(skill.toLowerCase()));
  const missingSkills = jobSkills.filter(skill => !resumeSkills.includes(skill.toLowerCase()));

  const score = Math.round((matchedSkills.length / jobSkills.length) * 100);

  return { score, matchedSkills, missingSkills };
}


