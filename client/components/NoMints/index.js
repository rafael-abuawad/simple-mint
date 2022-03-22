// components/NoMints/index.js
import Link from 'next/link'

export default function NoMints() {
  return (
    <div className="flex h-screen w-full items-center justify-center md:h-[65vh]">
      <p className="font-3xl font-bold text-zinc-400 dark:text-zinc-200">
        Looks like you haven't created any NFT's yet,{' '}
        <Link href="/create">
          <span className="cursor-pointer text-green-500 hover:underline">
            create one now
          </span>
        </Link>
        .
      </p>
    </div>
  )
}
