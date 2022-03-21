// components/AttributesTable/index.js
export default function AttributesTable({ attributes, removeAttribute }) {
  // If there are no attributes, don't show anything
  if (attributes.length === 0) {
    return null
  }

  return (
    <table className="w-full border border-zinc-100">
      <thead>
        <tr>
          <th className="border border-zinc-100 p-3 text-sm uppercase text-zinc-500 dark:text-zinc-300">
            Name
          </th>
          <th className="border border-zinc-100 p-3 text-sm uppercase text-zinc-500 dark:text-zinc-300">
            Display Type
          </th>
          <th className="border border-zinc-100 p-3 text-sm uppercase text-zinc-500 dark:text-zinc-300">
            Value
          </th>
          <th className="border border-zinc-100 p-3 text-sm uppercase text-zinc-500 dark:text-zinc-300">
            Remove
          </th>
        </tr>
      </thead>
      <tbody>
        {attributes.map((attribute, i) => (
          <tr>
            <td className="border border-zinc-100 text-center">
              {attribute.displayType}
            </td>
            <td className="border border-zinc-100 text-center lowercase text-zinc-400 dark:text-zinc-300">
              {attribute.traitType}
            </td>
            <td className="border border-zinc-100 text-center">
              {attribute.value}
            </td>
            <td className="border border-zinc-100 text-center">
              <button
                className="my-1 rounded-md bg-red-500 px-2 py-1 font-semibold text-white"
                onClick={() => removeAttribute(i)}
              >
                REMOVE
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
