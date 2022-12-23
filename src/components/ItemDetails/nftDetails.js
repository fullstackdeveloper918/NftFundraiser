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
import NftdataTable from '../Explore/nftdataTable';
const alchemyKey = "wss://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// console.log(NFTContract.abi,"abi")
const web3 = createAlchemyWeb3(alchemyKey);
const provider = new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B");
const NftDetails = (props) => {


    const [modalShow, setModalShow] = React.useState(false);
    const [current, setCurrent] = React.useState(0)
    const [contractAdd, setContractAdd] = useState('')
    // const [collid, setCollid] = useState('')
    // console.log('collid', collid)
    // console.log('contAddre', contractAdd)
    // console.log('current', current)
    const { id } = useParams();
    // console.log(id, 'idd')
    const projdetail = useSelector(state => {
        // 
        return state?.projectdetails?.projectdetails
    })
    console.log(projdetail, 'projdataaaa')


    const dispatch = useDispatch()

    const nftdetail = useSelector(state => {
        // 
        return state.projectdetails.nftlist

    })
    // console.log(nftdetail, 'latprojdetail')
    const collupdate = useSelector(state => {
        return state?.projectdetails?.collectiondetails
    })

    // console.log('collupdate', collupdate)
    useEffect(() => {
        // 
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
            nft_file_content: nftdetail?.nft_file_content,
            id,
            setModalShow
        })
    }


    // const UpdateContract = async (id) => {
    //     

    //     const formData = new FormData();

    //     formData.append('contract_id', cont);
    //     const token = localStorage.getItem('authToken')


    //     try {
    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             },
    //             transformRequest: formData => formData
    //         }
    //         // 
    //         await axios.post(`${process.env.REACT_APP_BACKEND_API}api/updateContract/${id}`,
    //             formData, config
    //         )
    //     } catch (error) {
    //         
    //         console.log("error");
    //     }
    // };


    const deployContract = async () => {
        // 
        try {
            if (nftdetail?.collectionData?.contract_id == null) {

                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: web3.utils.toHex('80001') }],
                })

                const { address } = await ConnectWallet()
                const MyNFTContract = new web3.eth.Contract(NFTContract.abi)
                const gas = await web3.eth.getGasPrice();
                // const gas = 500000

                MyNFTContract.deploy({
                    data: NFTContract.bytecode,
                    arguments: [nftdetail?.collectionData?.title, nftdetail?.collectionData?.symbol],
                }).send({
                    from: address,
                })
                    .on('error', (error) => {
                        // console.log(error)
                    })
                    .on('transactionHash', (transactionHash) => {
                        // console.log(transactionHash, "transactionHash")
                    })
                    .on('receipt', (receipt) => {
                        // receipt will contain deployed contract address
                        // console.log(receipt, "reciept")
                    })
                    .on('confirmation', (confNumber, receipt) => {
                        // console.log(receipt.contractAddress, "confirmRecipet")
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
            // 
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
                <div className="row justify-content-between content_project">
                    <div className="col-12 col-md-4 ">
                        <div className="item-info">
                            {/* {latprojdetail?.map((item, key) => ( */}

                            <><div className="item-thumb text-center">
                                <img src={nftdetail.image} alt="" />
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

                    <div className="col-12 col-md-8">
                        <h3 className="m-0">{nftdetail?.title}</h3>
                        <div className="card no-hover content sm:mt-5 mt-lg-3">

                            <div className="owner d-flex align-items-center">
                                <span>Owned By</span>
                                <a className="owner-meta d-flex align-items-center">
                                    {/* <img className="avatar-sm rounded-circle" src={projdetail.user_data.avatar} alt="" /> */}
                                </a>
                                <span className="text-white">{projdetail?.user_data?.username} </span>

                            </div>
                            <div class="item-info-list">
                                <ul class="list-unstyled viewproduct-detail mt-4">

                                    {/* <li class="price d-flex "><span>Current Price : </span><span>1122 MATIC</span></li> */}
                                    {/* <li class="mt-4"><span>Number of NFTs Minted :  </span><span>5</span></li> */}
                                    <li class="mt-4"><span>Token No:  </span><span>#{nftdetail.token_id}</span></li>
                                </ul>
                            </div>

                            {nftdetail.is_mint == 1 ? (

                                <div className='eddlbtton d-flex  align-items-center mt-3'>

                                    <div className=" mt-3 d-flex align-items-center justify-content-center py-1 mx-2" style={{ color: '#FFF', width: "100%" }}
                                    >  Ready to purchase</div>


                                </div>

                            ) : (

                                <div className='eddlbtton d-flex  align-items-center mt-3'>
                                    {nftdetail.project_status == 1 ? (

                                        <><button className="w-full btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" style={{ color: '#FFF' }}
                                            id="nftdetail.id" onClick={() => deployAndMint(id)}>  Mint</button><NftPopup
                                                show={modalShow}
                                                current={current}
                                                onHide={() => setModalShow(false)} /></>
                                    ) : (

                                        <button className="w-full btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" style={{ color: '#FFF' }}
                                        >  waiting for approval</button>
                                    )}

                                </div>

                            )}


                            <div className="item-info-list">
                                <ul className="list-unstyled">
                                    <li className="price d-flex">
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

                <div className='col-12 description'>
                    <h3 > Description</h3>
                    <div className="card no-hover countdown-times my-4">
                        {/* ksdjfksdjbfjsdbf */}
                        {/* {nftdetail.description} */}
                        {/* <div className="countdown d-flex justify-content-center" /> */}
                        <p dangerouslySetInnerHTML={{ __html: nftdetail.description }} className="nft-detail-nft" />
                    </div>
                </div>
            </div >
            <div className='container table-detail'>
                <div className='col-12'>
                    <NftdataTable />
                </div>

            </div>

        </section >
    );

}


export default NftDetails;