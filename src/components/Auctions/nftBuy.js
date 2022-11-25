import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { DeleteProject, GetNftwol, GetSettings, LatestProjectDetail, NftList, ProjectDetail, UpdateCollection } from '../../redux/Actions/projectAction';
import Web3 from 'web3';
import { BuyNft, ConnectWallet } from '../Wallet/interact';
import { useState } from 'react';
const alchemyKey = "wss://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// console.log(NFTContract.abi,"abi")
const web3 = createAlchemyWeb3(alchemyKey);
const provider = new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B");
const LatprojNftDetails = (props) => {
    const dispatch = useDispatch()

    const id = useParams();
    // console.log(id, 'idd')
    const latprojnftdetail = useSelector(state => {
        // debugger
        return state.projectdetails.getnftwoldetails
    })
    console.log('latprojnft', latprojnftdetail)
    const getSett = useSelector(state => {
        // debugger
        return state.projectdetails.settings
    })
    console.log('getSett', getSett)

    useEffect(() => {
        dispatch(GetNftwol(id))
        dispatch(GetSettings())

    }, [id])
    const buyHandler = () => {

        BuyNft({
            contractAddress: latprojnftdetail?.collectionData?.contract_id,
            tokenId: latprojnftdetail.token_id,
            payFrom: latprojnftdetail.pay_from

        })
    }
    return (
        <section className="item-details-area">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-12 col-lg-5">
                        <div className="item-info">
                            {/* {latprojdetail?.map((item, key) => ( */}

                            <h4 style={{ color: '#fff' }}>{latprojnftdetail.title}</h4>
                            <><div className="item-thumb text-center">

                                {/* {latprojdetail?.nft_data?.map((item, idx) => { */}
                                {/* debugger */}
                                {/* return ( */}
                                <img src={latprojnftdetail.image} alt="" />
                                {/* ) */}
                                {/* })} */}
                            </div><div className="card no-hover countdown-times my-4">
                                    <span dangerouslySetInnerHTML={{ __html: latprojnftdetail.description }} />
                                    {/* <div className="countdown d-flex justify-content-center" /> */}
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

                    <div className="col-12 col-lg-6">
                        <div className="content mt-5 mt-lg-0">

                            <div className='eddlbtton d-flex  align-items-center px-2'>

                                <button className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" style={{ color: '#FFF' }}
                                    id="nftdetail.id" onClick={() => buyHandler()}>  Buy</button>


                            </div>

                            <div className='d-flex  align-items-center justify-content-between'>
                                {/* <h3 className="m-0">{nftdetail?.title}</h3> */}

                                <div className='eddlbtton d-flex  align-items-center '>
                                    {/* <a className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2"> <Link to={`/updateproject/${projdetail.projectdetails.id}`} style={{ color: '#FFF' }}>Edit</Link></a>
                                    <a className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-2" onClick={() => deleteHandler(projdetail.projectdetails.id)} style={{ color: '#FFF' }}>Delete</a> */}
                                </div>

                            </div>

                            {/* <p dangerouslySetInnerHTML={{ __html: nftdetail?.description }} /> */}
                            <div className="owner d-flex align-items-center">
                                <span>Owned By : {latprojnftdetail.pay_from}</span>
                                <a className="owner-meta d-flex align-items-center ml-3" href="/author">
                                    {/* <img className="avatar-sm rounded-circle" src="/img/avtar1.png" alt="" /> */}
                                    {/* <h6 className="ml-2">{latprojnftdetail.pay_from}</h6> */}
                                </a>
                            </div>

                            <div className="item-info-list mt-4">
                                <ul className="list-unstyled">
                                    <li className="price d-flex justify-content-between">
                                        {/* <span>Current Price : {nftdetail?.price} MATIC</span> */}
                                        {/* <span>Price </span> */}
                                        {/* <span>{latprojdetail.price} MATIC</span> */}

                                    </li>
                                    {/* <li>

                                        <span dangerouslySetInnerHTML={{ __html: latprojnftdetail.description }} />
                                    </li> */}
                                    {/* <li> */}
                                    {/* <span>Volume Traded </span> */}
                                    {/* {latprojdetail?.nft_data?.map((item, idx) => { */}
                                    {/* debugger */}

                                    <span>Token : #{latprojnftdetail.token_id}</span>

                                    {/* })} */}
                                    {/* </li> */}
                                </ul>
                            </div>

                            {/* <a className="d-block btn btn-bordered-white mt-4" href="/wallet-connect">{initData.btnText}</a> */}
                        </div>
                    </div>
                </div>
            </div >

        </section >
    );

}


export default LatprojNftDetails;