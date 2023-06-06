
import swal from 'sweetalert';
import axios from 'axios';
import { NftList } from '../../redux/Actions/projectAction';
import { useState } from 'react';
import { logdispatch, LogsAction } from '../../redux/Actions/logsAction';
import { useDispatch } from 'react-redux';
import { getNftwolDetailsPaymentflow } from '../../redux/Slices/projectSlice';
import Swal from 'sweetalert2';



// const alchemyKey = "wss://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B";
const alchemyKey = "https://polygon-mainnet.g.alchemy.com/v2/bDM_VuUmdoyJSNn3Ky8pZL0vBMAc9BXd"
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const contractABI = require('../../backend/contracts/artWork.sol/NFTContract.json')


function isMetaMaskInstalled() {
  return Boolean(window.ethereum);
}

// const ipfsBaseUrl = 'https://ipfs.karmatica.io/ipfs/'

const web3 = createAlchemyWeb3(alchemyKey);

export const Roles = {
  "ADMIN": 1,
  "BUYER": 2,
  "CREATOR": 3
}
export const creatorWalletUpdate = async (auth_token) => {
  try {

    const formData = new FormData();

    formData.append('wallet_id', window.ethereum.selectedAddress);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
    }

    const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/wallet/connect`,
      formData, config
    )

    return response

  } catch (error) {

    return error
  }
}

export const UpdateWalletAddress = async (role, auth_token = null) => {
  try {

    const formData = new FormData();

    formData.append('wallet_id', window.ethereum.selectedAddress);
    formData.append('role', Roles[role])

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
    }

    const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/sign_in`,
      formData, config
    )

    return response

  } catch (error) {
    // dispatch(LogsAction(error))
    return error
    // await dispatch(LogsAction(error))
  }
};

export const ConnectWallet = async (role, dispatch) => {
  // const chainId = 80001// Polygon Mainnet
  const chainId = 137 // Polygon Mainnet

  if (window?.ethereum?.networkVersion !== chainId) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(chainId) }]
      });

    } catch (err) {
      dispatch(LogsAction(err))
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: 'Polygon Mainnet',
              chainId: web3.utils.toHex(chainId),
              nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
              rpcUrls: ['https://polygon-rpc.com/'],
              blockExplorerUrls: ['https://polygonscan.com/']
            }
            // {
            //   chainName: 'Mumbai Testnet',
            //   chainId: web3.utils.toHex(chainId),
            //   nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
            //   rpcUrls: ['https://rpc-mumbai.maticvigil.com/']
            // }
          ]
        });
      }
    }
  }
  if (!isMetaMaskInstalled()) {
    swal('oops!', 'No wallet found. Please install MetaMask', 'error')

  } else {
    // 
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });

        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex('137') }],
          // params: [{ chainId: web3.utils.toHex('80001') }],
        })

        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
        };

        const res = await UpdateWalletAddress(role)
        return {
          ...obj,
          res
        }

      } catch (err) {
        dispatch(LogsAction(err))
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
              <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
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

export const getCurrentWalletConnected = async (dispatch) => {
  if (window.ethereum) {
    try {
      // 
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
      dispatch(LogsAction(err))
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
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};



export const UpdateStatus = async ({ slug, token_id, transaction_hash, pay_from, pay_to, type, setModalShow }) => {

  const token = sessionStorage.getItem('authToken')
  try {
    const formData = new FormData();

    formData.append('is_mint', '1');
    formData.append('token_id', token_id);
    formData.append('transaction_hash', transaction_hash);
    formData.append('pay_from', pay_from);
    formData.append('pay_to', pay_to);
    formData.append('type', type.type)
    formData.append('price', type.price)
    formData.append('start_date', type.start_date)
    formData.append('end_date', type.end_date)


    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }
    // 
    await axios.post(`${process.env.REACT_APP_BACKEND_API}api/NftUpdate/${slug}`,
      formData, config

    )
  } catch (error) {

    swal("error", "Please try again", "error")
    setModalShow(false)
    return error
    // await dispatch(LogsAction(error))
    // 
    // console.log("error");
  }
};

const UpdateContract = async (collid, contractAddress, setModalShow) => {

  const token = sessionStorage.getItem('authToken')
  try {
    const formData = new FormData();

    formData.append('contract_id', contractAddress);


    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }
    // 
    await axios.post(`${process.env.REACT_APP_BACKEND_API}api/updateContract/${collid}`,
      formData, config
    )
  } catch (e) {
    setModalShow(false)
    swal("error", "something went wrong", "error")
    // await dispatch(LogsAction(e))

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

    } catch (e) {
      return e
      // await dispatch(LogsAction(e))

      // console.log("Error sending File to IPFS: ")
      // console.log(error)
    }
  }
}

export const CreateMetaDataAndMint = async ({ slug, _imgBuffer, _des, setLoading, _name, setCurrent, contractAddress, collid, nft_file_content, type, price, start_date, end_date, setModalShow, dispatch, role }) => {

  const contract = await new web3.eth.Contract(contractABI.abi, contractAddress);//loadContract();

  // new web3.eth.Contract(contractABI.abi, "0xdDA37f9D3e72476Dc0c8cb25263F3bb9426B4A5A");//loadContract();
  try {
    let txHash = null
    // const web3 = new Web3(window.ethereum);
    const gasPrice = await web3.eth.getGasPrice();
    await web3.eth.sendTransaction({
      from: window.ethereum.selectedAddress,
      to: contractAddress, // Required except during contract publications.


      data: contract.methods.mint(nft_file_content).encodeABI() //make call to NFT smart contract
    })
      .on('transactionHash', function (hash) {
        txHash = hash
        // console.log('txhash11', txHash)

        setCurrent(1)
      })
      .on('receipt', function (receipt) {
        // console.log(receipt, 'recipt')
        // console.log(receipt.logs[0].topics[3])
        setCurrent(1)
      })
      .on('confirmation', async (confNumber, receipt) => {
        console.log('receipt', receipt)
        if (confNumber == 1) {

          if (collid != 1) {
            await UpdateContract(collid, contractAddress, setModalShow)
          }
          // 

          // await UpdateContract(collid, "0xdDA37f9D3e72476Dc0c8cb25263F3bb9426B4A5A")
          const tokid = web3.utils.toBN(receipt.logs[0].topics[3])
          // console.log(startdate)

          await UpdateStatus({ slug: slug.id, token_id: tokid, transaction_hash: receipt.transactionHash, pay_from: receipt.from, pay_to: receipt.to, type, setModalShow, price, start_date, end_date })
          setCurrent(2)
          await dispatch(NftList(slug.id, setLoading))

          // history.push(`nft/details/${slug.id}`)
          // return redirect(`nft/details/${id}`)
          // console.log('tokid', tokid)
        }
      })
      .on('error', function (error) {
        swal("error", "Metamask is busy, please retry ", "error")
        setModalShow(false)
      })

    // 
    // console.log('txHash', txHash)
    return {
      success: true,
      // status: ":white_check_mark: Check out your transaction on Etherscan: <https://ropsten.etherscan.io/tx/>" + txHash
      status: ":white_check_mark: Check out your transaction on Etherscan: <https://ropsten.etherscan.io/tx/>"
    }
  } catch (error) {
    await dispatch(LogsAction(error))
    // Await dispatch(LogsAction(error)

    // 
    swal("error", "Transaction cancelled", "error")
    setModalShow(false)
    return {
      success: false,
      status: ":disappointed_relieved: Something went wrong: " + error.message
    }
  }
}

const UpdateBuyHistory = async (nft_id, proj_id, refid, txd_id, payFrom, pay_to, tokenId, values) => {

  const token = sessionStorage.getItem('authToken')
  try {
    const formData = new FormData();

    formData.append('price', nft_id.values);
    formData.append('txd_id', nft_id.txd_id);
    formData.append('project_id', nft_id.proj_id);
    formData.append('nft_id', nft_id.nft_id);
    formData.append('pay_from', nft_id.payFrom);
    formData.append('pay_to', nft_id.pay_to);
    formData.append('token_id', nft_id.tokenId);
    formData.append('ref_id', nft_id.refid);
    formData.append('ref_amount', nft_id.ref_amount);
    formData.append('status', '1');


    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }
    // 
    await axios.post(`${process.env.REACT_APP_BACKEND_API}api/transaction/store`,
      formData, config
    )
  } catch (error) {
    return error
    // await dispatch(LogsAction(error))

    // 
    // console.log("error");
  }
};

export const updateReffid = async ({ tokenId, refid, nft_id, dispatch, setPaymentFlow }) => {

  const token = sessionStorage.getItem('authToken')
  try {
    const formData = new FormData();

    formData.append('token_id', tokenId);
    formData.append('ref_id', refid);
    formData.append('nft_id', nft_id);



    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }
    // 
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/getUserPercentage`,
      formData, config
    )
    // await dispatch(res())                  
    // const reffee = sessionStorage.setItem('refamount', res?.data?.data?.referral_fees[0]?.fees) 
    if (res?.status === 200) {
      // await dispatch(getNftwolDetailsPaymentflow(res))
      // const data =  Object.entries(res.data.data[0])?.map(x=>x)
      // (setPaymentFlow(res?.data?.data))
      //  await dispatch(sessionStorage.setItem('paymentFlow', res?.data?.data))
    }

    // if (res.status === 200) {
    // setRefamount(res?.data?.data)
    // }
  } catch (error) {
    await dispatch(LogsAction(error))

    // 
    // console.log("error");
  }
};


export const BuyNft = async ({ contractAddress, tokenId, payFrom, values, platformFee, sellingCount, ownerFee, flow, ownerWallet, refid, proj_id, nft_id, loadingg, modal, dispatch }) => {
  debugger
  // const flow = JSON.parse(sessionStorage.getItem('paymentFlow') || "[]")
  if (!isMetaMaskInstalled()) {
    swal('oops!', 'No wallet found. Please install MetaMask', 'error')
  } else {
    if (!window.ethereum?.selectedAddress) {
      ConnectWallet("BUYER")
    }
    try {

      let wallets = []
      let fee = []

      const karmfee = values * 1 / 100
      const totalValue = parseFloat(values) + parseFloat(karmfee)
      console.log('totalValue', totalValue)
      wallets = (flow[0]?.referral_fees?.wallets === null) ?
        [...wallets, ...flow[0]?.buyer_data?.map(x => x.wallets), flow[0]?.karmatica_fees?.wallets, flow[0]?.project_data?.wallets] :
        [...wallets, ...flow[0]?.buyer_data?.map(x => x.wallets), flow[0]?.karmatica_fees?.wallets, flow[0]?.project_data?.wallets, flow[0]?.referral_fees?.wallets]
      fee = (flow[0]?.referral_fees?.wallets === null) ?
        [...fee, ...flow[0]?.buyer_data?.map(x => x.fees), + parseFloat(flow[0]?.karmatica_fees?.fees) + parseFloat(karmfee), flow[0]?.project_data?.fees] :
        [...fee, ...flow[0]?.buyer_data?.map(x => x.fees), + parseFloat(flow[0]?.karmatica_fees?.fees) + parseFloat(karmfee), flow[0]?.project_data?.fees, flow[0]?.referral_fees?.fees]
      console.log(fee)
      console.log(wallets)
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: ":point_up_2::skin-tone-4: Write a message in the text-field above.",
        address: addressArray[0],
      };
      const nftContract = new web3.eth.Contract(contractABI.abi, contractAddress)
      console.log('nftContract', nftContract)

      const memory_clients = wallets.map(wal => {
        return (`${wal}`)
      })
      console.log('memory_clients', memory_clients)
      const memory_amounts = fee.map(amt => {
        const amountToSend = ((parseFloat(amt) * totalValue / 100))
        console.log('amountToSend', amountToSend)
        return web3.utils.toWei(`${amountToSend}`, "ether")

      })
      const referal_amount = fee.map(amt => {
        return ((parseFloat(amt)) * totalValue / 100)
        // return web3.utils.toWei(`${amountToSend}`, "ether")

      })

      console.log('referal_amount', referal_amount)
      const tx = await nftContract.methods.buyNft(contractAddress, tokenId, memory_clients, memory_amounts)
        .send({ from: window.ethereum?.selectedAddress, value: web3.utils.toWei(String(totalValue), 'ether'), gasPrice: web3.utils.toHex(10000000), gasLimit: web3.utils.toHex(1000000) })


        .on('transactionHash', (hash) => {

          sessionStorage.setItem('transactionHash', hash)


        })
        .on('receipt', (receipt) => {
          console.log(receipt.contractAddress); // 0xf4cb...
        })
        .on('confirmation', (confNumber, receipt) => {



          if (confNumber == 1) {

            // checkTransactionStatus(receipt.transactionHash)
            console.log(confNumber, 'counttrans')
            console.log(receipt, 'conf')

            UpdateBuyHistory({ nft_id, proj_id, refid, txd_id: receipt.transactionHash, payFrom, pay_to: window.ethereum?.selectedAddress, tokenId, values, ref_amount: flow[0]?.referral_fees?.wallets !== null ? referal_amount[2] : 0 })
            loadingg(false)
            swal("success", "Confirmed", 'success').then(function () {
              window.location = `/my/nfts`;
            });
          }

        })

        .on('error', function (error) {
          debugger
          // checkTransactionStatus(sessionStorage.getItem('transactionHash'))
          dispatch(LogsAction(error))

          modal(false)
          loadingg(false)
        })
        .then(function (receipt) {
          // will be fired once the receipt is mined
        })

      // }
    } catch (error) {
      debugger
      dispatch(LogsAction(error))
      // checkTransactionStatus(sessionStorage.getItem("transactionHash"), loadingg)
      swal("error", JSON.stringify(error.message), "error")
      loadingg(false)
      // alert(JSON.stringify(error.message))
    }
  }
}
const UpdateBid = async ({ amount, project_id, nft_id, pay_to, from, onHide, setLoading }) => {
  const token = sessionStorage.getItem('authToken')
  try {
    const formData = new FormData();

    formData.append('amount', amount);
    formData.append('project_id', project_id);
    formData.append('nft_id', nft_id);
    formData.append('pay_from', from);
    formData.append('pay_to', pay_to);


    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }
    // 
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/project/bids`,
      formData, config
    )
    console.log('ress', res)
    if (res.status == 200) {
      setLoading(false)
      swal("success", res?.data?.message, 'success')
      onHide(false)
    }
  } catch (error) {
    swal("error", error?.response?.data?.message, 'error')
    return error
    // 
    // console.log("error");
  }
};

export const BidNft = async (id, projid, from, onHide, setLoading, amount) => {

  try {
    setLoading(true)

    UpdateBid({ amount: amount, project_id: projid, nft_id: id, from, onHide, setLoading })

  } catch (error) {

    swal("error", error, "error")

  }
}

