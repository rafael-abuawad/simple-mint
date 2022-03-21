// components/NoMints/index.js
import Link from 'next/link'

export default function NoMints() {
  return (
    <div className="flex h-screen w-screen items-center justify-center md:h-[65vh]">
      <p className="font-3xl font-bold text-zinc-400 dark:text-zinc-200">
        Looks like you haven't created any NFT's yet,{' '}
        <Link href="/create">
          <a className="hover:underline">create one now</a>
        </Link>{' '}
        .
      </p>
    </div>
  )
}
