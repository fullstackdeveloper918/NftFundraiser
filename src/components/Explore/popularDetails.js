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
import { Button, ProgressBar } from 'react-bootstrap';
import ProjdataTable from './projDetailtable';
import LatNftdataTable from './latProjNftdata';
import ProjNFTS from '../Auctions/projectnfts';
import { getPopularCollection } from '../../redux/Slices/popularCollectionSlice';
import { PopularCollectionActionDetails } from '../../redux/Actions/popularAction';
const alchemyKey = "wss://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// console.log(NFTContract.abi,"abi")
const web3 = createAlchemyWeb3(alchemyKey);
const provider = new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B");

const CollectionDetails = (props) => {
    const dispatch = useDispatch()

    const id = useParams();

    useEffect(() => {
        dispatch(PopularCollectionActionDetails(id))


    }, [id])
    const coll = useSelector(state => {
        // 
        return state?.collection?.collectiondetail
    })
    console.log(coll, 'coll')
    return (
        // <section className="item-details-area">
        //     <div className="container">

        //         <div className="row justify-content-between content_project px-0">
        //             <div className="col-12 col-lg-4">
        //                 <div className="item-info">
        //                     <>
        //                     <div className="item-thumb text-center">
        //                         <img src={coll.image} alt="" />
        //                     </div>
        //                     </>
        //                 </div>
        //             </div>

        //             <div className="col-12 col-lg-8">
        //                 <div className='py-0 mt-2 mb-2 mt-lg-0 mb-lg-0'>
        //                     <span Class="title_main " style={{ color: '#fff' }}>{coll.title}  </span>
        //                 </div>

        //                 <div className="content sm:mt-3 mt-lg-2">
        //                     <div className="card no-hover position-relative">
        //                         <span className='share'><svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        //                             <path fill="none" stroke="#fff" stroke-width="2" d="M18,8 C19.6568542,8 21,6.65685425 21,5 C21,3.34314575 19.6568542,2 18,2 C16.3431458,2 15,3.34314575 15,5 C15,6.65685425 16.3431458,8 18,8 Z M6,15 C7.65685425,15 9,13.6568542 9,12 C9,10.3431458 7.65685425,9 6,9 C4.34314575,9 3,10.3431458 3,12 C3,13.6568542 4.34314575,15 6,15 Z M18,22 C19.6568542,22 21,20.6568542 21,19 C21,17.3431458 19.6568542,16 18,16 C16.3431458,16 15,17.3431458 15,19 C15,20.6568542 16.3431458,22 18,22 Z M16,18 L8,13 M16,6 L8,11" />
        //                         </svg></span>
        //                         <div className="owner align-items-start">
        //                             <span className='boldertext w-100'>Owned By : </span>
        //                             <span>{coll.pay_from}</span>

        //                             <a className="owner-meta d-flex align-items-center ml-3" href="/author"> </a>
        //                         </div>

        //                         <div>
        //                             <span className='boldertext w-100'>Collection Name : </span>
        //                             <span> Green and Better World</span>
        //                         </div>
        //                         <div className="item-info-list">
        //                             <ul className="list-unstyled">
        //                                 <span class='boldertext'>Token :</span>
        //                                 <span> #{coll.token_id}</span>
        //                             </ul>
        //                         </div>
        //                         <div className='eddlbtton d-flex  align-items-center mt-2'>

        //                             <button className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" style={{ color: '#FFF' }}
        //                                 id="nftdetail.id" onClick={() => buyHandler()}>  Buy</button>
        //                         </div>
        //                     </div>
        //                 </div>


        //             </div>

        //             <div className='col-lg-4 col-12 mt-3 '>
        //                 <div className='price_nft'>
        //                     <h5 className='user_title'>
        //                         Current price
        //                     </h5>
        //                     <div className='price_nft_detail'>
        //                         <div className='nft-price'>
        //                             <svg fill="#a395f1" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        //                                 <g>
        //                                     <path fill="none" d="M0 0h24v24H0z" />
        //                                     <path stroke="#4528dc" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.5-8v2H11v2h2v-2h1a2.5 2.5 0 1 0 0-5h-4a.5.5 0 1 1 0-1h5.5V8H13V6h-2v2h-1a2.5 2.5 0 0 0 0 5h4a.5.5 0 1 1 0 1H8.5z" />
        //                                 </g>
        //                             </svg>
        //                             <span>$78</span>
        //                         </div>

        //                         <div className='sales'>
        //                             <span>
        //                                 Creator royalties on secondary sales:
        //                             </span>
        //                             <span>5%</span>
        //                         </div>

        //                     </div>
        //                 </div>
        //             </div>

        //             <div className='col-lg-8 col-12'>
        //                 <div className="profile_detail mt-3">

        //                     <UserTransdataTable />
        //                 </div>
        //             </div>


        //             <div className="col-12 mt-3">
        //                 <div class="user-description ">
        //                     <h5 className='user_title'><div>Description</div></h5>
        //                     <p dangerouslySetInnerHTML={{ __html: coll.description }} />
        //                 </div>
        //             </div>

        //             <div className='col-12 mt-3'>
        //                 <div className='funddeatil table-detail '>
        //                     <FundTransdataTable />
        //                 </div>
        //             </div>
        //         </div>
        //     </div >

        // </section >
        <section className="item-details-area project-nft-si main-proj-detail">
            <div className="container">
                <div className="row">
                    <div className='col-12'>
                        <h3 className="p-0">{coll.title}</h3>
                    </div>

                    <div className="col-12 col-lg-8 relative">
                        <div className="item-info" >


                            <div className="item-thumb text-center">
                                {/* {projdetail && projdetail?.nft_data && projdetail?.nft_data?.length ? */}
                                {/* <div>
                                <i class="fa-solid fa-pen-to-square item-thumb-edit" onClick={() => setModalShow(true)}></i>


                                <Banner
                                    id={id}
                                    show={modalShow}
                                    onHide={() => setModalShow(false)} />
                            </div> */}
                                <img src={coll?.image} alt="first nft" />
                                {/* : null} */}
                            </div>

                        </div>


                        <div className="fundraiser mt-3 ">
                            <div className='lorem_done'>
                                <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75Z" stroke="" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 12C13.2416 12 14.248 10.9926 14.248 9.75C14.248 8.50736 13.2416 7.5 12 7.5C10.7584 7.5 9.75197 8.50736 9.75197 9.75C9.75197 10.9926 10.7584 12 12 12Z" stroke="#4528dc" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.9974 14.25C16.6528 14.25 17.9737 15.7453 16.8057 16.9195C15.703 18.0281 13.9431 18.75 12 18.75C10.0569 18.75 8.29702 18.0281 7.19428 16.9195C6.02632 15.7453 7.34722 14.25 9.00262 14.25L14.9974 14.25Z" stroke="#4528dc" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span className='cutom_dis'> {coll?.user_data?.organization_detail?.organization_name} is organizing this project.</span>
                            </div>


                        </div>


                    </div>


                                </div>

                                {/* <div className="d-flex justify-content-start">
                                    <><Button className=" btn  btn-bordered-white m-0 mr-2" variant="primary" onClick={() => setModalShowrefer(true)}>
                                        Share
                                    </Button>
                                    <ReferalPopu
                                            id={id}
                                            userRef={userDetail}
                                            show={modalShowrefer}
                                            onHide={() => setModalShowrefer(false)} /></>

                                    <Button variant="primary" className=" btn  btn-bordered-white m-0">
                                        Invest
                                    </Button>
                                </div> */}


                                {coll.user_invest?.slice(0, 3)?.map((items) => {
                                    const date1 = new Date(items.updated_at)
                                    const date2 = new Date()
                                    const time_difference = date2.getTime() - date1.getTime();
                                    const days_difference = Math.ceil(time_difference / (1000 * 60 * 60 * 24));
                                    console.log('days', days_difference)
                                    return (

                                        <ul className="m-0 custom_lis pl-0">
                                            <li>
                                                <div className='lorem_done p-0'>
                                                    <span><svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75Z" stroke="" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M12 12C13.2416 12 14.248 10.9926 14.248 9.75C14.248 8.50736 13.2416 7.5 12 7.5C10.7584 7.5 9.75197 8.50736 9.75197 9.75C9.75197 10.9926 10.7584 12 12 12Z" stroke="#4528dc" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M14.9974 14.25C16.6528 14.25 17.9737 15.7453 16.8057 16.9195C15.703 18.0281 13.9431 18.75 12 18.75C10.0569 18.75 8.29702 18.0281 7.19428 16.9195C6.02632 15.7453 7.34722 14.25 9.00262 14.25L14.9974 14.25Z" stroke="#4528dc" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    </span>

                                                    {/* <span><div className="progress_name">{items.username} </div> <div>${items.price} Cdn / {Number(coll.price) * Number(matic['matic-network']?.cad)} MATIC ({days_difference} days ago)</div></span> */}
                                                </div>
                                            </li>


                                        </ul>

                                    )
                                })}


                                {/* <p className='see_all'>See all</p> */}
                            </div>
                        </div>
                    </div>
                    {/* {userDetail !== null && ( */}

                    {/* )} */}
                    <div className="col-12 col-lg-8 mt-3">
                        <div class="user-description ">
                            <h5 className='user_title'><div><svg width="24px" fill="#fff" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z stroke=" /><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z" /></svg></div><div>Description</div>
                                {/* <i class="fa-solid fa-pen" ></i>
                    <i class="fa-sharp fa-solid fa-trash"></i> */}


                            </h5>
                            <ReadMore data={coll.description} />
                            {/* <p dangerouslySetInnerHTML={{ __html: coll.description }} /> */}
                        </div>
                    </div>

                    <div className='col-12 col-lg-4 mt-3'>


                        </div>

                    </div>
                    <div className='col-12'>
                        <div className='mt-3'>
                            <div className='table-detail'>
                                <LatNftdataTable />
                            </div>
                        </div>

                    </div>

                    {/* <div className=" col-12 mt-3">
                        <div className="items mt-0 explore-items p-0">
                            <ProjNFTS />
                        </div>
                    </div> */}

                </div>
            </div>

        </section>
    );
}


export default CollectionDetails;