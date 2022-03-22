// components/DetailTile/index.js
export default function DetailTile({ title, value }) {
  return (
    <div className="flex h-32 w-full flex-col items-center justify-center rounded-md border border-zinc-100 p-3 dark:border-zinc-600">
      <p className="text-3xl text-zinc-800 dark:text-zinc-50">{value}</p>
      <p className="text-xl font-bold text-green-500">{title}</p>
    </div>
  )
}
