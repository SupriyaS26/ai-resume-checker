"use client";

import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setSkills,
  setJobSuggestions,
  setFileMeta as setReduxFile,
} from "../redux/resumeSlice";
import { RootState } from "../redux/store";

const ResumeUploader = () => {
  const dispatch = useDispatch();
  const [localFile, setLocalFile] = useState<File | null>(null);
  const jobs = useSelector((state: RootState) => state.resume.jobs);

  const handleAnalyzeResume = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append("resume", file);

      try {
        // Step 1: Upload and analyze the resume
        const res = await axios.post("http://localhost:5000/api/analyze", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const extractedSkills = res.data.skills;
        dispatch(setSkills(extractedSkills));

        dispatch(setReduxFile({
          name: file.name,
          size: file.size,
          type: file.type,
        }));

        // Step 2: Fetch job recommendations
        const response = await axios.post("http://localhost:5000/api/jobs/recommendations", {
          skills: extractedSkills,
        });

        const jobs = response.data.jobs;
        dispatch(setJobSuggestions(jobs));
        console.log("Jobs:", jobs);
      } catch (err) {
        console.error("Error analyzing or fetching jobs", err);
      }
    },
    [dispatch]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalFile(file);
      handleAnalyzeResume(file);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow">
      <h1 className="text-xl font-semibold mb-2">Upload Resume</h1>
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
      <button
        onClick={() => {
          if (localFile) {
            handleAnalyzeResume(localFile);
          } else {
            alert("Please select a file first.");
          }
        }}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Analyze Resume
      </button>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Job Recommendations</h2>
        {jobs.length === 0 ? (
          <p>No job recommendations yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {jobs.map((job, index) => (
              <div key={index} className="border p-4 rounded-lg shadow">
                <h2 className="font-bold text-lg">{job.job_title || job.title}</h2>
                <p>Company: {job.employer_name || job.company_name}</p>
                <p className="mt-2">
                  <span className="font-semibold">Resume Match:</span>{" "}
                  <span
                    className={`${
                      job.score >= 80
                        ? "text-green-600"
                        : job.score >= 50
                        ? "text-yellow-500"
                        : "text-red-600"
                    }`}
                  >
                    {job.score}%
                  </span>
                </p>

                <div className="mt-2">
                  <p className="font-semibold">Matched Skills:</p>
                  <ul className="list-disc ml-5 text-green-600">
                    {job.matchedSkills?.map((skill: string) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>

                  <p className="font-semibold mt-2">Missing Skills:</p>
                  <ul className="list-disc ml-5 text-red-600">
                    {job.missingSkills?.map((skill: string) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>

                {job.timeline && (
                  <p className="mt-3 text-sm text-blue-600 font-medium">
                    {job.timeline}
                  </p>
                )}

                <a
                  href={job.job_google_link || job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mt-2 inline-block"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUploader;
