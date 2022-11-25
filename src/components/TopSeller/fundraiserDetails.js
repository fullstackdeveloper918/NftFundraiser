import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { TopFundraiserDetail } from '../../redux/Actions/fundraiserAction';
import ProgressBar from "@ramonak/react-progress-bar";
import { Button } from 'bootstrap';
import { GetfundraiserProject } from '../../redux/Actions/projectAction';
import dayjs from 'dayjs'
import { Link } from 'react-router-dom';
// const initData = {
//     itemImg: "/img/auction_2.jpg",
//     date: "2022-03-30",
//     tab_1: "Bids",
//     tab_2: "History",
//     tab_3: "Details",
//     ownerImg: "/img/avatar_1.jpg",
//     itemOwner: "Themeland",
//     created: "15 Jul 2021",
//     title: "Walking On Air",
//     content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
//     price_1: "1.5 ETH",
//     price_2: "$500.89",
//     count: "1 of 5",
//     size: "14000 x 14000 px",
//     volume: "64.1",
//     highest_bid: "2.9 BNB",
//     bid_count: "1 of 5",
//     btnText: "Place a Bid"
// }

// const tabData_1 = [
//     {
//         id: "1",
//         img: "/img/avatar_1.jpg",
//         price: "14 ETH",
//         time: "4 hours ago",
//         author: "@arham"
//     },
//     {
//         id: "2",
//         img: "/img/avatar_2.jpg",
//         price: "10 ETH",
//         time: "8 hours ago",
//         author: "@junaid"
//     },
//     {
//         id: "3",
//         img: "/img/avatar_3.jpg",
//         price: "12 ETH",
//         time: "3 hours ago",
//         author: "@yasmin"
//     }
// ]

// const tabData_2 = [
//     {
//         id: "1",
//         img: "/img/avatar_6.jpg",
//         price: "32 ETH",
//         time: "10 hours ago",
//         author: "@hasan"
//     },
//     {
//         id: "2",
//         img: "/img/avatar_7.jpg",
//         price: "24 ETH",
//         time: "6 hours ago",
//         author: "@artnox"
//     },
//     {
//         id: "3",
//         img: "/img/avatar_8.jpg",
//         price: "29 ETH",
//         time: "12 hours ago",
//         author: "@meez"
//     }
// ]

// const sellerData = [
//     {
//         id: "1",
//         img: "/img/avatar_1.jpg",
//         seller: "@ArtNoxStudio",
//         post: "Creator"
//     },
//     {
//         id: "2",
//         img: "/img/avatar_2.jpg",
//         seller: "Virtual Worlds",
//         post: "Collection"
//     }
// ]

const FundraiserDetail = () => {
    const { user_id } = useParams()
    // const { id } = useParams()
    const dispatch = useDispatch()

    const funddetail = useSelector(state => {
        return state?.fundraiser?.fundraiserdetail
    })
    console.log(funddetail?.organization_detail?.organization_name, 'fdddetail')
    const fundprojdetail = useSelector(state => {
        // debugger
        return state?.projectdetails?.getfundProjDetails
    })
    console.log(fundprojdetail, 'fdprojetail')

    useEffect(() => {

        dispatch(TopFundraiserDetail(user_id))
        dispatch(GetfundraiserProject(user_id))

    }, [dispatch, user_id])
    // state = {
    //     initData: {},
    //     tabData_1: [],
    //     tabData_2: [],
    //     sellerData: []
    // }
    // componentDidMount() {
    //     this.setState({
    //         initData: initData,
    //         tabData_1: tabData_1,
    //         tabData_2: tabData_2,
    //         sellerData: sellerData
    //     })
    // }
    // render() {
    return (
        <section className="item-details-area">
            <div className="container">
                <div className="row justify-content-between">

                    <div className="col-12 col-lg-7">
                        <div className="item-info">
                            <span>{funddetail?.organization_detail?.organization_name}</span>
                            <div className="item-thumb text-center">
                                {/* <img src={funddetail?.organization_detail?.banner_image} alt="" /> */}
                                <img src='/img/ph.jpg' alt="" />
                            </div>



                        </div>
                        <span> {funddetail?.organization_detail?.organization_name} is organizing this fundraiser.</span>

                        <div className="card no-hover">
                            <span className="mt-0 mb-2" dangerouslySetInnerHTML={{ __html: funddetail?.organization_detail?.description }} />
                            <div className="price d-flex justify-content-between align-items-center">
                            </div>
                        </div>
                        <br />
                    </div>

                    <div className="col-12 col-lg-5">
                        <div className="content mt-5 mt-lg-0">
                            {/* <h3 className="m-0">{this.state.initData.title}</h3> */}
                            {/* <p>{this.state.initData.content}</p> */}
                            <div className="owner d-flex align-items-center">

                                <a className="owner-meta d-flex align-items-center ml-3" href="/author">
                                    {/* <img className="avatar-sm rounded-circle" src={this.state.initData.ownerImg} alt="" /> */}
                                    {/* <h6 className="ml-2"></h6> */}

                                </a>
                            </div>

                            <div className="item-info-list mt-4">
                                <ul className="list-unstyled">
                                    <div className="card no-hover">

                                        <li>
                                            ${funddetail?.total_fundraised} raised from all projects

                                        </li>

                                        {/* <li className="price d-flex justify-content-between">
                                            <span className="progress-bar bg-success" role="progressbar" style={{ width: "70%" }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"> 71% </span>

                                        </li> */}
                                        <li>


                                        </li>
                                    </div>
                                    <div className="card no-hover">
                                        <li>

                                            <span>PROJECTS</span>
                                        </li>

                                        {fundprojdetail && fundprojdetail.length &&
                                            [...new Map(fundprojdetail.map(item =>
                                                [item["title"], item])).values()]?.slice(0, 4)?.map((item, idx) => {
                                                    return (

                                                        <>

                                                            <li>
                                                                {item.title}
                                                            </li><li>
                                                                {item.created_at}
                                                                {/* {(item.created_at).diff(new Date, 'day', true)} */}
                                                            </li></>
                                                    )
                                                })}
                                    </div>
                                    <li>
                                        <a className="d-block btn btn-bordered-white mt-4" href="/all/LatestProjects">view all</a>

                                    </li>

                                </ul>




                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
// }

export default FundraiserDetail;