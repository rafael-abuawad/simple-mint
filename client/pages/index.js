// pages/index.js
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'

// store
import Web3Context from '../store/web3Context'

// components
import NFTCard from '../components/NFTCard'
import NoMints from '../components/NoMints'

export default function Home() {
  const { simpleMint, address } = useContext(Web3Context)
  const [nfts, setNfts] = useState([])

  // once connected a wallet load the nfts
  useEffect(() => {
    if (simpleMint && address) {
      loadNfts()
    }
  }, [simpleMint, address])

  async function loadNfts() {
    let nfts = await simpleMint.tokensOf(address)

    // tokensOf returns a Token ID and a Token URI
    // we need to retrive and parse that data
    nfts = await Promise.all(
      nfts.map(async (nft) => {
        // token as returned from the smart-contract
        let [metadata, tokenId] = nft

        // parsing the token id
        tokenId = tokenId.toString()
        // fetching the metadata
        metadata = await axios.get(metadata).then((res) => res.data)

        return { metadata, tokenId }
      })
    )

    setNfts(nfts)
  }

  return (
    <div>
      <Head>
        <title>Simple Mint</title>
        <meta name="description" content="NFT minting Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="px-3 md:px-6">
        <h1 className="text-3xl font-bold">NFTs</h1>
        {nfts.length == 0 && <NoMints />}
        {nfts.length != 0 && (
          <div className="sm: grid grid-cols-1 gap-4 p-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {nfts.map((nft, i) => (
              <NFTCard key={i} data={nft} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
