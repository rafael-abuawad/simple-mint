// pages/create.js
import { useContext, useState } from 'react'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

// components
import AddAttributes from '../components/AddAttributes'
import AttributesTable from '../components/AttributesTable'
import Loading from '../components/Loading'

// store
import Web3Context from '../store/web3Context'

// IPFS access point
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export default function Create() {
  const { simpleMint, address } = useContext(Web3Context)
  // we will use the router to change the view after creating the NFT
  const router = useRouter()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [attributes, setAttributes] = useState([])
  const [imageUrl, setImageUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)

  // simple function to remove an attribute
  function removeAttribute(index) {
    let newAttributes = []
    for (let i = 0; i < attributes.length; i++) {
      if (i == index) {
        continue
      }

      newAttributes.push(attributes[i])
    }
    setAttributes(newAttributes)
  }

  async function uploadImage(event) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const added = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setImageUrl(url)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  async function createNft() {
    // all data is required to create an NFT
    if (!name && !description && attributes.length === 0 && !imageUrl) {
      return
    }

    // collect all data into an object
    const data = {
      name,
      image: imageUrl,
      description,
      attributes,
    }

    try {
      setLoading(true)
      // we parse the data as JSON before uploading it to IPFS
      const added = await client.add(JSON.stringify(data))
      const url = `https://ipfs.infura.io/ipfs/${added.path}`

      // get the minting fee to mint the NFT
      let fee = await simpleMint.fee()
      fee = fee.toString()

      // wait till the transaction is confirmed
      const tx = await simpleMint.safeMint(url, { value: fee })
      await tx.wait()

      router.push('/')
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Head>
        <title>Create | Simple Mint</title>
        <meta name="description" content="NFT minting Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading && <Loading text="Processing" />}

      <div className="px-3 md:px-6">
        <h1 className="text-3xl font-bold">Create NFT</h1>
        <div className="flex flex-col space-y-6 py-12">
          <div className="flex flex-grow flex-col">
            <label
              htmlFor="name"
              className="mb-1 text-sm uppercase text-zinc-500 dark:text-zinc-300"
            >
              Image
            </label>
            <input
              className="
                block w-full cursor-pointer text-sm
                text-slate-500 file:mr-4 file:rounded-full
                file:border-0 file:bg-green-400
                file:py-2 file:px-4
                file:text-sm file:font-semibold
                file:text-white
                hover:file:bg-green-500
              "
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadImage}
              disabled={uploading}
            />
          </div>
          <div className="flex flex-grow flex-col">
            <label
              htmlFor="name"
              className="mb-1 text-sm uppercase text-zinc-500 dark:text-zinc-300"
            >
              Loaded Image
            </label>
            {uploading && (
              <div className="max-w-96 flex h-72 w-full animate-pulse items-center justify-center rounded-md bg-zinc-400">
                <p>Loading...</p>
              </div>
            )}
            {!uploading && imageUrl && (
              <div className="max-w-96 relative h-72 rounded-md sm:w-72">
                <Image
                  className="rounded-md"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  src={imageUrl}
                  alt="text"
                />
              </div>
            )}
          </div>
          <div className="flex flex-grow flex-col">
            <label
              htmlFor="name"
              className="text-sm uppercase text-zinc-500 dark:text-zinc-300"
            >
              Name
            </label>
            <input
              className="placeholder-text-xl h-12 rounded-md border-2 border-zinc-100 bg-zinc-100 px-2 py-1 outline-none focus:border-green-400 dark:border-zinc-500 dark:bg-zinc-500 dark:focus:border-green-400"
              id="name"
              type="text"
              value={name}
              placeholder="Ex. Power"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-grow flex-col">
            <label
              htmlFor="description"
              className="text-sm uppercase text-zinc-500 dark:text-zinc-300"
            >
              Description
            </label>
            <textarea
              className="placeholder-text-xl rounded-md border-2 border-zinc-100 bg-zinc-100 px-2 py-1 outline-none focus:border-green-400 dark:border-zinc-500 dark:bg-zinc-500 dark:focus:border-green-400"
              id="description"
              type="text"
              value={description}
              placeholder="Ex. Lorem ipsum dolor sit amet."
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-grow flex-col">
            <AddAttributes
              addAttribute={(data) => setAttributes((prev) => [...prev, data])}
            />
          </div>
          <div className="flex-grow">
            <p className="pb-1 text-sm uppercase text-zinc-500 dark:text-zinc-300">
              Attributes
            </p>
            <AttributesTable
              attributes={attributes}
              removeAttribute={removeAttribute}
            />
          </div>
          <div>
            <button
              onClick={createNft}
              className="w-full cursor-pointer rounded-md bg-green-400 py-2 px-3 text-white hover:bg-green-500"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
