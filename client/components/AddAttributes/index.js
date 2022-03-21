// components/AddAttributes/index.js
import { useState } from 'react'

// A function to capitalize text
// Ex. capitalize("soME TeXT") => "Some Text"
const capitalize = (text) =>
  text
    .trim()
    .toLowerCase()
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')

export default function AddAttributes({ addAttribute }) {
  // ERC-721 metadata attributes
  // {
  //    "display_type": "boost_number",
  //    "trait_type": "Aqua Power",
  //    "value": 40
  // }

  const [displayType, setDisplayType] = useState('')
  const [traitType, setTraitType] = useState('text')
  const [value, setValue] = useState('')

  function handleAddAttribute(e) {
    e.preventDefault()

    // if one field is empty return
    if (!displayType || !traitType || !value) {
      return
    }

    let data = { displayType: capitalize(displayType), traitType, value }
    switch (data.traitType) {
      case 'text': {
        data.value = capitalize(data.value)
        break
      }
      case 'boost_percentage': {
        data.value = Number(data.value) + '%'
        break
      }
      case 'boost_number':
      case 'number': {
        data.value = Number(data.value)
        break
      }
    }

    addAttribute(data)
    console.log(data)

    // reset all fields
    setDisplayType('')
    setTraitType('text')
    setValue('')
  }

  return (
    <form className="flex h-16 w-full items-center space-x-3">
      <div className="flex flex-grow flex-col">
        <label
          htmlFor="name"
          className="text-sm uppercase text-zinc-500 dark:text-zinc-300"
        >
          Name
        </label>
        <input
          className="placeholder-text-xl h-12 rounded-md border-2 border-zinc-100 bg-zinc-100 px-2 py-1 outline-none focus:border-green-400"
          id="name"
          type="text"
          value={displayType}
          placeholder="Ex. Power"
          onChange={(e) => setDisplayType(e.target.value)}
        />
      </div>
      <div className="flex flex-grow flex-col">
        <label
          htmlFor="traitType"
          className="text-sm uppercase text-zinc-500 dark:text-zinc-300"
        >
          Trait Type
        </label>
        <select
          className="placeholder-text-xl h-12 rounded-md border-2 border-zinc-100 bg-zinc-100 px-2 py-1 outline-none focus:border-green-400"
          name="traitType"
          value={traitType}
          onChange={(e) => setTraitType(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="boost_percentage">Boost Percentage</option>
          <option value="boost_number">Boost Number</option>
          <option value="number">Number</option>
        </select>
      </div>
      <div className="flex flex-grow flex-col">
        <label
          htmlFor="value"
          className="text-sm uppercase text-zinc-500 dark:text-zinc-300"
        >
          Value
        </label>
        <input
          id="value"
          className="placeholder-text-xl h-12 rounded-md border-2 border-zinc-100 bg-zinc-100 px-2 py-1 outline-none focus:border-green-400"
          type="text"
          value={value}
          placeholder="Ex. 25"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="flex w-12 flex-col">
        <button
          className="mt-5 flex h-12 w-12 items-center justify-center rounded-md bg-green-400 text-white hover:bg-green-500"
          type="submit"
          onClick={handleAddAttribute}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={4}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}
