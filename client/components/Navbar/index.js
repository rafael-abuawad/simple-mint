// components/Navbar/index.js
import Image from 'next/image'
import Link from 'next/link'

// This returns a **readable** wallet address
const formatAddress = (address) =>
  address.slice(0, 5) + '...' + address.slice(38)

export default function Navbar({ address, connectWallet, theme, setTheme }) {
  return (
    <div className="py-6 md:px-6">
      <div className="flex items-center justify-center border-b border-zinc-100 px-3 pb-6 dark:border-zinc-600 sm:justify-between">
        {/* logo */}
        <div className="hidden cursor-pointer sm:inline-flex">
          <Link href="/">
            <a>
              <Image src="/logo.png" width={90} height={78} />
            </a>
          </Link>
        </div>

        {/* connect button */}
        {!address && (
          <div className="flex items-center">
            <button
              onClick={connectWallet}
              className="cursor-pointer rounded-md bg-green-400 py-2 px-3 text-white hover:bg-green-500"
            >
              Connect
            </button>
          </div>
        )}

        {/* navigation & user's address */}
        {address && (
          <div className="flex items-center space-x-3">
            <Link href="/">
              <a className="hover:underline">My NFTs</a>
            </Link>
            <Link href="/create">
              <a className="hover:underline">Create</a>
            </Link>
            <p className="rounded-md bg-green-400 py-2 px-3 text-white">
              {formatAddress(address)}
            </p>
          </div>
        )}
      </div>

      {/* theme toggler */}
      <div className="fixed -bottom-1 -right-1 rounded-md border border-zinc-100 bg-white bg-zinc-50 p-3 dark:border-zinc-600 dark:bg-zinc-600">
        {theme === 'light' && (
          <svg
            cursor="pointer"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            onClick={() => setTheme('dark')}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
        {theme === 'dark' && (
          <svg
            cursor="pointer"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            onClick={() => setTheme('light')}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}
      </div>
    </div>
  )
}
