// components/Details/index.js
export default function Details({ summary, isGrid, children }) {
  return (
    <details className="group border border-zinc-100 p-3 hover:cursor-pointer dark:border-zinc-600">
      <summary className="font-xl flex w-full list-none items-center justify-between font-bold">
        {/* The title of the drop down */}
        <span className="group-hover:underline">{summary}</span>

        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </summary>

      {/* if its children should be in a grid */}
      {isGrid && (
        <div className="grid grid-flow-row grid-cols-2 gap-4 pt-3 md:grid-cols-3 xl:grid-cols-4">
          {children}
        </div>
      )}

      {/* else */}
      {!isGrid && (
        <div className="pt-3 text-zinc-800 dark:text-zinc-50">{children}</div>
      )}
    </details>
  )
}
