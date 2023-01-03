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
import CollectionNFTS from '../Collections/collectionNfts';
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

        <section className="item-details-area project-nft-si main-proj-detail">
            <div className="container">
                <div className="row">


                    <div className="col-12 col-lg-4 relative">
                        <div className="item-info" >


                            <div className="item-thumb text-center">

                                <img src={coll?.image} alt="first nft" />
                                {/* : null} */}
                            </div>

                        </div>





                    </div>


                    <div className='col-12 col-lg-8 '>
                        <h3 className="p-0">{coll?.title}</h3>

                    <div className='content'>
                        <div className='card no-hover position-relative'>
                        <div><span className='boldertext'>Number of NFTs :</span><span> {coll?.nft_data?.length}</span></div>
                        <div><span className='boldertext'>Chain :</span> <span>Polygon (Matic)</span></div>
                        <div><span className='boldertext'>Created at:</span>  <span> {/* {days_difference} */}12  days ago</span></div>
                        <div><span className='boldertext'>Category:</span>  <span>{coll?.category}</span></div>
                        </div>

                    </div>

                        <div className='table-main-detail position-relative'>



                            <ProjdataTable
                                idx={id}
                            />
                        </div>

                    </div>



                    <div className="col-lg-4 col-12 mt-3 mt-lg-0">
                        <div>
                            <div className=" mb-3">





                                {coll?.user_invest?.slice(0, 3)?.map((items) => {
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
                    <div className="col-12 col-lg-12 mt-3">
                        <div class="user-description ">
                            <h5 className='user_title'><div><svg width="24px" fill="#fff" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z stroke=" /><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z" /></svg></div><div>Description</div>

                                {/* <i class="fa-solid fa-pen" ></i>
                    <i class="fa-sharp fa-solid fa-trash"></i> */}


                            </h5>
                            <ReadMore data={coll?.description} />
                            {/* <p dangerouslySetInnerHTML={{ __html: coll.description }} /> */}
                        </div>
                    </div>



                    {/* <div>

                        <ProjdataTable
                            idx={id}
                        //  id={id}
                        />
                    </div> */}

                    {/* </div> */}

                    {/* <div className='col-12'>
                        <div className='mt-3'>
                            <div className='table-detail'>
                                <LatNftdataTable />
                            </div>
                        </div>

                    </div> */}

                    <div className=" col-12 mt-3">
                        <div className="items mt-0 explore-items p-0">
                            <CollectionNFTS />
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}


export default CollectionDetails;