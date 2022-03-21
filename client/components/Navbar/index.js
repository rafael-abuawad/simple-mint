// components/Navbar/index.js
import Image from 'next/image'
import Link from 'next/link'

// This returns a **readable** wallet address
const formatAddress = (address) =>
  address.slice(0, 5) + '...' + address.slice(38)

export default function Navbar({ address, connectWallet }) {
  return (
    <div className="bg-white py-6 text-zinc-800 dark:bg-zinc-800 dark:text-white md:px-6">
      <div className="flex items-center justify-center border-b border-zinc-100 px-3 pb-6 sm:justify-between">
        {/* logo */}
        <div className="hidden sm:inline-flex">
          <Image src="/logo.png" width={90} height={78} />
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
            <Link href="/create">
              <a className="hover:underline">Create</a>
            </Link>
            <Link href="/">
              <a className="hover:underline">My NFTs</a>
            </Link>
            <p className="rounded-md bg-green-400 py-2 px-3 text-white">
              {formatAddress(address)}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
