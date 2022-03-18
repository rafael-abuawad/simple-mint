// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// Te will extend/use this open zeppelin smart contract to save time
// if you nee more information about ERC721 checkout the OpenZeppelin docs
// https://docs.openzeppelin.com/contracts/4.x/erc721
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// This smart contract enabled us to give access control to some functions
// https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleMint is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    // This is the minting fee users have to pay to mint an NFT
    // on the platform
    uint256 private _fee = 0.0025 ether;

    constructor() ERC721("SimpleMint", "SIMPLE") {}

    // We will use this Token struct to return better data to the user
    struct Token { string uri; uint256 id; }

    function safeMint(string memory uri) public payable {
        // This 'require' ensures the user is paying
        // the minting fee
        require (
            msg.value == _fee,
            "You nee to pay a small fee to mint the NFT."
        );

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // This function will return a list of Token URIs
    // given an Ethreum address
    function tokensOf(address minter)
        public
        view
        returns (Token[] memory)
    {
        // Here we count how many tokens does the user have 
        uint256 count = 0;

        for(uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            if(ownerOf(i) == minter) {
                count ++;
            }
        }

        // Here we create and populate the tokens with their
        // correspoding Token URI
        Token[] memory tokens = new Token[](count);
        uint256 index = 0;

        for(uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            if(ownerOf(i) == minter) {
                // Returns 
                tokens[index] = Token(tokenURI(i), i);
                index ++;
            }
        }

        return tokens;
    }

    // This function returns the minting fee to users
    function fee()
        public
        view
        returns (uint256)
    {
        return _fee;
    }

    // This function allows you, **and only you**, to change 
    // the minting fee
    function setFee(uint256 newFee)
        public
        onlyOwner
    {
        _fee = newFee;
    }

    // This function will transfer all the fees collected
    // to the owner
    function withdraw()
        public
        onlyOwner
    {
        (bool success, ) = payable(owner()).call{ value: address(this).balance }("");
        require (success);
    }
}
