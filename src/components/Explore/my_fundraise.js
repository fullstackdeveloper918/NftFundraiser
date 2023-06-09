import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { TopFundraiserDetail } from '../../redux/Actions/fundraiserAction';
import ProgressBar from "@ramonak/react-progress-bar";
import { Button } from 'bootstrap';
import { GetfundraiserProject } from '../../redux/Actions/projectAction';
import dayjs from 'dayjs'
import { Link } from 'react-router-dom';
import FunddataTable from '../TopSeller/fundraiserdetail';
import FundTransdataTable from '../TopSeller/fundPaymenttable';
import ReadMore from '../../readMore';

const MyFundraiserDetail = () => {
    const { user_id } = useParams()
    // const { id } = useParams()
    const dispatch = useDispatch()

    const funddetail = useSelector(state => {
        return state?.fundraiser?.fundraiserdetail
    })
    const fundprojdetail = useSelector(state => {
        // 
        return state?.projectdetails?.getfundProjDetails
    })

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
                <div class="row py-0">
                    <div className='col-12 p-0'>
                        <span className='title_main'>{funddetail?.organization_detail?.organization_name}</span>
                    </div>
                </div>
                <div className="row justify-content-between px-0">
                    <div className="col-12 col-lg-8">
                        <div className="item-info">

                            <div className="item-thumb text-center">
                                <img src={funddetail?.organization_detail?.banner_image} alt="" />
                                {/* <img src='/img/ph.jpg' alt="" /> */}
                            </div>

                        </div>
                        <div className='lorem_done'>
                            <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75Z" stroke="" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 12C13.2416 12 14.248 10.9926 14.248 9.75C14.248 8.50736 13.2416 7.5 12 7.5C10.7584 7.5 9.75197 8.50736 9.75197 9.75C9.75197 10.9926 10.7584 12 12 12Z" stroke="#4528dc" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M14.9974 14.25C16.6528 14.25 17.9737 15.7453 16.8057 16.9195C15.703 18.0281 13.9431 18.75 12 18.75C10.0569 18.75 8.29702 18.0281 7.19428 16.9195C6.02632 15.7453 7.34722 14.25 9.00262 14.25L14.9974 14.25Z" stroke="#4528dc" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>


                            <span className='cutom_dis'> {funddetail?.organization_detail?.organization_name} is organizing this fundraiser.</span>
                        </div>

                        <br />
                        <div className='custam_col'>
                            <h5 class="user_title"><div>Description</div></h5>
                            <div className=" no-hover">
                                {/* <span className="mt-0 mb-2" dangerouslySetInnerHTML={{ __html: funddetail?.organization_detail?.description }} /> */}
                                <ReadMore data={funddetail?.organization_detail?.description} />
                                <div className="price d-flex justify-content-between align-items-center">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="content mt-5 mt-lg-0">
                            {/* <h3 className="m-0">{this.state.initData.title}</h3> */}
                            {/* <p>{this.state.initData.content}</p> */}
                            <div className="owner d-flex align-items-center">

                                <a className="owner-meta d-flex align-items-center ml-3" href="/author">
                                    {/* <img className="avatar-sm rounded-circle" src={this.state.initData.ownerImg} alt="" /> */}
                                    {/* <h6 className="ml-2"></h6> */}

                                </a>
                            </div>

                            <div className="item-info-list">

                                <ul className="list-unstyled">
                                    <div className="card no-hover detail_single_nfts">

                                        <li className='nft_price'>
                                            ${funddetail?.total_fundraised} raised from all projects

                                        </li>


                                        {/* <li className="price d-flex justify-content-between">
                                                <span className="progress-bar bg-success" role="progressbar" style={{ width: "70%" }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"> 71% </span>
    
                                            </li> */}

                                    </div>
                                    <div className="custam_col no-hover">
                                        <h5 class="user_title"><div>Projects</div></h5>
                                        {/* <li className='card-inner-heading'>
                                            <span style={{}}>Projects</span>
                                        </li> */}

                                        {fundprojdetail && fundprojdetail.length &&
                                            [...new Map(fundprojdetail.map(item =>
                                                [item["title"], item])).values()]?.slice(0, 4)?.map((item, idx) => {
                                                    const date1 = new Date(item.created_at)
                                                    const date2 = new Date()
                                                    const time_difference = date2.getTime() - date1.getTime();
                                                    const days_difference = Math.ceil(time_difference / (1000 * 60 * 60 * 24));
                                                    // const totaldays = days_difference.slice(0,1)
                                                    return (

                                                        <>
                                                            <ul className="project_back">
                                                                <li className='item_title'>
                                                                    {item.title}
                                                                </li><li className='item_created'>
                                                                    {days_difference} days ago
                                                                    {/* {(item.created_at).diff(new Date, 'day', true)} */}
                                                                </li>
                                                            </ul>
                                                        </>
                                                    )
                                                })}
                                        <li className='button_blow'>
                                            <a className="d-block btn btn-bordered-white mt-4" href="/all/LatestProjects">view all</a>

                                        </li>
                                    </div>

                                </ul>




                            </div>

                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 col-md-8'>

                    </div>
                    <div className='col-12 col-md-4'>

                    </div>
                </div>

                <div className='row'>
                    <div className='col-12'>
                        <div className='funddeatil'>

                            <FunddataTable />

                            <FundTransdataTable />

                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
// }

export default MyFundraiserDetail;