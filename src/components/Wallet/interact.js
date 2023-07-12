import React from "react";
import swal from "sweetalert";
import axios from "axios";
import { NftList } from "../../redux/Actions/projectAction";
import { LogsAction } from "../../redux/Actions/logsAction";
import { loginSuccess } from "../../redux/Slices/authSlice";

// const alchemyKey = "wss://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B";
const alchemyKey =
  "https://polygon-mainnet.g.alchemy.com/v2/bDM_VuUmdoyJSNn3Ky8pZL0vBMAc9BXd";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const contractABI = require("../../backend/contracts/artWork.sol/NFTContract.json");

function isMetaMaskInstalled() {
  return Boolean(window.ethereum);
}

// const ipfsBaseUrl = 'https://ipfs.karmatica.io/ipfs/'

const web3 = createAlchemyWeb3(alchemyKey);

export const Roles = {
  ADMIN: 1,
  BUYER: 2,
  CREATOR: 3,
};
export const creatorWalletUpdate = async (auth_token, history) => {
  try {
    const formData = new FormData();

    formData.append("wallet_id", window.ethereum.selectedAddress);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}api/wallet/connect`,
      formData,
      config
    );

    return response;
  } catch (error) {
    if (
      error?.code?.includes("ERR_NETWORK") ||
      error?.response?.data?.statusCode == 401
    ) {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    return error;
  }
};

export const UpdateWalletAddress = async (role, auth_token = null) => {
  try {
    const formData = new FormData();

    formData.append("wallet_id", window.ethereum.selectedAddress);
    formData.append("role", Roles[role]);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}api/sign_in`,
      formData,
      config
    );
    console.log("response", response);

    return response;
  } catch (error) {
    // dispatch(LogsAction(error))
    return error;
    // await dispatch(LogsAction(error))
  }
};

export const ConnectWallet = async (
  role,
  dispatch,
  history
) => {
  // const chainId = 80001// Polygon Mainnet
  const chainId = 137; // Polygon Mainnet

  if (!isMetaMaskInstalled()) {
    swal("oops!", "No wallet found. Please install MetaMask", "error");
  } else {
    if (window?.ethereum?.networkVersion !== chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: web3.utils.toHex(chainId) }],
        });
      } catch (err) {
        dispatch(LogsAction(err));
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "Polygon Mainnet",
                chainId: web3.utils.toHex(chainId),
                nativeCurrency: {
                  name: "MATIC",
                  decimals: 18,
                  symbol: "MATIC",
                },
                rpcUrls: ["https://polygon-rpc.com/"],
                blockExplorerUrls: ["https://polygonscan.com/"],
              },
              // {
              //   chainName: 'Mumbai Testnet',
              //   chainId: web3.utils.toHex(chainId),
              //   nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
              //   rpcUrls: ['https://rpc-mumbai.maticvigil.com/']
              // }
            ],
          });
        }
      }
    }

    if (window.ethereum) {
      await window.ethereum
        .request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        })
        .then(async (permissions) => {
          const accountsPermission = permissions.find(
            (permission) => permission.parentCapability === "eth_accounts"
          );
          if (accountsPermission) {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: web3.utils.toHex("137") }],
              // params: [{ chainId: web3.utils.toHex('80001') }],
            });

            console.log("eth_accounts permission successfully requested!");
            const obj = {
              status: "👆🏽 Write a message in the text-field above.",
              // address: addressArray && addressArray[0],
            };
            const res = await UpdateWalletAddress(role);
            if (res?.status === 401) {
              history.push("/wallet-connect");
            } else {
              if (res == undefined) {
                history.push("/wallet-connect");
              } else {
                dispatch(loginSuccess(res));
                sessionStorage.setItem(
                  "authToken",
                  res?.data?.data?.auth_token
                );
                // eslint-disable-next-line no-lone-blocks
                {
                  res?.data?.data?.role === "2" ? (
                    history.push("/all/LatestProjects")
                  ) : (
                    <>
                      {res?.data?.data?.role === "3" &&
                      res?.data?.data?.is_new_user === true
                        ? history.push("/create/organization")
                        : history.push("/projectlist")}
                    </>
                  );
                }
              }
            }
            // return {
            //   ...obj,
            //   res,
            // };
          }
        })
        .catch((error) => {
          ;
          dispatch(LogsAction(error));
          if (error.code === -32002) {
            // setIsMetamaskopen("Mata-mask request already pending");
            swal(
              "warning",
              "Mata-mask request already pending, permissions needed to continue... ",
              "warning"
            );
            console.log("Permissions needed to continue.");
          } else {
            // setIsMetamaskopen("User rejected the request");
            swal("warning", "User rejected the request ", "warning");
          }
        });
    }
  }
};

export const getCurrentWalletConnected = async (dispatch) => {
  if (window.ethereum) {
    try {
      //
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
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
      dispatch(LogsAction(err));
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
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://metamask.io/download.html`}
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const UpdateStatus = async ({
  slug,
  token_id,
  transaction_hash,
  pay_from,
  pay_to,
  type,
  setModalShow,
  history,
}) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const formData = new FormData();

    formData.append("is_mint", "1");
    formData.append("token_id", token_id);
    formData.append("transaction_hash", transaction_hash);
    formData.append("pay_from", pay_from);
    formData.append("pay_to", pay_to);
    formData.append("type", type.type);
    formData.append("price", type.price);
    formData.append("start_date", type.start_date);
    formData.append("end_date", type.end_date);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.post(
      `${process.env.REACT_APP_BACKEND_API}api/NftUpdate/${slug}`,
      formData,
      config
    );
  } catch (error) {
    if (
      error?.code?.includes("ERR_NETWORK") ||
      error?.response?.data?.statusCode == 401
    ) {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    if (error?.response?.data?.statusCode != 401) {
      swal("error", "Please try again", "error");
    }
    setModalShow(false);
    return error;
  }
};

const UpdateContract = async (
  collid,
  contractAddress,
  setModalShow,
  history
) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const formData = new FormData();

    formData.append("contract_id", contractAddress);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.post(
      `${process.env.REACT_APP_BACKEND_API}api/updateContract/${collid}`,
      formData,
      config
    );
  } catch (e) {
    setModalShow(false);
    if (
      e?.code?.includes("ERR_NETWORK") ||
      e?.response?.data?.statusCode == 401
    ) {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    if (e?.response?.data?.statusCode != 401) {
      swal("error", "something went wrong", "error");
    }
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
          pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const ImgHash = `ipfs://${resFile.data.IpfsHash}`;

      return ImgHash;
    } catch (e) {
      return e;
    }
  }
};

export const CreateMetaDataAndMint = async ({
  slug,
  _imgBuffer,
  _des,
  setLoading,
  _name,
  setCurrent,
  contractAddress,
  collid,
  nft_file_content,
  type,
  price,
  start_date,
  end_date,
  setModalShow,
  dispatch,
  role,
  history,
}) => {
  const contract = await new web3.eth.Contract(
    contractABI.abi,
    contractAddress
  ); //loadContract();

  // new web3.eth.Contract(contractABI.abi, "0xdDA37f9D3e72476Dc0c8cb25263F3bb9426B4A5A");//loadContract();
  try {
    // const web3 = new Web3(window.ethereum);
    await web3.eth
      .sendTransaction({
        from: window.ethereum.selectedAddress,
        to: contractAddress, // Required except during contract publications.

        data: contract.methods.mint(nft_file_content).encodeABI(), //make call to NFT smart contract
      })
      .on("transactionHash", function () {
        setCurrent(1);
      })
      .on("receipt", function (receipt) {
        setCurrent(1);
      })
      .on("confirmation", async (confNumber, receipt) => {
        if (confNumber == "1") {
          await UpdateContract(collid, contractAddress, setModalShow, history);

          const tokid = web3.utils.toBN(receipt.logs[0].topics[3]);

          await UpdateStatus({
            slug: slug.id,
            token_id: tokid,
            transaction_hash: receipt.transactionHash,
            pay_from: receipt.from,
            pay_to: receipt.to,
            type,
            setModalShow,
            price,
            start_date,
            end_date,
          });
          setCurrent(2);
          await dispatch(NftList(slug.id, setLoading, history));
        }
      })
      .on("error", function (error) {
        setModalShow(false);
      });

    return {
      success: true,
      status:
        ":white_check_mark: Check out your transaction on Etherscan: <https://ropsten.etherscan.io/tx/>",
    };
  } catch (error) {
    await dispatch(LogsAction(error));

    swal("error", "Metamask is busy, please retry ", "error");
    setModalShow(false);
    return {
      success: false,
      status: ":disappointed_relieved: Something went wrong: " + error.message,
    };
  }
};

const UpdateBuyHistory = async (
  nft_id,
  proj_id,
  refid,
  txd_id,
  payFrom,
  pay_to,
  tokenId,
  values
) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const formData = new FormData();

    formData.append("price", nft_id.values);
    formData.append("txd_id", nft_id.txd_id);
    formData.append("project_id", nft_id.proj_id);
    formData.append("nft_id", nft_id.nft_id);
    formData.append("pay_from", nft_id.payFrom);
    formData.append("pay_to", nft_id.pay_to);
    formData.append("token_id", nft_id.tokenId);
    formData.append("ref_id", nft_id.refid);
    formData.append("ref_amount", nft_id.ref_amount);
    formData.append("status", "1");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    //
    await axios.post(
      `${process.env.REACT_APP_BACKEND_API}api/transaction/store`,
      formData,
      config
    );
  } catch (error) {
    return error;
  }
};

export const updateReffid = async ({
  tokenId,
  refid,
  nft_id,
  dispatch,
  setPaymentFlow,
  history,
}) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const formData = new FormData();
    formData.append("token_id", tokenId);
    formData.append("ref_id", refid);
    formData.append("nft_id", nft_id);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(
      `${process.env.REACT_APP_BACKEND_API}api/getUserPercentage`,
      formData,
      config
    );
  } catch (error) {
    if (
      error?.code?.includes("ERR_NETWORK") ||
      error?.response?.data?.statusCode == 401
    ) {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    await dispatch(LogsAction(error));
  }
};

export const BuyNft = async ({
  contractAddress,
  tokenId,
  payFrom,
  values,
  platformFee,
  sellingCount,
  ownerFee,
  flow,
  ownerWallet,
  refid,
  proj_id,
  nft_id,
  loadingg,
  modal,
  dispatch,
  history,
}) => {
  if (!isMetaMaskInstalled()) {
    swal("oops!", "No wallet found. Please install MetaMask", "error");
  } else {
    if (!window.ethereum?.selectedAddress) {
      ConnectWallet("BUYER", history);
    }
    try {
      let wallets = [];
      let fee = [];

      const karmfee = (values * 1) / 100;
      const totalValue = parseFloat(values) + parseFloat(karmfee);
      wallets =
        flow[0]?.referral_fees?.wallets === null
          ? [
              ...wallets,
              ...flow[0]?.buyer_data?.map((x) => x.wallets),
              flow[0]?.karmatica_fees?.wallets,
              flow[0]?.project_data?.wallets,
            ]
          : [
              ...wallets,
              ...flow[0]?.buyer_data?.map((x) => x.wallets),
              flow[0]?.karmatica_fees?.wallets,
              flow[0]?.project_data?.wallets,
              flow[0]?.referral_fees?.wallets,
            ];
      fee =
        flow[0]?.referral_fees?.wallets === null
          ? [
              ...fee,
              ...flow[0]?.buyer_data?.map((x) => x.fees),
              +parseFloat(flow[0]?.karmatica_fees?.fees) + parseFloat(karmfee),
              flow[0]?.project_data?.fees,
            ]
          : [
              ...fee,
              ...flow[0]?.buyer_data?.map((x) => x.fees),
              +parseFloat(flow[0]?.karmatica_fees?.fees) + parseFloat(karmfee),
              flow[0]?.project_data?.fees,
              flow[0]?.referral_fees?.fees,
            ];
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const nftContract = new web3.eth.Contract(
        contractABI.abi,
        contractAddress
      );

      const memory_clients = wallets.map((wal) => {
        return `${wal}`;
      });
      const memory_amounts = fee.map((amt) => {
        const amountToSend = (parseFloat(amt) * totalValue) / 100;
        return web3.utils.toWei(`${amountToSend}`, "ether");
      });
      const referal_amount = fee.map((amt) => {
        return (parseFloat(amt) * totalValue) / 100;
        // return web3.utils.toWei(`${amountToSend}`, "ether")
      });

      await nftContract.methods
        .buyNft(contractAddress, tokenId, memory_clients, memory_amounts)
        .send({
          from: window.ethereum?.selectedAddress,
          value: web3.utils.toWei('0.03', "ether"),
          gasPrice: web3.utils.toHex(10000000),
          gasLimit: web3.utils.toHex(1000000),
        })

        .on("transactionHash", (hash) => {
          sessionStorage.setItem("transactionHash", hash);
        })
        .on("receipt", (receipt) => {
          console.log(receipt.contractAddress); // 0xf4cb...
        })
        .on("confirmation", (confNumber, receipt) => {
          if (confNumber === 1) {
            // checkTransactionStatus(receipt.transactionHash)

            UpdateBuyHistory({
              nft_id,
              proj_id,
              refid,
              txd_id: receipt.transactionHash,
              payFrom,
              pay_to: window.ethereum?.selectedAddress,
              tokenId,
              values,
              ref_amount:
                flow[0]?.referral_fees?.wallets !== null
                  ? referal_amount[2]
                  : 0,
            });
            loadingg(false);
            swal("success", "Confirmed", "success").then(function () {
              window.location = `/my/nfts`;
            });
          }
        })

        .on("error", function (error) {
          // checkTransactionStatus(sessionStorage.getItem('transactionHash'))
          dispatch(LogsAction(error));

          modal(false);
          loadingg(false);
        })
        .then(function (receipt) {
          // will be fired once the receipt is mined
        });

      // }
    } catch (error) {
      dispatch(LogsAction(error));
      // checkTransactionStatus(sessionStorage.getItem("transactionHash"), loadingg)
      swal("error", "Network is busy please try again", "error");
      loadingg(false);
      // alert(JSON.stringify(error.message))
    }
  }
};
const UpdateBid = async ({
  amount,
  project_id,
  nft_id,
  pay_to,
  from,
  onHide,
  setLoading,
  history,
}) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const formData = new FormData();

    formData.append("amount", amount);
    formData.append("project_id", project_id);
    formData.append("nft_id", nft_id);
    formData.append("pay_from", from);
    formData.append("pay_to", pay_to);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    //
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}api/project/bids`,
      formData,
      config
    );
    if (res.status === 200) {
      setLoading(false);
      swal("success", res?.data?.message, "success");
      onHide(false);
    }
  } catch (error) {
    if (
      error?.code?.includes("ERR_NETWORK") ||
      error?.response?.data?.statusCode == 401
    ) {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    if (error?.response?.data?.statusCode != 401) {
      swal("error", error?.response?.data?.message, "error");
    }

    return error;
    //
    // console.log("error");
  }
};

export const BidNft = async (
  id,
  projid,
  from,
  onHide,
  setLoading,
  amount,
  history
) => {
  try {
    setLoading(true);

    UpdateBid({
      amount: amount,
      project_id: projid,
      nft_id: id,
      from,
      onHide,
      setLoading,
      history,
    });
  } catch (error) {
    swal("error", error, "error");
  }
};
