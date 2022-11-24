import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { DeleteProject, GetSettings, LatestProjectDetail, NftList, ProjectDetail, UpdateCollection } from '../../redux/Actions/projectAction';
import { getProjectDetail } from '../../redux/Slices/projectSlice';
import { useState } from 'react';
import dayjs from 'dayjs'
import Web3 from 'web3';
import NFTContract from '../../backend/contracts/artWork.sol/NFTContract.json'
import { BuyNft, ConnectWallet } from '../Wallet/interact';
import EditCollection from './updateCollection';
import { CreateMetaDataAndMint } from './../Wallet/interact';
import NftPopup from './nftPopup';
import axios from 'axios';
const alchemyKey = "wss://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// console.log(NFTContract.abi,"abi")
const web3 = createAlchemyWeb3(alchemyKey);
const provider = new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B");
const NftDetails = (props) => {

    const initData = {
        itemImg: "/img/avtar1.png",
        date: "2022-03-30",
        tab_1: "Activity",
        tab_2: "History",
        tab_3: "Details",
        ownerImg: "/img/avtar1.png",
        itemOwner: "Themeland",
        created: "15 Jul 2021",
        title: "Walking On Air",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
        price_1: "1.5 ETH",
        price_2: "$500.89",
        count: "1 of 5",
        size: "14000 x 14000 px",
        volume: "64.1",
        highest_bid: "2.9 BNB",
        bid_count: "1 of 5",
        btnText: "Place a Bid"
    }
    const tabData_1 = [
        {
            id: "1",
            img: "/img/avtar1.png",
            price: "14 ETH",
            time: "4 hours ago",
            author: "@arham"
        },
        {
            id: "2",
            img: "/img/avtar2.jpg",
            price: "10 ETH",
            time: "8 hours ago",
            author: "@junaid"
        },
        {
            id: "3",
            img: "/img/avtar3.png",
            price: "12 ETH",
            time: "3 hours ago",
            author: "@yasmin"
        }
    ]

    const tabData_2 = [
        {
            id: "1",
            img: "/img/avtar1.png",
            price: "32 ETH",
            time: "10 hours ago",
            author: "@hasan"
        },
        {
            id: "2",
            img: "/img/avtar2.jpg",
            price: "24 ETH",
            time: "6 hours ago",
            author: "@artnox"
        },
        {
            id: "3",
            img: "/img/avtar3.png",
            price: "29 ETH",
            time: "12 hours ago",
            author: "@meez"
        }
    ]

    const sellerData = [
        {
            id: "1",
            img: "/img/avtar1.png",
            seller: "@ArtNoxStudio",
            post: "Creator"
        },
        {
            id: "2",
            img: "/img/avtar2.jpg",
            seller: "Virtual Worlds",
            post: "Collection"
        }
    ]
    const [modalShow, setModalShow] = React.useState(false);
    const [current, setCurrent] = React.useState(0)
    const [contractAdd, setContractAdd] = useState('')
    // const [collid, setCollid] = useState('')
    // console.log('collid', collid)
    console.log('contAddre', contractAdd)
    console.log('current', current)
    const { id } = useParams();
    // console.log(id, 'idd')
    const projdetail = useSelector(state => {
        // debugger
        return state?.projectdetails?.projectdetails
    })
    console.log(projdetail, 'projdataaaa')


    const dispatch = useDispatch()

    const nftdetail = useSelector(state => {
        // debugger
        return state.projectdetails.nftlist

    })
    console.log(nftdetail, 'latprojdetail')
    const collupdate = useSelector(state => {
        return state?.projectdetails?.collectiondetails
    })

    console.log('collupdate', collupdate)
    useEffect(() => {
        // debugger
        dispatch(NftList(id))
        dispatch(ProjectDetail(id))
        // dispatch(GetSettings())
    }, [id])


    const mint = (contractAddress) => {
        CreateMetaDataAndMint({
            _name: nftdetail.title,
            _des: nftdetail.description,
            _imgBuffer: nftdetail.image,
            contractAddress,
            setCurrent,
            collid: nftdetail?.collection_id,
            id,
            setModalShow
        })
    }


    // const UpdateContract = async (id) => {
    //     debugger

    //     const formData = new FormData();

    //     formData.append('contract_id', cont);
    //     const token = sessionStorage.getItem('authToken')


    //     try {
    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             },
    //             transformRequest: formData => formData
    //         }
    //         // debugger
    //         await axios.post(`${process.env.REACT_APP_BACKEND_API}api/updateContract/${id}`,
    //             formData, config
    //         )
    //     } catch (error) {
    //         debugger
    //         console.log("error");
    //     }
    // };


    const deployContract = async () => {
        try {
            if (nftdetail?.collectionData?.contract_id == null) {

                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: web3.utils.toHex('80001') }],
                })

                const { address } = await ConnectWallet()
                const MyNFTContract = new web3.eth.Contract(NFTContract.abi)
                const gas = await web3.eth.getGasPrice();

                MyNFTContract.deploy({
                    data: NFTContract.bytecode,
                    arguments: ['CHARITY', '']
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
                    .on('confirmation', (confNumber, receipt) => {
                        console.log(receipt.contractAddress, "confirmRecipet")
                        if (confNumber == 1) {
                            mint(receipt?.contractAddress)
                            // setContractAdd(receipt?.contractAddress)
                            // UpdateContract(id)
                        }
                    })
            } else {
                mint(nftdetail?.collectionData?.contract_id)
            }
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

    const deployAndMint = async () => {
        setModalShow(true)
        // mint()
        await deployContract()
        // nftdetail.id()
    }
    return (
        <section className="item-details-area">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-12 col-lg-5">
                        <div className="item-info">
                            {/* {latprojdetail?.map((item, key) => ( */}

                            <><div className="item-thumb text-center">
                                <img src={nftdetail?.image} alt="" />
                            </div><div className="card no-hover countdown-times my-4">
                                    <div className="countdown d-flex justify-content-center" />
                                </div>
                                {/* Netstorm Tab */}
                                {/* <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
                                    <><li>
                                        <a className="active" id="nav-home-tab" data-toggle="pill" href="#nav-home">
                                            <h5 className="m-0">{initData.tab_1}</h5>
                                        </a>
                                    </li><li>
                                            <a id="nav-contact-tab" data-toggle="pill" href="#nav-contact">
                                                <h5 className="m-0">{initData.tab_3}</h5>
                                            </a>
                                        </li></>
                                </ul> */}
                            </>
                            {/* ))
                            } */}
                            {/* <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-home">
                                    <ul className="list-unstyled">
                                        {tabData_1.map((item, idx) => {
                                            return (
                                                <li className="single-tab-list d-flex align-items-center">
                                                    <img className="avatar-sm rounded-circle mr-3" src={item.img} alt="" />
                                                    <p className="m-0">Bid listed for <strong>{item.price}</strong> {item.time} <br />by <a href="/author">{nftdetail?.user_data?.username}</a></p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>

                                <div className="tab-pane fade" id="nav-contact">
                                    <div className="owner-meta d-flex align-items-center mt-3">
                                        <span>Owner</span>
                                        <a className="owner d-flex align-items-center ml-2" href="/author">
                                            <img className="avatar-sm rounded-circle" src={initData.ownerImg} alt="" />
                                            <h6 className="ml-2">{nftdetail?.user_data?.username}</h6>
                                        </a>
                                    </div>
                                    <p className="mt-2">Created : {dayjs(nftdetail?.created_at).format("DD MMM YYYY")}</p>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="content mt-5 mt-lg-0">
                            {nftdetail.is_mint == 1 ? (

                                <div className='eddlbtton d-flex  align-items-center px-2'>

                                    <button className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" style={{ color: '#FFF' }}
                                    >  Ready to purchase</button>


                                </div>
                            ) : (

                                <div className='eddlbtton d-flex  align-items-center px-2'>

                                    <button className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" style={{ color: '#FFF' }}
                                        id="nftdetail.id" onClick={() => deployAndMint(id)}>  Mint</button>
                                    <NftPopup
                                        show={modalShow}
                                        current={current}
                                        onHide={() => setModalShow(false)}
                                    />

                                </div>
                            )}
                            <div className='d-flex  align-items-center justify-content-between'>
                                <h3 className="m-0">{nftdetail?.title}</h3>

                                <div className='eddlbtton d-flex  align-items-center '>
                                    {/* <a className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2"> <Link to={`/updateproject/${projdetail.projectdetails.id}`} style={{ color: '#FFF' }}>Edit</Link></a>
                                    <a className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-2" onClick={() => deleteHandler(projdetail.projectdetails.id)} style={{ color: '#FFF' }}>Delete</a> */}
                                </div>

                            </div>

                            <p dangerouslySetInnerHTML={{ __html: nftdetail?.description }} />
                            <div className="owner d-flex align-items-center">
                                <span>Owned By</span>
                                <a className="owner-meta d-flex align-items-center ml-3" href="/author">
                                    <img className="avatar-sm rounded-circle" src="/img/avtar1.png" alt="" />
                                    <h6 className="ml-2">{projdetail?.user_data?.username}</h6>
                                </a>
                            </div>

                            <div className="item-info-list mt-4">
                                <ul className="list-unstyled">
                                    <li className="price d-flex justify-content-between">
                                        {/* <span>Current Price : {nftdetail?.price} MATIC</span> */}
                                        {/* <span>Price </span> */}
                                        {/* <span>{latprojdetail.price} MATIC</span> */}

                                    </li>
                                    <li>

                                        {/* <span>{projdetail.projectdetails.latitude}</span> */}
                                    </li>
                                    {/* <li> */}
                                    {/* <span>Volume Traded </span> */}
                                    {/* <span>Number of NFT's Minted : {nftdetail?.number_of_nft}</span> */}
                                    {/* </li> */}
                                </ul>
                            </div>

                            {/* <a className="d-block btn btn-bordered-white mt-4" href="/wallet-connect">{initData.btnText}</a> */}
                        </div>
                    </div>
                </div>
            </div >

        </section >
    );

}


export default NftDetails;