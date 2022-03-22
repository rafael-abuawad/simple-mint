import { useState, useEffect } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'

// components
import Navbar from '../components/Navbar'
import NoWallet from '../components/NoWallet'

// store and context
import { getInitialTheme, rawSetTheme } from '../store/themeContext'
import Web3Context, { getNetworkName } from '../store/web3Context'

// styles
import '../styles/globals.css'

// smart-contracts
import SimpleMint from '../artifacts/contracts/SimpleMint.json'

function App({ Component, pageProps }) {
  // app theme
  const [theme, setTheme] = useState(getInitialTheme)

  // web3 dapp state
  const [signer, setSigner] = useState(null)
  const [address, setAddress] = useState(null)
  const [simpleMint, setSimpleMint] = useState(null)

  // sets the theme on change
  useEffect(() => {
    rawSetTheme(theme)
  }, [theme])

  async function connectWallet() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    const { chainId } = await provider.getNetwork()
    const chainName = getNetworkName(chainId)

    // this deployed simple mint smartcontract address
    /// *** REPLACE THIS ***
    const simpleMintAddress = '0x854b699d119c5f89681c96d282098e4420eDa135'

    const simpleMintContract = new ethers.Contract(
      simpleMintAddress,
      SimpleMint.abi,
      signer
    )

    setSigner(signer)
    setAddress(address)
    setSimpleMint(simpleMintContract)
  }

  return (
    <div>
      <Navbar
        address={address}
        connectWallet={connectWallet}
        theme={theme}
        setTheme={setTheme}
      />
      {address && (
        <Web3Context.Provider value={{ signer, address, simpleMint }}>
          <Component {...pageProps} />
        </Web3Context.Provider>
      )}
      {!address && <NoWallet />}
    </div>
  )
}

export default App
