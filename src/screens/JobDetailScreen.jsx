import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobs } from "../data/jobs";
import PaymentModal from "../components/PaymentModal";

// Module-level cache to persist funded jobs status across screen transitions (session lifespan)
// This ensures that when the user navigates back to the list and comes back, the funded state is preserved.
const sessionFundedJobs = {};

export default function JobDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const jobId = parseInt(id, 10);
  const job = jobs.find(j => j.id === jobId);

  const [isFunded, setIsFunded] = useState(() => !!sessionFundedJobs[jobId]);
  const [modalOpen, setModalOpen] = useState(false);

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center select-none bg-gray-50 dark:bg-gray-900">
        <span className="text-4xl mb-2">⚠️</span>
        <p className="font-semibold text-gray-800 dark:text-gray-250">Job Not Found</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-full"
        >
          Go Back
        </button>
      </div>
    );
  }

  const formatBudget = (n) =>
    "KES " + n.toLocaleString("en-KE");

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  const handlePaymentSuccess = () => {
    sessionFundedJobs[jobId] = true;
    setIsFunded(true);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 relative">
      
      {/* Sticky Header with Back Button */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-3.5 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-base font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-1 -ml-1 transition-colors active:scale-90"
          aria-label="Navigate back"
        >
          ← Back
        </button>
        <h2 className="text-sm font-bold text-gray-850 dark:text-white uppercase tracking-wider">Job Details</h2>
        <div className="w-8" /> {/* Visual spacer */}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-5 pt-5 pb-28">
        
        {/* Category Chip */}
        <div className="mb-3">
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${job.categoryColor}`}>
            {job.category}
          </span>
        </div>

        {/* Job Title */}
        <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-snug mb-3">
          {job.title}
        </h1>

        {/* Employer Info Section */}
        <section className="flex items-center gap-3 mb-6 p-3 bg-gray-50 dark:bg-gray-850 rounded-2xl border border-gray-100 dark:border-gray-800" aria-label="Employer Profile">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            {job.employer[0]}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-850 dark:text-gray-100 text-sm">{job.employer}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-xs text-yellow-500">⭐</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{job.employerRating.toFixed(1)} rating</span>
            </div>
          </div>
        </section>

        {/* Details Grid (Budget, Deadline, proposals) */}
        <section className="grid grid-cols-2 gap-3.5 mb-6" aria-label="Key Job metrics">
          <div className="p-3.5 bg-gray-50 dark:bg-gray-850 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Budget</span>
            <span className="text-sm font-extrabold text-gray-850 dark:text-gray-105">{formatBudget(job.budget)}</span>
          </div>
          <div className="p-3.5 bg-gray-50 dark:bg-gray-850 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Deadline</span>
            <span className="text-xs font-bold text-gray-850 dark:text-gray-105"><time dateTime={job.deadline}>{formatDate(job.deadline)}</time></span>
          </div>
        </section>

        {/* Full Description */}
        <section className="mb-6" aria-label="Job description text">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Description</h2>
          <p className="text-xs text-gray-650 dark:text-gray-300 leading-relaxed font-normal whitespace-pre-line">
            {job.description}
          </p>
        </section>

        {/* Required Skills list */}
        <section className="mb-4 font-sans" aria-label="Required skills list">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Required Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {job.skills.map(skill => (
              <span key={skill} className="text-xs font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-850">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Proposal Counter Info */}
        <div className="text-xs text-gray-400 dark:text-gray-550 font-medium px-0.5 mt-4">
          📈 {job.proposalCount} active proposals submitted
        </div>

      </main>

      {/* Sticky Bottom Action Bar Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-10 flex flex-col">
        {isFunded ? (
          /* Success state replacement box when escrow has been successfully funded */
          <div className="flex items-center justify-center gap-2.5 py-3.5 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-100 dark:border-green-900/30 shadow-sm select-none">
            <span className="text-green-600 dark:text-green-400 font-bold text-base">✓</span>
            <span className="font-bold text-xs text-green-700 dark:text-green-450">Escrow Funded</span>
          </div>
        ) : (
          /* Payment initiation button trigger */
          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-md active:scale-[0.99]"
          >
            Fund Escrow
          </button>
        )}
      </footer>

      {/* Slide-Up Payment State Machine Dialog */}
      <PaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        job={job}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
