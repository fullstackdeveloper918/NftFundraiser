import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { GetSettings, } from '../../redux/Actions/projectAction';
import Web3 from 'web3';
import { BuyNft, } from '../Wallet/interact';
import { useState } from 'react';
import NftTransdataTable from './nftTRansTable';
import LatNftDataTable from '../Explore/latnftTable';
import DModal from '../Create/3dModal';
import BuyPopup from './buyPopup';
import { GetMatic } from './../ItemDetails/GetMAtic';
import { ResellActionDetails } from '../../redux/Actions/resellNftAction';
import { GetUserAction } from '../../redux/Actions/authAction';
import swal from 'sweetalert';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
const alchemyKey = "wss://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const provider = new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B");
const ResellNftDetails = (props) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [matic, setMatic] = useState('')
    const [buymodalShow, setBuyModalShow] = React.useState(false);
   
    const slug = useParams();
    const resellnftdetail = useSelector(state => {
        return state.resell?.reselldetails
    })
    const getSett = useSelector(state => {
        return state.projectdetails.settings
    })
    const setValue = getSett.find(x => x.key === 'pricing_per_nft')
    useEffect(() => {
        (GetMatic(setMatic))
        dispatch(GetUserAction())
        dispatch(ResellActionDetails(slug))
        dispatch(GetSettings())
    }, [slug])
    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })
    const buyHandler = () => {
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
            refid: null,
            loadingg: setLoading,
            modal: setBuyModalShow,
        })
    }
    return (
        <section className="item-details-area">
            <div className="container">
                <div className="row justify-content-between content_project px-0">
                    <div className='py-0 col-12 mt-2 mb-2 mt-lg-0 mb-lg-0'>
                        <span Class="title_main " style={{ color: '#fff' }}>{resellnftdetail.title}  </span>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="item-info">
                            <><div className="item-thumb text-center">
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
                        <div className="content ">
                            <div className="card no-hover position-relative">
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
                                        <span> #{resellnftdetail.token_id?.slice(0,2)}</span>
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
                                <div className='eddlbtton d-flex gap- align-items-center mt-2 justify-content-between'>
                                    <div className='eddlbtton flex-wrap d-flex gap-10  align-items-center mt-2'>
                                        {resellnftdetail.sold_nft == 1 ? (
                                            <button className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" disabled>SOLD OUT</button>
                                        ) : (
                                            <>
                                                {resellnftdetail?.user_data?.wallet_id === window.ethereum.selectedAddress ? (
                                                    <div className='eddlbtton d-flex  align-items-center mt-3'>
                                                        <><span className="purchase_btn  mt-3 d-flex align-items-center justify-content-center py-1 mx-2"
                                                            disabled>Your NFT is now ready to purchase</span>
                                                        </>
                                                    </div>
                                                ) : (
                                                    <>
                                                    {userdet.role == 3 ?(
                                                        <button className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" style={{ color: '#FFF' }}
                                                        onClick={() => {
                                                            swal("warning", "To buy this nft you need to change your creator account to buyer ", "warning")
                                                        }}>Buy Now</button>
                                                    ):(
<>
                                                        <button className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" style={{ color: '#FFF' }}
                                                            id="nftdetail.id" onClick={() => { buyHandler(); setBuyModalShow(true); setLoading(true); }}>Buy Now</button><BuyPopup
                                                                show={buymodalShow}
                                                                loading={loading}
                                                                onHide={() => setBuyModalShow(false)} />
                                                                </>
                                                    )}
                                                            </>
                                                )}
                                            </>
                                        )}
                                    </div>
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
                                    <span><small>{resellnftdetail.amount}  / ${resellnftdetail.amount * Math.round(matic['matic-network']?.cad)} Cdn </small></span>
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
                </div>
            </div >
        </section >
    );
}
export default ResellNftDetails;