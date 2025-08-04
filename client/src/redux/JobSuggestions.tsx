import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const JobRecommendations = () => {
  const jobs = useSelector((state: RootState) => state.resume.jobs);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Job Recommendations</h2>
      <ul className="space-y-2">
        {jobs.map((job: any, index: number) => (
          <li key={index} className="border p-2 rounded shadow">
            <p className="font-bold">{job.job_title}</p>
            <p className="text-sm">{job.employer_name}</p>
            <a href={job.job_apply_link} className="text-blue-500 underline" target="_blank">
              Apply
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobRecommendations;
