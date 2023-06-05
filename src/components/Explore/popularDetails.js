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

    const slug = useParams();

    useEffect(() => {
        dispatch(PopularCollectionActionDetails(slug))


    }, [slug])
    const coll = useSelector(state => {
        // 
        return state?.collection?.collectiondetail
    })
    return (

        <section className="item-details-area project-nft-si main-proj-detail collection_detail">
            <div className="container">
                <div className='col-12 col-lg-12 '>
                    <span className="p-0 title_main ">{coll?.title}</span>
                </div>
                <div className="row">


                    <div className="col-12 col-lg-8 relative">
                        <div className="item-info" >


                            <div className="item-thumb text-center">

                                <img src={coll?.image} alt="first nft" />
                                {/* : null} */}
                            </div>

                        </div>





                    </div>


                    <div className='col-12 col-lg-4 '>
                        <div class="user-description mt-4 mt-sm-0">
                            <h5 className='user_title gap-5'><div><svg width="24px" fill="#fff" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z stroke=" /><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z" /></svg></div><div>Description</div>

                                {/* <i class="fa-solid fa-pen" ></i>
                    <i class="fa-sharp fa-solid fa-trash"></i> */}


                            </h5>
                            <ReadMore data={coll?.description} />
                            {/* <p dangerouslySetInnerHTML={{ __html: coll.description }} /> */}
                        </div>

                        {/* <div className='content content_project'>
                        <div className='card no-hover position-relative'>
                        <div><span className='boldertext'>Number of NFTs :</span><span> {coll?.nft_data?.length}</span></div>
                        <div><span className='boldertext'>Chain :</span> <span>Polygon (Matic)</span></div>
                        <div><span className='boldertext'>Created at:</span>  <span> {days_difference}12  days ago</span></div>
                        <div><span className='boldertext'>Category:</span>  <span>{coll?.category}</span></div>
                        </div>

                    </div> */}
                        {/* 
                        <div className='table-main-detail mt-3 mt-lg-0 position-relative'>



                            <ProjdataTable
                                idx={slug}
                            />
                        </div> */}

                    </div>



                    <div className="col-12 col-lg-12 mt-3">
                       
                        <div className=" col-12 mt-3 p-0">
                            <div className="items mt-0 explore-items p-0">
                               
                            </div>
                        </div>

                    </div>
                </div>
                <CollectionNFTS 
                slug={slug}/>
            </div>
        </section>
    );
}


export default CollectionDetails;