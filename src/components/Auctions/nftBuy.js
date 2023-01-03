import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Nftprice, Nftdeatil } from './nftprice'
import { useParams } from 'react-router';
import { DeleteProject, GetNftwol, GetSettings, LatestProjectDetail, NftList, ProjectDetail, UpdateCollection } from '../../redux/Actions/projectAction';
import Web3 from 'web3';

import { BuyNft, ConnectWallet } from '../Wallet/interact';
import { useState } from 'react';
import ReadMore from '../../readMore';
import FundTransdataTable from '../TopSeller/fundPaymenttable';
import UserTransdataTable from '../AuthorProfile/userDetails';
import UserdataTable from '../AuthorProfile/userTransTable';
const alchemyKey = "wss://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// console.log(NFTContract.abi,"abi")
const web3 = createAlchemyWeb3(alchemyKey);
const provider = new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B");

const LatprojNftDetails = (props) => {
    const dispatch = useDispatch()
    const [ownwallet, setOwnWallet] = useState('')
    const [ownFee, setOwnFee] = useState('')
    const [platformFee, setPlatformFee] = useState('')
    console.log('own', ownwallet)
    const id = useParams();
    // console.log(id, 'idd')
    const latprojnftdetail = useSelector(state => {
        // 
        return state.projectdetails.getnftwoldetails
    })
    // console.log('paymentflow', [latprojnftdetail.payment_flow?.project_data.wallets])


    const getSett = useSelector(state => {
        // 
        return state.projectdetails.settings
    })
    // console.log('getSett', getSett)
    const setValue = getSett.find(x => x.key === 'pricing_per_nft')
    useEffect(() => {
        dispatch(GetNftwol(id))
        dispatch(GetSettings())


    }, [id])
    const buyHandler = () => {

        // setOwnWallet([latprojnftdetail.payment_flow?.project_data.wallets])
        // setOwnFee([latprojnftdetail.payment_flow?.project_data.fees])
        // setPlatformFee([latprojnftdetail.payment_flow?.karmatica_fee])

        BuyNft({
            contractAddress: latprojnftdetail?.collectionData?.contract_id,
            tokenId: latprojnftdetail.token_id,
            payFrom: latprojnftdetail.pay_from,
            values: setValue.value,
            sellingCount: latprojnftdetail.selling_count,
            platformFee: ([latprojnftdetail.payment_flow?.karmatica_fee]),

            ownerFee: ([latprojnftdetail.payment_flow?.project_data.fees]),
            ownerWallet: ([latprojnftdetail.payment_flow?.project_data.wallets]),
            flow: ([latprojnftdetail.payment_flow])

        })
    }
    return (
        <section className="item-details-area">
            <div className="container">

                <div className="row justify-content-between content_project px-0">
                    <div className="col-12 col-lg-4">
                        <div className="item-info">
                            {/* {latprojdetail?.map((item, key) => ( */}

                            <><div className="item-thumb text-center">

                                {/* {latprojdetail?.nft_data?.map((item, idx) => { */}
                                {/*  */}
                                {/* return ( */}
                                <img src={latprojnftdetail.image} alt="" />
                                {/* ) */}
                                {/* })} */}
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
​
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

                    <div className="col-12 col-lg-8">
                        <div className='py-0 mt-2 mb-2 mt-lg-0 mb-lg-0'>

                            <span Class="title_main " style={{ color: '#fff' }}>{latprojnftdetail.title}  </span>


                        </div>
                        <div className="content sm:mt-3 mt-lg-2">
                            <div className="card no-hover position-relative">
                                <span className='share'><svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" stroke="#fff" stroke-width="2" d="M18,8 C19.6568542,8 21,6.65685425 21,5 C21,3.34314575 19.6568542,2 18,2 C16.3431458,2 15,3.34314575 15,5 C15,6.65685425 16.3431458,8 18,8 Z M6,15 C7.65685425,15 9,13.6568542 9,12 C9,10.3431458 7.65685425,9 6,9 C4.34314575,9 3,10.3431458 3,12 C3,13.6568542 4.34314575,15 6,15 Z M18,22 C19.6568542,22 21,20.6568542 21,19 C21,17.3431458 19.6568542,16 18,16 C16.3431458,16 15,17.3431458 15,19 C15,20.6568542 16.3431458,22 18,22 Z M16,18 L8,13 M16,6 L8,11" />
                                </svg></span>
                                <div className="owner align-items-start">
                                    <span className='boldertext w-100'>Owned By : </span>
                                    <span>{latprojnftdetail.pay_from}</span>

                                    <a className="owner-meta d-flex align-items-center ml-3" href="/author">
                                        {/* <img className="avatar-sm rounded-circle" src="/img/avtar1.png" alt="" /> */}
                                        {/* <h6 className="ml-2">{latprojnftdetail.pay_from}</h6> */}
                                    </a>
                                </div>

                                <div>
                                    <span className='boldertext w-100'>Collection Name : </span>
                                    <span> {latprojnftdetail?.collectionData?.title}</span>

                                </div>
                                <div className="item-info-list">
                                    <ul className="list-unstyled">
                                        {/* <li className="price d-flex">
                                            <span>Current Price : {nftdetail?.price} MATIC</span>
                                            <span>Price </span>
                                            <span>{latprojdetail.price} MATIC</span>

                                        </li> */}
                                        {/* <li>
​
                                        <span dangerouslySetInnerHTML={{ __html: latprojnftdetail.description }} />
                                    </li> */}
                                        {/* <li> */}
                                        {/* <span>Volume Traded </span> */}
                                        {/* {latprojdetail?.nft_data?.map((item, idx) => { */}
                                        {/*  */}

                                        <span class='boldertext'>Token :</span>
                                        <span> #{latprojnftdetail.token_id}</span>
                                        {/* })} */}
                                        {/* </li> */}
                                    </ul>
                                </div>
                                <div className='eddlbtton d-flex  align-items-center mt-2'>

                                    <button className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" style={{ color: '#FFF' }}
                                        id="nftdetail.id" onClick={() => buyHandler()}>  Buy</button>


                                </div>
                                {/* <a className="d-block btn btn-bordered-white mt-4" href="/wallet-connect">{initData.btnText}</a> */}
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-4 col-12 mt-3 '>
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
                    </div>
                    <div className='col-lg-8 col-12'>
                        <div className="profile_detail mt-3">

                            <UserTransdataTable />
                        </div>
                    </div>


                    <div className="col-12 mt-3">
                        <div class="user-description ">
                            <h5 className='user_title gap-5'><div><svg width="24px" fill="#fff" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z stroke=" /><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z" /></svg></div><div>Description</div>
                                {/* <i class="fa-solid fa-pen" ></i>
                        <i class="fa-sharp fa-solid fa-trash"></i> */}


                            </h5>
                            <p dangerouslySetInnerHTML={{ __html: latprojnftdetail.description }} />
                            {/* <ReadMore  dangerouslySetInnerHTML={{ __html: latprojnftdetail.description }} /> */}
                            {/* <p dangerouslySetInnerHTML={{ __html: latprojdetail.description }} /> */}
                        </div>
                    </div>

                    <div className='col-12 mt-3'>
                        <div className='funddeatil table-detail '>
                            <FundTransdataTable />

                        </div>
                    </div>

                    {/* <div className="col-12">
                        <div className="card no-hover countdown-times my-4 ">
                            <span dangerouslySetInnerHTML={{ __html: latprojnftdetail.description }} />
                        </div>

                    </div> */}
                </div>
            </div >

        </section >
    );
}


export default LatprojNftDetails;