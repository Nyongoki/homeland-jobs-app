import { useNavigate } from "react-router-dom";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  const formatBudget = (n) =>
    "KES " + n.toLocaleString("en-KE");

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <article
      onClick={() => navigate(`/job/${job.id}`)}
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-3 shadow-sm border border-gray-105 dark:border-gray-700/80 cursor-pointer active:scale-[0.98] transition-transform duration-150 hover:border-gray-200 dark:hover:border-gray-600"
    >
      {/* Header: avatar + employer + category chip */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-xs">
            {job.employer[0]}
          </div>
          <span className="text-xs font-medium text-gray-550 dark:text-gray-400">{job.employer}</span>
        </div>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${job.categoryColor}`}>
          {job.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1">{job.title}</h3>

      {/* Budget + location */}
      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2.5">
        <span className="font-bold text-gray-850 dark:text-gray-100">{formatBudget(job.budget)}</span>
        <span className="text-gray-300 dark:text-gray-600">•</span>
        <span>📍 {job.location}</span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1 mb-3">
        {job.skills.map(skill => (
          <span key={skill} className="text-[10px] border border-gray-250 dark:border-gray-700 text-gray-600 dark:text-gray-400 px-2.5 py-0.5 rounded-full bg-gray-50 dark:bg-gray-850">
            {skill}
          </span>
        ))}
      </div>

      {/* Footer: date + proposals */}
      <div className="flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500 font-medium">
        <time dateTime={job.postedDate}>{formatDate(job.postedDate)}</time>
        <span>{job.proposalCount} proposals</span>
      </div>
    </article>
  );
}
