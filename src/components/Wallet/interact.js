import { create } from 'ipfs-http-client'
import { useState } from 'react';
const alchemyKey = "wss://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const contractABI = require('../../src/backend/contracts/artWork.sol/NFTContract.json')
const contractABI = require('../../backend/contracts/artWork.sol/NFTContract.json')
const contractAddress = "0xE915A57e52A1f5a432b15727EA79e2542d435087";
// connect to a different API
const ipfsClient = create('http://127.0.0.1:5001')

function isMetaMaskInstalled() {
  return Boolean(window.ethereum);
}

const ipfsBaseUrl = `${process.env.REACT_APP_IPFS_BASE_URL}`
// const ipfsBaseUrl = 'https://ipfs.io/ipfs/'
const web3 = createAlchemyWeb3(alchemyKey);

export const ConnectWallet = async () => {
  const chainId = 80001// Polygon Mainnet

  if (window.ethereum.networkVersion !== chainId) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(chainId) }]
      });
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: 'Mumbai Testnet',
              chainId: web3.utils.toHex(chainId),
              nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
              rpcUrls: [' https://polygon-mumbai.g.alchemy.com/v2/your-api-key']
            }
          ]
        });
      }
    }
  }
  if (!isMetaMaskInstalled()) {
    alert('No wallet found. Please install MetaMask')

  } else {

    // const [add, setAdd] = useState([])
    // console.log(add, 'addd')
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // setAdd({ ...addressArray })
        // useEffect(() => {
        // localStorage.setItem('addressArray', JSON.stringify(addressArray));
        // console.log('first', addressArray)
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex('80001') }],
        })
        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  }
}

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      // debugger
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      // console.log(addressArray, 'address')
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const createMetaDataAndMint = async ({ _imgBuffer, _des, _name }) => {
  const addedImage = await ipfsClient.add(_imgBuffer);
  const metaDataObj = {
    name: _name,
    description: _des,
    image: ipfsBaseUrl + addedImage.path,
  }
  const addedMetaData = await ipfsClient.add(JSON.stringify(metaDataObj));
  // const tokenURI = addedMetaData;
  // console.log(first)
  const contract = await new web3.eth.Contract(contractABI.abi, contractAddress);//loadContract();
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress,
    'data': contract.methods.mint(ipfsBaseUrl + addedMetaData.path).encodeABI() //make call to NFT smart contract
  };
  try {
    const txHash = await window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
    console.log('txHash', txHash)
    return {
      success: true,
      status: ":white_check_mark: Check out your transaction on Etherscan: <https://ropsten.etherscan.io/tx/>" + txHash
    }
  } catch (error) {
    return {
      success: false,
      status: ":disappointed_relieved: Something went wrong: " + error.message
    }
  }
}