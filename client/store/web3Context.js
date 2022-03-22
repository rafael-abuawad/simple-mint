import { createContext } from 'react'

export const getNetworkName = (chainId) => {
  const chains = {
    1337: 'dev',
    42: 'kovan',
  }

  return chains[chainId]
}

export default createContext({
  simpleMint: null,
  signer: null,
  address: null,
})
