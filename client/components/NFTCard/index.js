// components/NFTCard/index.js
import Link from 'next/link'
import Image from 'next/image'

export default function NFTCard({ data }) {
  return (
    <div className="max-w-96 group relative h-72 cursor-pointer rounded-md duration-100 ease-in-out hover:scale-105 sm:w-72">
      <div className="max-w-96 relative h-72 rounded-md sm:w-72">
        <Image
          className="rounded-md"
          layout="fill"
          objectFit="cover"
          quality={100}
          src={data.metadata.image}
          alt="text"
        />
        <div className="none absolute bottom-0 flex hidden h-12 w-full items-center rounded-b-md bg-zinc-800 px-3 font-bold text-white ease-in-out group-hover:flex dark:bg-white dark:text-zinc-800 ">
          <Link href={`/details/${data.tokenId}`}>
            <a className="hover:text-green-300 hover:underline">
              {data.metadata.name}
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
