import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { DeleteProject, LatestProjectDetail, ProjectDetail } from '../../redux/Actions/projectAction';
import { getProjectDetail } from '../../redux/Slices/projectSlice';
import { useState } from 'react';
import dayjs from 'dayjs'
import { BuyNft } from '../Wallet/interact';
import ProjNFTS from '../Auctions/projectnfts';

const ProjDetails = () => {

    const initData = {
        itemImg: "/img/avtar1.png",
        date: "2022-03-30",
        tab_1: "Activity",
        tab_2: "History",
        tab_3: "Details",
        ownerImg: "/img/avtar1.png",
        itemOwner: "Themeland",
        created: "15 Jul 2021",
        title: "Walking On Air",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
        price_1: "1.5 ETH",
        price_2: "$500.89",
        count: "1 of 5",
        size: "14000 x 14000 px",
        volume: "64.1",
        highest_bid: "2.9 BNB",
        bid_count: "1 of 5",
        btnText: "Place a Bid"
    }
    const tabData_1 = [
        {
            id: "1",
            img: "/img/avtar1.png",
            price: "14 ETH",
            time: "4 hours ago",
            author: "@arham"
        },
        {
            id: "2",
            img: "/img/avtar2.jpg",
            price: "10 ETH",
            time: "8 hours ago",
            author: "@junaid"
        },
        {
            id: "3",
            img: "/img/avtar3.png",
            price: "12 ETH",
            time: "3 hours ago",
            author: "@yasmin"
        }
    ]

    const tabData_2 = [
        {
            id: "1",
            img: "/img/avtar1.png",
            price: "32 ETH",
            time: "10 hours ago",
            author: "@hasan"
        },
        {
            id: "2",
            img: "/img/avtar2.jpg",
            price: "24 ETH",
            time: "6 hours ago",
            author: "@artnox"
        },
        {
            id: "3",
            img: "/img/avtar3.png",
            price: "29 ETH",
            time: "12 hours ago",
            author: "@meez"
        }
    ]

    const sellerData = [
        {
            id: "1",
            img: "/img/avtar1.png",
            seller: "@ArtNoxStudio",
            post: "Creator"
        },
        {
            id: "2",
            img: "/img/avtar2.jpg",
            seller: "Virtual Worlds",
            post: "Collection"
        }
    ]

    const { id } = useParams();
    // console.log(id, 'idd')
    const [tok, setTok] = useState('')
    console.log('tok', tok)
    const dispatch = useDispatch()

    const latprojdetail = useSelector(state => {
        // debugger
        return state.projectdetails.latestprojectdetails
    })
    console.log('latproj', latprojdetail?.nft_data?.pay_from)

    useEffect(() => {
        // debugger
        dispatch(LatestProjectDetail(id))

    }, [id])




    // debugger
    // console.log(latprojdetail?.nft_data[0]?.token_id, 'latprojdetail')

    // const deleteHandler = (id) => {
    //     dispatch(DeleteProject(id))
    // }

    // debugger


    // const buyHandler = (contractAddress) => {
    //     BuyNft({
    //         contractAddress,

    //     })
    // }

    return (
        <section className="item-details-area">
            <div className="container">
                <div className='row py-0'>
                    <span Class="title_main ">{latprojdetail.title}</span>
                </div>

                <div className="row justify-content-between px-0">
                    <div className="col-12 col-lg-8">
                        <div className="item-info">

                            <><div className="item-thumb text-center">
                                {latprojdetail && latprojdetail?.nft_data && latprojdetail?.nft_data?.length ?
                                    <img src={latprojdetail.nft_data[0].image} alt="first nft" />
                                    : null}
                                {/* {latprojdetail?.nft_data[0]?.map((item, key) => (
                                    <img src={item.image} alt="" />
                                ))} */}
                            </div>

                                <div className="card no-hover countdown-times my-4">

                                    <div className="countdown d-flex " dangerouslySetInnerHTML={{ __html: latprojdetail.description }} />
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
                            {/* <div className="tab-content" id="nav-tabContent"> */}
                            {/* <div className="tab-pane fade show active" id="nav-home">
                                    <ul className="list-unstyled">
                                        {tabData_1.map((item, idx) => {
                                            return (
                                                <li className="single-tab-list d-flex align-items-center">
                                                    <img className="avatar-sm rounded-circle mr-3" src={item.img} alt="" />
                                                    <p className="m-0">Bid listed for <strong>{item.price}</strong> {item.time} <br />by <a href="/author">{latprojdetail?.user_data?.username}</a></p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div> */}

                            {/* <div className="tab-pane fade" id="nav-contact">
                                    <div className="owner-meta d-flex align-items-center mt-3">
                                        <span>Owner</span>
                                        <a className="owner d-flex align-items-center ml-2" href="/author">
                                            <img className="avatar-sm rounded-circle" src={initData.ownerImg} alt="" />
                                            <h6 className="ml-2">{latprojdetail?.user_data?.username}</h6>
                                        </a>
                                    </div>
                                    <p className="mt-2">Created : {dayjs(latprojdetail.created_at).format("DD MMM YYYY")}</p>
                                </div> */}
                            {/* </div> */}
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">

                        <div className="card no-hover">
                            <span>$188,449 USD raised of $200,000 goal</span>
                            <span className="progress-bar bg-success" role="progressbar" style={{ width: "70%" }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"> 71% </span>


                            <div className="content sm:mt-5 mt-lg-0">


                                <div className="item-info-list">
                                    <ul className="list-unstyled viewproduct-detail">
                                        <li> <span>Owned By :</span> <span> Organization name</span></li>
                                        <li className="price d-flex">
                                            <span>Current Price : </span><span>{latprojdetail.price} MATIC</span>
                                            {/* <span>Price </span> */}
                                            {/* <span>{latprojdetail.price} MATIC</span> */}

                                        </li>
                                        <li>

                                            {/* <span>{projdetail.projectdetails.latitude}</span> */}
                                        </li>
                                        <li>
                                            {/* <span>Volume Traded </span> */}
                                            <span>Number of NFT's Minted : {latprojdetail.number_of_nft}</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* <a className="d-block btn btn-bordered-white mt-4" onClick={buyHandler}>Buy</a> */}
                            </div>
                        </div>
                    </div>
                    <ProjNFTS />




                </div>
            </div >
        </section >
    );

}

export default ProjDetails;