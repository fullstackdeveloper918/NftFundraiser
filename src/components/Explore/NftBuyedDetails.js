import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {   useParams } from 'react-router';
import {  GetbuyedNftDetails } from '../../redux/Actions/projectAction';
import { useState } from 'react';
import DModal from '../Create/3dModal';
import SellPopup from '../ItemDetails/sellPopup';
import NftBuydataTable from './NftBuyData';
import { GetMatic } from '../ItemDetails/GetMAtic';


const BuyedNftDetails = () => {
   
    const [matic, setMatic] = useState('')
    const [sellmodalShow, setSellModalShow] = React.useState(false);


    const slug = useParams();

    const dispatch = useDispatch()

    const nftdetail = useSelector(state => {
        return state?.projectdetails?.getBuyedNftdetails

    })
    useEffect(() => {
        (GetMatic(setMatic))
        dispatch(GetbuyedNftDetails(slug))
    }, [slug,dispatch])




    return (

        <section className="item-details-area">
            <div className="container">
                <div className="row justify-content-between content_project px-0">
                    <div className="col-12 col-md-4 ">
                        <div className="item-info">
                           
                            <><div className="item-thumb text-center align-items-center d-flex">
                                {nftdetail.extention === "Player" &&

                                    <video
                                        width="100%"
                                        controls
                                        src={nftdetail.image}
                                    />
                                }
                                {nftdetail.extention === "modal" &&
                                    <DModal
                                        vdo={nftdetail.image}
                                    />
                                }
                                {nftdetail.extention === "Image" &&

                                    <img src={nftdetail.image} alt="" />
                                }
                            </div>

                            </>

                        </div>
                    </div>


                    <div className="col-12 col-lg-8 mt-4 mt-sm-0">
                        <div className=' card no-hover py-0 mt-2 mb-2 mt-lg-0 mb-lg-0 '>

                            <span Class="title_main " style={{ color: '#fff' }}>{nftdetail?.title} </span>
                          

                        </div>
                        <div className="content sm:mt-3 mt-lg-2">
                            <div className="card no-hover position-relative">
                               
                                <div className="owner align-items-start">
                                    <span className='boldertext w-100'>Owned By : </span>
                                    <span>You</span>

                                    <a className="owner-meta d-flex align-items-center ml-3" href="/author">
                                    </a>
                                </div>

                                <div>
                                    <span className='boldertext w-100'>Collection Name : </span>
                                    <span> {nftdetail?.collectionData?.title}</span>

                                </div>
                                <div className="item-info-list">
                                    <ul className="list-unstyled">
                                        <span class='boldertext'>Token :</span>
                                        <span> #{nftdetail.token_id?.slice(0,2)}</span>
                                    </ul>
                                </div>
                                {nftdetail.nft_type === "1" ? (
                                    <div className='eddlbtton d-flex  align-items-center mt-3'>


                                        <><span className="purchase_btn  mt-3 d-flex align-items-center justify-content-center py-1 mx-2"
                                            disabled>Status: Ready to purchase</span>

                                        </>

                                    </div>


                                ) : (

                                    <div className='eddlbtton d-flex  align-items-center mt-3'>


                                        <><button className="w-full btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" style={{ color: '#FFF' }}
                                            onClick={() => setSellModalShow(true)}>  Sell</button>
                                            <SellPopup

                                                show={sellmodalShow}
                                                slug={slug}

                                                onHide={() => setSellModalShow(false)}
                                                nftid={nftdetail.id}
                                                ismint={nftdetail.is_mint}
                                            />

                                        </>

                                    </div>
                                )}

                            </div>
                        </div>
                    </div>





                    <div className="col-12 md:col-8 mt-4">
                        <div class="user-description ">
                            <h5 className='user_title gap-5'><div><svg width="24px" fill="#fff" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z stroke=" /><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z" /></svg></div><div>Description</div>
                            </h5>
                           
                            <p dangerouslySetInnerHTML={{ __html: nftdetail.description }} className="nft-detail-nft " />
                           
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
                                   
                                    <img src='../../img/image14.png' alt='' />
                                    <span><small>{nftdetail.amount} / ${nftdetail.amount * Math.round(matic['matic-network']?.cad)} Cdn</small> </span>
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
                        <div className="profile_detail mt-4">

                            <NftBuydataTable
                                slug={slug}
                            />
                        </div>
                    </div>
                   
                </div >
            </div>
        </section >
    );

}


export default BuyedNftDetails;