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
                            <>
                            <div className="item-thumb text-center">
                                <img src={latprojnftdetail.image} alt="" />
                            </div>
                            </>
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

                                    <a className="owner-meta d-flex align-items-center ml-3" href="/author"> </a>
                                </div>

                                <div>
                                    <span className='boldertext w-100'>Collection Name : </span>
                                    <span> Green and Better World</span>
                                </div>
                                <div className="item-info-list">
                                    <ul className="list-unstyled">
                                        <span class='boldertext'>Token :</span>
                                        <span> #{latprojnftdetail.token_id}</span>
                                    </ul>
                                </div>
                                <div className='eddlbtton d-flex  align-items-center mt-2'>

                                    <button className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" style={{ color: '#FFF' }}
                                        id="nftdetail.id" onClick={() => buyHandler()}>  Buy</button>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className='col-lg-4 col-12 mt-3 '>
                        <div className='price_nft'>
                            <h5 className='user_title'>
                                Current price
                            </h5>
                            <div className='price_nft_detail'>
                                <div className='nft-price'>
                                    <svg fill="#a395f1" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path stroke="#4528dc" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.5-8v2H11v2h2v-2h1a2.5 2.5 0 1 0 0-5h-4a.5.5 0 1 1 0-1h5.5V8H13V6h-2v2h-1a2.5 2.5 0 0 0 0 5h4a.5.5 0 1 1 0 1H8.5z" />
                                        </g>
                                    </svg>
                                    <span>$78</span>
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
                            <h5 className='user_title'><div>Description</div></h5>
                            <p dangerouslySetInnerHTML={{ __html: latprojnftdetail.description }} />
                        </div>
                    </div>

                    <div className='col-12 mt-3'>
                        <div className='funddeatil table-detail '>
                            <FundTransdataTable />
                        </div>
                    </div>
                </div>
            </div >

        </section >
    );
}


export default LatprojNftDetails;