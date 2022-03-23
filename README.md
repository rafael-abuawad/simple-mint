# Simple Mint

This app lets you mint NFTs and add their corresponding metadata from a clear and easy to use interface.

## Tutorial

I've written a step-by-step tutorial that explains how to create this same application, [you can read it here.](https://dev.to/rafael_abuawad/create-a-simple-minting-dapp-using-nextjs-brownie-solidity-and-tailwindcss-2034-temp-slug-4834495)

## Features

- Let's the user create an NFT, with an image and metadata (properties)
- Stores and displays the NFTs the user owns
- Collect fees from every mint
- Dark/Light mode


## Installation

1. [Install Brownie](https://eth-brownie.readthedocs.io/en/stable/install.html), if you haven't already. You must be using version `1.9.0` or newer.

2. Download the project.

    ```bash
    git clone https://github.com/rafael-abuawad/simple-mint.git
    ```

3. Install the Next (React) client dependencies.

    ```bash
    cd ./client
    npm install 
    ```

4. If you want to be able to deploy to testnets, do the following.

    Set your WEB3_INFURA_PROJECT_ID, and PRIVATE_KEY environment variables.

    You can get a WEB3_INFURA_PROJECT_ID by getting a free trial of Infura. At the moment, it does need to be infura with brownie. If you get lost, follow the instructions at https://ethereumico.io/knowledge-base/infura-api-key-guide/. You can find your PRIVATE_KEY from your ethereum wallet like metamask.

    You'll also need testnet ETH. You can get ETH into your wallet by using the faucet for the appropriate
    testnet. For Kovan, a faucet is available at https://linkfaucet.protofire.io/kovan.

    You can add your environment variables to a .env file. You can use the .env_example in this repo 
    as a template, just fill in the values and rename it to '.env'. 

    Here is what your .env should look like:

    ```bash
    export WEB3_INFURA_PROJECT_ID=<PROJECT_ID>
    export PRIVATE_KEY=<PRIVATE_KEY>
    ```
   
5. Create brownie account(s) following instructions here:
       https://eth-brownie.readthedocs.io/en/stable/account-management.html

6. Import the brownie account to MetaMask using their private key(s)

### Testing

To run the test suite:

```bash
brownie test
```

## License

Simple Mint source code is licensed under the [MIT](LICENSE.md) license.
