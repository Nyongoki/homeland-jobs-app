export default function JobCardSkeleton() {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-3 border border-gray-100 dark:border-gray-750">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
      <div className="h-4.5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
      <div className="h-3.5 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-3.5 animate-pulse" />
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
      </div>
    </article>
  );
}
