const applications = [
  { id: 1, jobTitle: "Senior React Developer",  employer: "TechCorp Kenya",     date: "2026-07-10", status: "Pending"  },
  { id: 2, jobTitle: "UI/UX Designer",          employer: "Savannah Studios",    date: "2026-07-08", status: "Viewed"   },
  { id: 3, jobTitle: "Content Writer",           employer: "MediaHub Africa",     date: "2026-07-05", status: "Accepted" },
  { id: 4, jobTitle: "Data Analyst",             employer: "Fintech Kenya",       date: "2026-07-01", status: "Rejected" },
];

const badgeStyle = {
  Pending:  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  Viewed:   "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  Accepted: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export default function ApplicationsScreen() {
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-4 flex items-center justify-center">
        <h1 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">My Applications</h1>
      </header>

      {/* Applications Feed List */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {applications.map(app => (
            <article
              key={app.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700/80 shadow-sm"
            >
              {/* Header: Employer Name + Status badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{app.employer}</span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${badgeStyle[app.status]}`}>
                  {app.status}
                </span>
              </div>

              {/* Job Title */}
              <h2 className="text-base font-bold text-gray-905 dark:text-white mb-2 leading-tight">
                {app.jobTitle}
              </h2>

              {/* Footer Applied Date */}
              <div className="flex items-center text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                <span>Applied: </span>
                <time className="ml-1" dateTime={app.date}>{formatDate(app.date)}</time>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
