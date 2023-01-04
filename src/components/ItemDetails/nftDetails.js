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
import UserTransdataTable from '../AuthorProfile/userDetails';
import { CreateMetaDataAndMint } from './../Wallet/interact';
import NftPopup from './nftPopup';
import axios from 'axios';
import NftdataTable from '../Explore/nftdataTable';
import { redirect } from 'next/dist/server/api-utils';
import LatprojNftDetails from '../Auctions/nftBuy';
const alchemyKey = "wss://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// console.log(NFTContract.abi,"abi")
const web3 = createAlchemyWeb3(alchemyKey);
const provider = new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B");
const NftDetails = (props) => {

    const latprojnftdetail = useSelector(state => {
        // 
        return state.projectdetails.getnftwoldetails
    })
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
                               
                            </>
                           
                        </div>
                    </div>


                    <div className="col-12 col-lg-8">
                        <div className='py-0 mt-2 mb-2 mt-lg-0 mb-lg-0'>

                            <span Class="title_main " style={{ color: '#fff' }}>{nftdetail?.title} </span>


                        </div>
                        <div className="content sm:mt-3 mt-lg-2">
                            <div className="card no-hover position-relative">
                                <span className='share'><svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" stroke="#fff" stroke-width="2" d="M18,8 C19.6568542,8 21,6.65685425 21,5 C21,3.34314575 19.6568542,2 18,2 C16.3431458,2 15,3.34314575 15,5 C15,6.65685425 16.3431458,8 18,8 Z M6,15 C7.65685425,15 9,13.6568542 9,12 C9,10.3431458 7.65685425,9 6,9 C4.34314575,9 3,10.3431458 3,12 C3,13.6568542 4.34314575,15 6,15 Z M18,22 C19.6568542,22 21,20.6568542 21,19 C21,17.3431458 19.6568542,16 18,16 C16.3431458,16 15,17.3431458 15,19 C15,20.6568542 16.3431458,22 18,22 Z M16,18 L8,13 M16,6 L8,11" />
                                </svg></span>
                                <div className="owner align-items-start">
                                    <span className='boldertext w-100'>Owned By : </span>
                                    <span>{projdetail?.user_data?.username}</span>

                                    <a className="owner-meta d-flex align-items-center ml-3" href="/author">
                                    </a>
                                </div>

                                <div>
                                    <span className='boldertext w-100'>Collection Name : </span>
                                    <span> {LatprojNftDetails?.collectionData?.title}</span>

                                </div>
                                <div className="item-info-list">
                                    <ul className="list-unstyled">
                                        <span class='boldertext'>Token :</span>
                                        <span> #{nftdetail.token_id}</span>
                                    </ul>
                                </div>
                                {nftdetail.is_mint == 1 ? (

                                    <div className='eddlbtton d-flex  align-items-center mt-3'>

                                        <div className=" mt-3 d-flex align-items-center justify-content-center py-1 mx-2" style={{ color: '#FFF', width: "100%" }}
                                        >  Ready to purchase</div>


                                    </div>

                                ) : (

                                    <div className='eddlbtton d-flex  align-items-center mt-3'>


                                        <><button className="w-full btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" style={{ color: '#FFF' }}
                                            id="nftdetail.id" onClick={() => deployAndMint(id)}>  Mint</button><NftPopup
                                                show={modalShow}
                                                current={current}
                                                onHide={() => setModalShow(false)} /></>





                                    </div>

                                )}
                            </div>
                        </div>
                    </div>

                    {/* <div className="col-12 col-md-8">
                        <h3 className="m-0">{nftdetail?.title}</h3>
                        <div className="card no-hover content sm:mt-5 mt-lg-3">

                            <div className="owner d-flex align-items-center">
                                <span>Owned By</span>
                                <a className="owner-meta d-flex align-items-center">
                                
                                </a>
                                <span className="text-white">{projdetail?.user_data?.username} </span>

                            </div>
                            <div class="item-info-list">
                                <ul class="list-unstyled viewproduct-detail mt-4">

                                  
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


                                    <><button className="w-full btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" style={{ color: '#FFF' }}
                                        id="nftdetail.id" onClick={() => deployAndMint(id)}>  Mint</button><NftPopup
                                            show={modalShow}
                                            current={current}
                                            onHide={() => setModalShow(false)} /></>





                                </div>

                            )}


                            <div className="item-info-list">
                                <ul className="list-unstyled">
                                    <li className="price d-flex">
                                    

                                    </li>
                                    <li>

                                        
                                    </li>
                                   
                                </ul>
                            </div>

                            
                        </div>
                    </div> */}


              
<div className="col-8 mt-4">
                        <div class="user-description ">
                            <h5 className='user_title gap-5'><div><svg width="24px" fill="#fff" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z stroke=" /><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z" /></svg></div><div>Description</div>
                            </h5>
                            <p dangerouslySetInnerHTML={{ __html: nftdetail.description }} className="nft-detail-nft"/>
                            {/* <ReadMore  dangerouslySetInnerHTML={{ __html: latprojnftdetail.description }} /> */}
                            {/* <p dangerouslySetInnerHTML={{ __html: latprojdetail.description }} /> */}
                        </div>
                    </div>

                <div className='col-lg-4 col-12 mt-4'>
                        <div className='price_nft'>
                            <h5 className='user_title gap-5'>
                                <div><svg fill="#fff" width="24px" height="24px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g data-name="2. Coin" id="_2._Coin"><path d="M22,9h-.19A2.83,2.83,0,0,0,22,8V6a3,3,0,0,0-3-3H3A3,3,0,0,0,0,6V8a3,3,0,0,0,2.22,2.88A3,3,0,0,0,2,12v2a3,3,0,0,0,.22,1.12A3,3,0,0,0,0,18v2a3,3,0,0,0,2.22,2.88A3,3,0,0,0,2,24v2a3,3,0,0,0,3,3H22A10,10,0,0,0,22,9Zm-9.16,6H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H16A10,10,0,0,0,12.84,15ZM2,6A1,1,0,0,1,3,5H19a1,1,0,0,1,1,1V8a1,1,0,0,1-1,1H3A1,1,0,0,1,2,8ZM2,18a1,1,0,0,1,1-1h9.2a10.1,10.1,0,0,0,0,4H3a1,1,0,0,1-1-1Zm3,9a1,1,0,0,1-1-1V24a1,1,0,0,1,1-1h7.84A10,10,0,0,0,16,27Zm17,0a8,8,0,1,1,8-8A8,8,0,0,1,22,27Z" /><path d="M22,16h2a1,1,0,0,0,0-2H23a1,1,0,0,0-2,0v.18A3,3,0,0,0,22,20a1,1,0,0,1,0,2H20a1,1,0,0,0,0,2h1a1,1,0,0,0,2,0v-.18A3,3,0,0,0,22,18a1,1,0,0,1,0-2Z" /></g></svg></div>
                                <div>Current price</div>
                            </h5>
                            <div className='price_nft_detail'>
                                <div className='nft-price'>
                                    <svg fill="#a395f1" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path stroke="#4528dc" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.5-8v2H11v2h2v-2h1a2.5 2.5 0 1 0 0-5h-4a.5.5 0 1 1 0-1h5.5V8H13V6h-2v2h-1a2.5 2.5 0 0 0 0 5h4a.5.5 0 1 1 0 1H8.5z" />
                                        </g>
                                    </svg>
                                    <span>${latprojnftdetail.amount}</span>
                                </div>

                                <div className='sales'>
                                    <span>
                                        Creator royalties on secondary sales:
                                    </span>
                                    <span>5%</span>
                                </div>

                            </div>
                        </div>

                        <div className=''>
                        <div className="profile_detail mt-4">

                        <NftdataTable />
                        </div>
                    </div>
                    </div>

               

             
                     {/* <div className='col-12 description'>
                    <h3 > Description</h3>
                    <div className="card no-hover countdown-times my-4">
            
                        <p dangerouslySetInnerHTML={{ __html: nftdetail.description }} className="nft-detail-nft" />
                    </div>
                     </div> */}
            </div >
            </div>
        </section >
    );

}


export default NftDetails;