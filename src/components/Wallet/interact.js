import { create } from 'ipfs-http-client'
import swal from 'sweetalert';
import NFTContract from '../../backend/contracts/artWork.sol/NFTContract.json'
import axios from 'axios';
const alchemyKey = "wss://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const contractABI = require('../../src/backend/contracts/artWork.sol/NFTContract.json')
const contractABI = require('../../backend/contracts/artWork.sol/NFTContract.json')
// const contractAddress = "0xE915A57e52A1f5a432b15727EA79e2542d435087";
// connect to a different API
const ipfsClient = create('http://127.0.0.1:5001')

function isMetaMaskInstalled() {
  return Boolean(window.ethereum);
}

const ipfsBaseUrl = ('http://localhot:8080/ipfs/')
// const ipfsBaseUrl = ('http://208.113.134.142:8080/')
// const ipfsBaseUrl = 'https://ipfs.io/ipfs/'
const web3 = createAlchemyWeb3(alchemyKey);

export const ConnectWallet = async () => {
  const chainId = 80001// Polygon Mainnet

  if (window?.ethereum?.networkVersion !== chainId) {
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
              rpcUrls: ['https://rpc-mumbai.maticvigil.com/']
            }
          ]
        });

      }
    }
  }
  if (!isMetaMaskInstalled()) {
    swal('oops!', 'No wallet found. Please install MetaMask', 'error')

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

// const SendStatus = async (id) => {
//   const token = sessionStorage.getItem('authToken')
//   try {
//     await fetch(`${process.env.REACT_APP_BACKEND_API}api/transaction/store`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//       body: {

//       }
//     }.on('confirmation', async (confNumber, receipt) => {
//     }),
//     )
//   } catch (error) {
//     console.log("error");
//   }
// };



const deployContract = async () => {
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: web3.utils.toHex('80001') }],
  })

  const { address } = await ConnectWallet()
  const MyNFTContract = new web3.eth.Contract(NFTContract.abi)
  const gas = await web3.eth.getGasPrice();

  MyNFTContract.deploy({
    data: NFTContract.bytecode,
    arguments: ['CHARITY', 'CHAR']
  }).send({
    from: address,
  })
    .on('error', (error) => {
      console.log(error)
    })
    .on('transactionHash', (transactionHash) => {
      console.log(transactionHash, "transactionHash")
    })
    .on('receipt', (receipt) => {
      // receipt will contain deployed contract address
      console.log(receipt, "reciept")
    })
    .on('confirmation', (confirmationNumber, receipt) => {
      console.log(receipt, "confirmRecipet")
      // // axios.post(

      // if (receipt.contractAddress) {

      // }
      // // )
    })


}

const UpdateStatus = async ({ id, token_id, transaction_hash, pay_from, pay_to }) => {
  try {
    const formData = new FormData();

    formData.append('is_mint', '1');
    formData.append('token_id', token_id);
    formData.append('transaction_hash', transaction_hash);
    formData.append('pay_from', pay_from);
    formData.append('pay_to', pay_to);

    const token = sessionStorage.getItem('authToken')

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
    // debugger
    await axios.post(`${process.env.REACT_APP_BACKEND_API}api/NftUpdate/${id}`,
      formData, config
    )
  } catch (error) {
    // debugger
    console.log("error");
  }
};

const UpdateContract = async (collid, contractAddress) => {
  try {
    const formData = new FormData();

    formData.append('contract_id', contractAddress);

    const token = sessionStorage.getItem('authToken')

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
    // debugger
    await axios.post(`${process.env.REACT_APP_BACKEND_API}api/updateContract/${collid}`,
      formData, config
    )
  } catch (error) {
    console.log("error");
  }
};

export const sendFileToIPFS = async (fileImg) => {
  if (fileImg) {
    try {
      const formData = new FormData();
      formData.append("file", fileImg);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
          'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
          "Content-Type": "multipart/form-data"
        },
      });

      const ImgHash = `ipfs://${resFile.data.IpfsHash}`;

      return ImgHash

    } catch (error) {
      console.log("Error sending File to IPFS: ")
      console.log(error)
    }
  }
}

export const CreateMetaDataAndMint = async ({ id, _imgBuffer, _des, _name, setCurrent, contractAddress, collid }) => {

  const metaDataObj = {
    name: _name,
    description: _des,
    image: _imgBuffer,
  }

  const addedMetaData = await ipfsClient.add(JSON.stringify(metaDataObj));

  const contract = await
    new web3.eth.Contract(contractABI.abi, contractAddress);//loadContract();

  try {
    let txHash = null

    // const web3 = new Web3(window.ethereum);

    await web3.eth.sendTransaction({
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress,
      data: contract.methods.mint(ipfsBaseUrl + addedMetaData.path).encodeABI() //make call to NFT smart contract
    })
      .on('transactionHash', function (hash) {
        txHash = hash

        console.log('txhash11', txHash)

        setCurrent(1)
      })
      .on('receipt', function (receipt) {
        console.log(receipt, 'recipt')
        console.log(receipt.logs[0].topics[3])
        setCurrent(1)
      })
      .on('confirmation', async (confNumber, receipt) => {
        if (confNumber == 1) {
          await UpdateContract(collid, contractAddress)
          const tokid = web3.utils.hexToNumber(receipt.logs[0].topics[3])

          await UpdateStatus({ id, token_id: tokid, transaction_hash: receipt.transactionHash, pay_from: receipt.from, pay_to: receipt.to })
          setCurrent(2)

          // console.log('tokid', tokid)
        }
      })
      .on('error', function (error) {

      })

    // debugger
    console.log('txHash', txHash)
    return {
      success: true,
      // status: ":white_check_mark: Check out your transaction on Etherscan: <https://ropsten.etherscan.io/tx/>" + txHash
      status: ":white_check_mark: Check out your transaction on Etherscan: <https://ropsten.etherscan.io/tx/>"
    }
  } catch (error) {
    // debugger
    alert("went wrong")
    return {
      success: false,
      status: ":disappointed_relieved: Something went wrong: " + error.message
    }
  }
}

export const BuyNft = async ({ contractAddress, tokenId, payFrom, values }) => {
  const addressArray = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const obj = {
    status: "👆🏽 Write a message in the text-field above.",
    address: addressArray[0],
  };

  const nftContract = new web3.eth.Contract(contractABI.abi, contractAddress)
  const nonce = await web3.eth.getTransactionCount(window.ethereum.selectedAddress, 'latest');
  //the transaction
  const amount = '0.01'; // Willing to send 2 ethers
  const amountToSend = web3.utils.toWei(amount, "ether"); // Convert to wei value

  const transferowner = {
    'from': window.ethereum?.selectedAddress,
    'to': contractAddress,
    'value': amountToSend,
    'input': nftContract.methods.buyNft(contractAddress, tokenId).encodeABI()
  };

  // const txHash = await web3.eth.sendTransaction(tx)

  // console.log('txhash', txHash)
  await web3.eth.sendTransaction(transferowner)
    .on('transactionHash', function (hash) {
      let txHash = hash
      console.log('tx', txHash)


    })
    .on('receipt', function (receipt) {
      console.log(receipt, 'recipt')
    })
    .on('confirmation', async (confNumber, receipt) => {
      // debugger
      console.log(receipt, 'conf')
      // setrdata(receipt.transactionHash, receipt.from, receipt.to, receipt.status)
      // setModeShow(false)

      // modalShow(false)
    })
    .on('error', function (error) {

    })
    .then(function (receipt) {
      // will be fired once the receipt is mined
    });
}