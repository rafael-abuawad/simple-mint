// pages/details/[tokenId].js
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'

// components
import Details from '../../components/Details'
import DetailTile from '../../components/DetailTile'
import Loading from '../../components/Loading'

// store
import Web3Context from '../../store/web3Context'

export default function TokenDetails() {
  const { simpleMint, address } = useContext(Web3Context)

  const router = useRouter()
  const { tokenId } = router.query

  const [nft, setNft] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (simpleMint && address) {
      loadNft()
    }
  }, [simpleMint, address])

  async function loadNft() {
    try {
      setLoading(true)
      const tokenURI = await simpleMint.tokenURI(tokenId)
      const metadata = await axios.get(tokenURI).then((res) => res.data)

      setNft({ metadata, tokenId })
      setLoading(false)
    } catch (err) {
      window.alert(err)
    }
  }

  return (
    <div>
      <Head>
        <title>Token: #{tokenId} | Simple Mint</title>
        <meta name="description" content="NFT minting Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading && <Loading text="Loading" />}

      {nft && (
        <div className="px-3 md:px-6">
          <h1 className="text-3xl font-bold">Token: #{nft.tokenId}</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="group relative h-96 rounded-md p-3 md:max-w-[100%]">
              <div className="relative h-96 rounded-md">
                <Image
                  className="rounded-md"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  src={nft.metadata.image}
                  alt="text"
                />
              </div>
            </div>

            <div className="p-3">
              {/* NFT Name */}
              <Details summary="Name">
                <p>{nft.metadata.name}</p>
              </Details>

              {/* NFT Description */}
              <Details summary="Description">
                <p>{nft.metadata.description}</p>
              </Details>

              {/* NFT Properties, if there are no properties don't display */}
              {nft.metadata.attributes.filter(
                (attr) => attr.traitType == 'text' || attr.traitType == 'number'
              ).length !== 0 && (
                <Details summary="Properties" isGrid>
                  {nft.metadata.attributes
                    .filter(
                      (attr) =>
                        attr.traitType == 'text' || attr.traitType == 'number'
                    )
                    .map((attr) => (
                      <DetailTile title={attr.displayType} value={attr.value} />
                    ))}
                </Details>
              )}

              {/* NFT Boosts, if there are no boosts don't display */}
              {nft.metadata.attributes.filter(
                (attr) =>
                  attr.traitType == 'boost_percentage' ||
                  attr.traitType == 'boost_number'
              ).length !== 0 && (
                <Details summary="Boosts" isGrid>
                  {nft.metadata.attributes
                    .filter(
                      (attr) =>
                        attr.traitType == 'boost_percentage' ||
                        attr.traitType == 'boost_number'
                    )
                    .map((attr) => (
                      <DetailTile title={attr.displayType} value={attr.value} />
                    ))}
                </Details>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
