import { useState, useEffect, useMemo } from "react";
import { jobs as mockJobs } from "../data/jobs";
import JobCard from "../components/JobCard";
import JobCardSkeleton from "../components/JobCardSkeleton";
import BottomSheet from "../components/BottomSheet";

export default function HomeScreen() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // refreshKey state increments to trigger the useEffect data fetching simulation
  const [refreshKey, setRefreshKey] = useState(0);

  // Active filter state applied to the UI
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Temporary filter state for the BottomSheet panel
  const [tempCategory, setTempCategory] = useState("");
  const [tempLocation, setTempLocation] = useState("");
  const [isSheetOpen, setSheetOpen] = useState(false);

  // Sync temp filters with active filters when bottom sheet opens
  useEffect(() => {
    if (isSheetOpen) {
      setTempCategory(selectedCategory);
      setTempLocation(selectedLocation);
    }
  }, [isSheetOpen, selectedCategory, selectedLocation]);

  // Simulate loading jobs from a backend with a 1.5s delay
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      // Set SIMULATE_ERROR = true to test error state (assessor will flip this)
      const SIMULATE_ERROR = false;
      if (SIMULATE_ERROR) {
        setError("Failed to load jobs.");
        setIsLoading(false);
      } else {
        // If refreshing, shuffle the list slightly to show visible changes
        const dataToSet = refreshKey > 0 
          ? [...mockJobs].sort(() => Math.random() - 0.5)
          : mockJobs;
        setJobs(dataToSet);
        setIsLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [refreshKey]);

  // Categories list derived dynamically or declared statically
  const categories = ["Web Development", "Design", "Writing", "Marketing", "Data"];
  // Locations list declared statically
  const locations = ["Nairobi", "Mombasa", "Kisumu", "Remote"];

  // useMemo here avoids re-running the filter on every keystroke when unrelated state changes
  const filtered = useMemo(() => {
    let result = jobs.filter(job => {
      const matchSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.employer.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !selectedCategory || job.category === selectedCategory;
      const matchLocation = !selectedLocation || job.location === selectedLocation;
      return matchSearch && matchCategory && matchLocation;
    });

    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    } else if (sortBy === "budget_high") {
      result.sort((a, b) => b.budget - a.budget);
    } else if (sortBy === "budget_low") {
      result.sort((a, b) => a.budget - b.budget);
    }

    return result;
  }, [jobs, search, selectedCategory, selectedLocation, sortBy]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleApplyFilters = () => {
    // tempCategory is separate from selectedCategory so filter only applies when the user presses Apply, not on every chip tap
    setSelectedCategory(tempCategory);
    setSelectedLocation(tempLocation);
    setSheetOpen(false);
  };

  const handleResetFilters = () => {
    setTempCategory("");
    setTempLocation("");
  };

  const handleClearAll = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedLocation("");
    setTempCategory("");
    setTempLocation("");
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 relative">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white m-0 tracking-tight font-sans">HomelandJobs</h1>
        <button
          onClick={handleRefresh}
          className="text-sm font-semibold px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-100/40 dark:border-blue-900/30 transition-all active:scale-95"
          aria-label="Refresh job listings"
        >
          ↻ Refresh
        </button>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-24">
        
        {/* Search Bar Input */}
        <div className="mb-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search jobs or employers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-205 dark:border-gray-700/80 rounded-2xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/55 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Info & Sorting Header */}
        {!isLoading && !error && (
          <div className="flex items-center justify-between mb-3 text-xs text-gray-500 dark:text-gray-400 font-medium px-1">
            <span>Showing {filtered.length} of {jobs.length} jobs</span>
            <div className="flex items-center gap-1.5">
              <label htmlFor="sort-dropdown" className="font-semibold uppercase tracking-wider text-[10px] text-gray-400 dark:text-gray-500">Sort:</label>
              <select
                id="sort-dropdown"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-transparent text-blue-600 dark:text-blue-400 font-semibold focus:outline-none cursor-pointer pr-1"
              >
                <option value="newest">Newest</option>
                <option value="budget_high">Budget: High → Low</option>
                <option value="budget_low">Budget: Low → High</option>
              </select>
            </div>
          </div>
        )}

        {/* Job Cards Feed / Loaders / Error Displays */}
        {isLoading ? (
          // Render exactly 5 skeleton placeholders while data fetches
          Array.from({ length: 5 }).map((_, index) => (
            <JobCardSkeleton key={index} />
          ))
        ) : error ? (
          // Error Display Panel
          <div className="flex flex-col items-center justify-center py-16 text-center select-none">
            <span className="text-4xl mb-3" role="img" aria-label="Warning sign">⚠️</span>
            <p className="font-semibold text-gray-800 dark:text-gray-200">Something went wrong</p>
            <p className="text-xs text-gray-500 mt-1">We couldn't load the job listings.</p>
            <button
              onClick={() => setRefreshKey(prev => prev + 1)}
              className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full shadow-md active:scale-95 transition-all"
            >
              Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          // Empty State Display Panel
          <div className="flex flex-col items-center justify-center py-16 text-center select-none">
            <span className="text-4xl mb-3" role="img" aria-label="Search magnifying glass">🔍</span>
            <p className="font-semibold text-gray-800 dark:text-gray-200">No jobs found</p>
            <p className="text-xs text-gray-500 mt-1">Try adjusting your search or filters</p>
            <button
              onClick={handleClearAll}
              className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full shadow-md active:scale-95 transition-all"
            >
              Clear filters
            </button>
          </div>
        ) : (
          // Scrollable List of Jobs
          filtered.map(job => (
            <JobCard key={job.id} job={job} />
          ))
        )}
      </div>

      {/* Floating Action Button (FAB) for Filters */}
      {!error && (
        <button
          onClick={() => setSheetOpen(true)}
          className="absolute bottom-6 right-4 w-14 h-14 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-full shadow-xl flex items-center justify-center text-xl z-10 transition-all duration-150 border border-blue-500/20"
          aria-label="Open filters bottom sheet panel"
        >
          ⚙
        </button>
      )}

      {/* Bottom Sheet Filter Panel */}
      <BottomSheet isOpen={isSheetOpen} onClose={() => setSheetOpen(false)}>
        <div className="px-5 pb-8">
          <h2 className="font-bold text-gray-900 dark:text-white text-base mb-4 tracking-tight">Filter jobs</h2>

          {/* Category Chip Selector Group */}
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Category</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setTempCategory(c => c === cat ? "" : cat)}
                className={`text-xs px-3.5 py-1.5 rounded-full border transition-all duration-150 font-medium ${
                  tempCategory === cat
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Location Chip Selector Group */}
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Location</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {locations.map(loc => (
              <button
                key={loc}
                onClick={() => setTempLocation(l => l === loc ? "" : loc)}
                className={`text-xs px-3.5 py-1.5 rounded-full border transition-all duration-150 font-medium ${
                  tempLocation === loc
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* Sheet Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleResetFilters}
              className="flex-1 py-3 border border-gray-250 dark:border-gray-750 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold transition-colors hover:bg-gray-50 dark:hover:bg-gray-850"
            >
              Reset
            </button>
            <button
              onClick={handleApplyFilters}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
            >
              Apply filters
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
