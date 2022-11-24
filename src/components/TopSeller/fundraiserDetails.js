import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { TopFundraiserDetail } from '../../redux/Actions/fundraiserAction';
import ProgressBar from "@ramonak/react-progress-bar";
import { Button } from 'bootstrap';
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
    const dispatch = useDispatch()

    const funddetail = useSelector(state => {
        return state?.fundraiser?.fundraiserdetail
    })
    console.log(funddetail, 'fdddetail')

    useEffect(() => {

        dispatch(TopFundraiserDetail(user_id))
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
                    <h3>Kimball family medical and funeral bills.</h3>
                    <div className="col-12 col-lg-7">
                        <div className="item-info">
                            <div className="item-thumb text-center">
                                <img src="/img/ph.jpg" alt="" />
                            </div>



                        </div>
                        <i className="fa-sharp fa-solid fa-user"></i><span> Kelli Liston is organizing this fundraiser.</span>

                        <div className="card no-hover">
                            <span className="mt-0 mb-2">My sister Kristi Kimball and her children were driving on the freeway Thursday evening when they were hit full speed by a semi truck while traffic had slowed to a stop. My sister has a concussion and broken bones. - Kristi and Quinn’s oldest daughter Ruby is in critical condition at Primary Childrens hospital in the ICU awaiting surgery this morning. And Lou is stable. Kristi and Quinn’s beautiful 6 year old son Edison died in the crash. - please help alleviate some of the immediate financial burden so that this family can focus on healing. - my sister and her husband buried their oldest daughter Lila 8 years ago, and we cannot comprehend what is ahead. Please understand that Kristi and Quinn need time and space to focus on the immediate health care needs of their family. Thank you for your help.

                                Update: Kristi and Ruby are still hospitalized but are in stable condition. Ruby’s surgery went well.</span>
                            <div className="price d-flex justify-content-between align-items-center">
                            </div>
                        </div>
                        <br />
                        <div>
                            <span><b>Word of support (80)</b> <br />Please donate to share words of support.</span>
                        </div>
                        <br />
                        <br />
                        <div>
                            Kenneth Corbett <br /><b>$27</b>  10 d<br />You _all_ matter.
                        </div>
                        <br />
                        <div>
                            Kevin Sheridan  <br /><b>$50</b>  24 d<br />Sending you and the family love, prayers and healing
                        </div>
                        <br />
                        <div>
                            Aileen Imperial  <br /><b>$20</b>  25 d<br />Thoughts go to your family, I hope things will head in a good direction!
                        </div>
                        <br />

                        <div>
                            Nate Hrivnak  <br /><b>$100</b>  26 d<br />Quinn and Family, I am so sorry to hear of your loss and send love and healing thoughts to you and your family.
                        </div>

                    </div>

                    <div className="col-12 col-lg-5">
                        <div className="content mt-5 mt-lg-0">
                            {/* <h3 className="m-0">{this.state.initData.title}</h3> */}
                            {/* <p>{this.state.initData.content}</p> */}
                            <div className="owner d-flex align-items-center">
                                <span>$188,449 USD raised of $200,000 goal</span>
                                <a className="owner-meta d-flex align-items-center ml-3" href="/author">
                                    {/* <img className="avatar-sm rounded-circle" src={this.state.initData.ownerImg} alt="" /> */}
                                    {/* <h6 className="ml-2"></h6> */}

                                </a>
                            </div>
                            <div className="item-info-list mt-4">
                                <ul className="list-unstyled">
                                    <li className="price d-flex justify-content-between">
                                        <span className="progress-bar bg-success" role="progressbar" style={{ width: "70%" }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"> 71% </span>

                                    </li>
                                    <span>2K donations</span>

                                    {/* <button>Share </button> */}
                                    {/* <span>size</span> */}

                                    {/* <Button>Donate now </Button> */}
                                    {/* <span>size</span> */}

                                    <li>
                                        {/* <span>Volume Traded </span> */}
                                        {/* <span>trad</span> */}
                                    </li>
                                </ul>
                            </div>
                            <a className="d-block btn btn-bordered-white mt-2" >Share</a>
                            <a className="d-block btn btn-bordered-white mt-2">Donate now</a>

                            <div className="row items">
                                <div className="col-12 col-md-6 item px-lg-2">
                                    <div>
                                        Kenneth Corbett <br /><b>$27</b>  10 d
                                    </div>
                                    <br />
                                    <div>
                                        Kevin Sheridan  <br /><b>$50</b>  24 d
                                    </div>
                                    <br />
                                    <div>
                                        Aileen Imperial  <br /><b>$20</b>  25 d
                                    </div>
                                    <br />

                                    <div>
                                        Nate Hrivnak  <br /><b>$100</b>  26 d
                                    </div>
                                    {/* <div className="card no-hover">
                                        <div className="single-seller d-flex align-items-center">
                                            <a href="/author"> */}
                                    {/* <img className="avatar-md rounded-circle" src={funddetail.avatar} alt="" /> */}
                                    {/* </a> */}
                                    {/* <div className="seller-info ml-3">
                                                <a className="seller mb-2" href="/author">wwww</a>
                                            </div> */}
                                    {/* </div> */}
                                    {/* </div> */}
                                </div>
                                {/* <div className="col-12 item px-lg-2">
                                    <div className="card no-hover">
                                        <h4 className="mt-0 mb-2">Highest Bid</h4>
                                        <div className="price d-flex justify-content-between align-items-center">
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            {/* <a className="d-block btn btn-bordered-white mt-4" href="/wallet-connect">New</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
// }

export default FundraiserDetail;