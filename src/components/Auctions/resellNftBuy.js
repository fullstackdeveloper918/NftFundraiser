import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Nftprice, Nftdeatil } from './nftprice'
import { useLocation, useParams } from 'react-router';
import { DeleteProject, GetNftwol, GetSettings, LatestProjectDetail, NftList, ProjectDetail, UpdateCollection } from '../../redux/Actions/projectAction';
import Web3 from 'web3';

import { BuyNft, ConnectWallet } from '../Wallet/interact';
import { updateReffid } from '../Wallet/interact';
import { useState } from 'react';
import ReadMore from '../../readMore';
import FundTransdataTable from '../TopSeller/fundPaymenttable';
import UserTransdataTable from '../AuthorProfile/userDetails';
import UserdataTable from '../AuthorProfile/userTransTable';
import NftTransdataTable from './nftTRansTable';
import LatNftDataTable from '../Explore/latnftTable';
import BidPopup from './bidPopup';
import DModal from '../Create/3dModal';
import Timer from './timer';
import BuyPopup from './buyPopup';
import { GetMatic } from './../ItemDetails/GetMAtic';
import { ResellActionDetails } from '../../redux/Actions/resellNftAction';
import { GetUserAction } from '../../redux/Actions/authAction';
const alchemyKey = "wss://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// console.log(NFTContract.abi,"abi")
const web3 = createAlchemyWeb3(alchemyKey);
const provider = new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B");

const ResellNftDetails = (props) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    const [ownwallet, setOwnWallet] = useState('')
    const [matic, setMatic] = useState('')
    const [ownFee, setOwnFee] = useState('')
    const [bidmodalShow, setBidModalShow] = React.useState(false);
    const [buymodalShow, setBuyModalShow] = React.useState(false);
    const [referalid, setReferalid] = useState("")

    const [platformFee, setPlatformFee] = useState('')
    console.log('own', ownwallet)
    const slug = useParams();
    // console.log(id, 'idd')
    const resellnftdetail = useSelector(state => {
        // 
        return state.resell?.reselldetails
    })
    console.log(resellnftdetail, 'latext')
    // console.log("latround", Number(Math.round(latprojdetail.project_count)) * Number(Math.round(matic['matic-network']?.cad)))
    // console.log('paymentflow', [latprojnftdetail.payment_flow?.project_data.wallets])


    const getSett = useSelector(state => {
        // 
        return state.projectdetails.settings
    })
    console.log('getSett', getSett)
    const setValue = getSett.find(x => x.key === 'pricing_per_nft')
    console.log('sett', setValue)
    useEffect(() => {
        (GetMatic(setMatic))
        dispatch(GetUserAction())
        dispatch(ResellActionDetails(slug))
        dispatch(GetSettings())


    }, [slug])
    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })
    // const reffHandler = () => {
    //     (updateReffid({ tokenId: latprojnftdetail.token_id, refid, nft_id: latprojnftdetail.id }))
    // }
    const buyHandler = () => {

        // setOwnWallet([latprojnftdetail.payment_flow?.project_data.wallets])
        // setOwnFee([latprojnftdetail.payment_flow?.project_data.fees])
        // setPlatformFee([latprojnftdetail.payment_flow?.karmatica_fee])


        BuyNft({

            contractAddress: resellnftdetail?.collectionData?.contract_id,
            tokenId: resellnftdetail.token_id,
            payFrom: resellnftdetail.pay_from,
            values: setValue.value,
            sellingCount: resellnftdetail.selling_count,
            platformFee: ([resellnftdetail.payment_flow?.karmatica_fee]),

            ownerFee: ([resellnftdetail.payment_flow?.project_data?.fees]),
            ownerWallet: ([resellnftdetail.payment_flow?.project_data?.wallets]),
            flow: ([resellnftdetail.payment_flow]),

            proj_id: resellnftdetail.project_id,
            nft_id: resellnftdetail.id,
            loadingg: setLoading,
            modal: setBuyModalShow,
        })
    }
    // const bidHandler = () =>{
    // if(window.ethereum?.selectedAddress){
    //     debugger

    //     dispatch(BidPopup())
    // }else{
    //     ConnectWallet()
    // }
    // }
    // const yestTime = "9:24:49 PM"
    // const timeNow = new Date()?.toLocaleTimeString() - yestTime()
    // console.log("time now", timeNow)
    // const yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
    // console.log('yestwe', yesterday)

    return (
        <section className="item-details-area">
            <div className="container">

                <div className="row justify-content-between content_project px-0">
                    <div className='py-0 col-12 mt-2 mb-2 mt-lg-0 mb-lg-0'>
                        <span Class="title_main " style={{ color: '#fff' }}>{resellnftdetail.title}  </span>
                    </div>
                    <div className="col-12 col-lg-4">

                        <div className="item-info">
                            {/* {latprojdetail?.map((item, key) => ( */}

                            <><div className="item-thumb text-center">

                                {/* {latprojdetail?.nft_data?.map((item, idx) => { */}
                                {/*  */}
                                {/* return ( */}
                                {resellnftdetail.extention === "PLayer" &&
                                    <video
                                        // className="VideoInput_video"
                                        width="100%"
                                        // height={height}
                                        controls
                                        src={resellnftdetail.image}
                                    // onChange={setSource}
                                    />
                                }

                                {resellnftdetail.extention === "modal" &&
                                    <DModal
                                        vdo={resellnftdetail.image}

                                    />
                                }
                                {resellnftdetail.extention === 'Image' &&

                                    <img src={resellnftdetail.image} alt="" />
                                }
                                {/* ) */}
                                {/* })} */}
                            </div>

                            </>

                        </div>
                    </div>

                    <div className="col-12 col-lg-8 mt-4 mt-lg-0">
                        {/* <div className='py-0 mt-2 mb-2 mt-lg-0 mb-lg-0'>

                            <span Class="title_main " style={{ color: '#fff' }}>{resellnftdetail.title}  </span>


                        </div> */}
                        <div className="content ">
                            <div className="card no-hover position-relative">
                                {/* <span className='share'><svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" stroke="#fff" stroke-width="2" d="M18,8 C19.6568542,8 21,6.65685425 21,5 C21,3.34314575 19.6568542,2 18,2 C16.3431458,2 15,3.34314575 15,5 C15,6.65685425 16.3431458,8 18,8 Z M6,15 C7.65685425,15 9,13.6568542 9,12 C9,10.3431458 7.65685425,9 6,9 C4.34314575,9 3,10.3431458 3,12 C3,13.6568542 4.34314575,15 6,15 Z M18,22 C19.6568542,22 21,20.6568542 21,19 C21,17.3431458 19.6568542,16 18,16 C16.3431458,16 15,17.3431458 15,19 C15,20.6568542 16.3431458,22 18,22 Z M16,18 L8,13 M16,6 L8,11" />
                                </svg></span> */}
                                <div className="owner align-items-start">
                                    <span className='boldertext w-100'>Owned By : </span>
                                    <span>{resellnftdetail.owned_by}</span>


                                </div>

                                <div>
                                    <span className='boldertext w-100'>Collection Name : </span>
                                    <span> {resellnftdetail?.collectionData?.title}</span>

                                </div>
                                <div className="item-info-list">
                                    <ul className="list-unstyled mb-0">
                                        <span class='boldertext'>Token :</span>
                                        <span> #{resellnftdetail.token_id}</span>
                                    </ul>
                                </div>

                                <div>
                                    <span className='boldertext w-100'>Affiliate first sale royalties : </span>
                                    <span> 30%</span>

                                </div>

                                <div>
                                    <span className='boldertext w-100'>NFT creator royalties : </span>
                                    <span> 10%</span>

                                </div>

                                <div>
                                    <span className='boldertext w-100'>Affiliate secondary royalties : </span>
                                    <span> 5%</span>

                                </div>

                                <div className='eddlbtton d-flex gap- align-items-center mt-2 justify-content-between'>

                                    {/* <div className="item-info-list">
                                    <ul className="list-unstyled">
                                        <li><span class='boldertext'>Affiliate first sale royalties: 20%</span></li>
                                       <li><span class='boldertext'>NFT creator royalties: 10% </span></li> 
                                        <li><span class='boldertext'>Affiliate secondary royalties: 5% </span></li>

                                        
                                    </ul>
                                </div> */}
                                    <div className='eddlbtton flex-wrap d-flex gap-10  align-items-center mt-2'>
                                        {/* {resellnftdetail.type == 1 ? ( */}
                                        {resellnftdetail.sold_nft == 1 ? (
                                            <button className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" disabled>SOLD OUT</button>
                                        ) : (

                                            <>
                                                {resellnftdetail.user_id === userdet.user_id ? (
                                                    <div className='eddlbtton d-flex  align-items-center mt-3'>


                                                        <><span className="purchase_btn  mt-3 d-flex align-items-center justify-content-center py-1 mx-2"
                                                            disabled>Your NFT is now ready to purchase</span>

                                                        </>

                                                    </div>
                                                ) : (

                                                    <><button className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" style={{ color: '#FFF' }}
                                                        id="nftdetail.id" onClick={() => { buyHandler(); setBuyModalShow(true); setLoading(true); }}>Buy Now</button><BuyPopup
                                                            show={buymodalShow}
                                                            loading={loading}


                                                            onHide={() => setBuyModalShow(false)} /></>

                                                )}

                                            </>
                                        )}
                                        {/* ) : ( */}

                                        {/* <><button className="btn  btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" style={{ color: '#FFF' }}
                                                onClick={() => setBidModalShow(true)}>Place Bid</button><BidPopup

                                                    id={resellnftdetail.id}
                                                    projid={resellnftdetail.project_id}
                                                    projtitle={resellnftdetail.title}
                                                    projcoll={resellnftdetail?.collectionData?.title}
                                                    show={bidmodalShow}
                                                    onHide={() => setBidModalShow(false)} /></>
                                        )} */}

                                    </div>
                                    {/* <Timer
                                        time={resellnftdetail.end_date}
                                    /> */}
                                    <div className='eddlbtton bitbtn d-flex  align-items-center mt-2'>

                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-12 col-lg-8 mt-4">
                        <div class="user-description ">
                            <h5 className='user_title gap-5'><div><svg width="24px" fill="#fff" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z stroke=" /><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z" /></svg></div><div>Description</div>
                            </h5>
                            <p dangerouslySetInnerHTML={{ __html: resellnftdetail.description }} />
                            {/* <ReadMore  dangerouslySetInnerHTML={{ __html: resellnftdetail.description }} /> */}
                            {/* <p dangerouslySetInnerHTML={{ __html: latprojdetail.description }} /> */}
                        </div>
                    </div>

                    <div className='col-lg-4 col-12 mt-4 '>
                        <div className='price_nft'>
                            <h5 className='user_title gap-5'>
                                <div><svg fill="#fff" width="24px" height="24px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g data-name="2. Coin" id="_2._Coin"><path d="M22,9h-.19A2.83,2.83,0,0,0,22,8V6a3,3,0,0,0-3-3H3A3,3,0,0,0,0,6V8a3,3,0,0,0,2.22,2.88A3,3,0,0,0,2,12v2a3,3,0,0,0,.22,1.12A3,3,0,0,0,0,18v2a3,3,0,0,0,2.22,2.88A3,3,0,0,0,2,24v2a3,3,0,0,0,3,3H22A10,10,0,0,0,22,9Zm-9.16,6H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H16A10,10,0,0,0,12.84,15ZM2,6A1,1,0,0,1,3,5H19a1,1,0,0,1,1,1V8a1,1,0,0,1-1,1H3A1,1,0,0,1,2,8ZM2,18a1,1,0,0,1,1-1h9.2a10.1,10.1,0,0,0,0,4H3a1,1,0,0,1-1-1Zm3,9a1,1,0,0,1-1-1V24a1,1,0,0,1,1-1h7.84A10,10,0,0,0,16,27Zm17,0a8,8,0,1,1,8-8A8,8,0,0,1,22,27Z" /><path d="M22,16h2a1,1,0,0,0,0-2H23a1,1,0,0,0-2,0v.18A3,3,0,0,0,22,20a1,1,0,0,1,0,2H20a1,1,0,0,0,0,2h1a1,1,0,0,0,2,0v-.18A3,3,0,0,0,22,18a1,1,0,0,1,0-2Z" /></g></svg></div>
                                <div>Current price</div>
                            </h5>
                            <div className='price_nft_detail'>
                                <div className='nft-price'>
                                    <img src='../../../../img/image14.png' />
                                    {/* <svg viewBox="0 0 20 20" width="24px" height="24px" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="#8247E5"></circle><path d="M12.97 8.055a.75.75 0 0 0-.732 0l-1.678.972-1.141.635-1.68.972a.751.751 0 0 1-.731 0l-1.335-.76a.727.727 0 0 1-.366-.614V7.76c0-.254.13-.486.366-.613l1.313-.74a.751.751 0 0 1 .732 0l1.313.74c.215.127.366.36.366.613v.973l1.141-.656v-.972a.684.684 0 0 0-.366-.614L7.74 5.095a.751.751 0 0 0-.732 0L4.532 6.49a.684.684 0 0 0-.365.614v2.811c0 .254.129.487.365.614l2.476 1.395a.75.75 0 0 0 .732 0l1.679-.951 1.14-.656 1.68-.951a.75.75 0 0 1 .731 0l1.313.74c.216.127.366.36.366.613v1.5c0 .255-.129.487-.366.614l-1.313.761a.751.751 0 0 1-.732 0l-1.313-.74a.727.727 0 0 1-.366-.613v-.973l-1.14.656v.972c0 .254.129.487.366.613l2.475 1.396a.751.751 0 0 0 .732 0l2.475-1.396a.727.727 0 0 0 .366-.613v-2.811a.684.684 0 0 0-.366-.614L12.97 8.055Z" fill="#fff"></path></svg> */}
                                    <span><small>{resellnftdetail.amount}  / ${resellnftdetail.amount * Math.round(matic['matic-network']?.cad)} Cdn </small></span>
                                    {/* <span><small>$120</small></span> */}
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

                                <LatNftDataTable
                                // id={id}
                                />
                            </div>
                        </div>
                    </div>




                    <div className='col-12 mt-4'>
                        <div className='funddeatil table-detail '>
                            <NftTransdataTable
                                id={slug}
                            />
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


export default ResellNftDetails;