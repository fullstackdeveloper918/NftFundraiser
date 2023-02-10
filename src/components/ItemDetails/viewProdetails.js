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
import { Button, ProgressBar } from 'react-bootstrap';
import { GetUserAction } from '../../redux/Actions/authAction';
import MyVerticallyCenteredModal from './refralPopup';
import swal from 'sweetalert';
import Banner from '../Create/editBanner';
import EditNft from '../Create/editNft';
import NftdataTable from '../Explore/nftdataTable';
import latNftdataTable from './../Explore/latProjNftdata';
import LatNftdataTable from './../Explore/latProjNftdata';
import ProjdataTable from '../Explore/projDetailtable';
import ReferalPopup from './refralPopup';
import ReadMore from '../../readMore';
import { GetMatic } from './GetMAtic';
import FormItem from 'antd/es/form/FormItem';
import { useLocation } from "react-router-dom";
const ProjDetails = () => {


    const { slug } = useParams();
    const search = useLocation().search;
    const refid = new URLSearchParams(search).get('refid');
    console.log(refid, 'refid')
    const [tok, setTok] = useState('')
    // console.log('tok', tok)
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = React.useState(false);
    const [matic, setMatic] = useState('')
    const [modalShowrefer, setModalShowrefer] = React.useState(false);
    // const [matic, setmatic] = useState('')
    const latprojdetail = useSelector(state => {
        // 
        return state.projectdetails.latestprojectdetails
    })
    const [modalShoww, setModalShoww] = React.useState(false);
    console.log('latproj', latprojdetail?.nft_data)
    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })
    const userDetail = userdet.referrer_id


    useEffect(() => {
        (GetMatic(setMatic))
        dispatch(LatestProjectDetail(slug))
        dispatch(GetUserAction())

    }, [slug])



    return (

        <section className="item-details-area project-nft-si main-proj-detail">
            <div className="container">
                <div className="row">
                    <div className='col-12'>
                        <span className="p-0 title_main">{latprojdetail.title}</span>
                    </div>

                    <div className="col-12 col-lg-8 relative">
                        <div className="item-info" >


                            <div className="item-thumb text-center">
                                <><div>
                                    {latprojdetail?.user_data?.user_id === userdet?.user_id && localStorage.getItem('authToken') &&
                                        <i class="fa-solid fa-pen-to-square item-thumb-edit" onClick={() => setModalShow(true)}></i>


                                    }
                                    <Banner
                                        id={slug}
                                        show={modalShow}
                                        onHide={() => setModalShow(false)} />
                                </div><img src={latprojdetail?.image} alt="first nft" /></>
                            </div>

                        </div>


                        <div className="fundraiser mt-4 ">
                            <div className='lorem_done'>
                                <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75Z" stroke="" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 12C13.2416 12 14.248 10.9926 14.248 9.75C14.248 8.50736 13.2416 7.5 12 7.5C10.7584 7.5 9.75197 8.50736 9.75197 9.75C9.75197 10.9926 10.7584 12 12 12Z" stroke="#4528dc" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.9974 14.25C16.6528 14.25 17.9737 15.7453 16.8057 16.9195C15.703 18.0281 13.9431 18.75 12 18.75C10.0569 18.75 8.29702 18.0281 7.19428 16.9195C6.02632 15.7453 7.34722 14.25 9.00262 14.25L14.9974 14.25Z" stroke="#4528dc" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span className='cutom_dis'> {latprojdetail?.user_data?.organization_detail?.organization_name} is organizing this project.</span>
                            </div>


                        </div>


                    </div>

                    <div className="col-lg-4 col-12 mt-4 mt-lg-0">
                        <div className='proj-left user_icon'>
                            <div className="progress_nft ">
                                <div className='progress_main'><span>
                                    {/* ({Number(latprojdetail.project_count) * Number(matic['matic-network']?.cad)} of {Number(latprojdetail.price) * Number(Math.round(matic['matic-network']?.cad))} MATIC ) */}
                                    <span className='nft_price'>${Number(latprojdetail.project_count) * Number(matic['matic-network']?.cad)} raised of ${Math.round(Number(latprojdetail.price)) * Number(Math.round(matic['matic-network']?.cad))} Cdn Goal</span>
                                    <div>

                                        {/* ${Math.round(latprojdetail.project_count)} raised of ${Math.round(latprojdetail.price)} Cdn Goal */}
                                        <span className='nft_price'>({Math.round(latprojdetail.project_count)} of {Math.round(latprojdetail.price)} MATIC) </span>
                                    </div>
                                    {/* <span className='nft_price'>{latprojdetail.project_count} raised of {latprojdetail.price} Cdn goal (150 of 758 MATIC)</span><small>  </small> */}
                                    <div className='progressbar'>
                                        <ProgressBar varient="success" now={latprojdetail.project_percentage} />
                                        {/* <span className="progress-bar bg-success" role="progressbar" style={{ width: "70" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" now={projdetail.project_percentage}> {projdetail.project_percentage}% </span> */}
                                    </div>
                                    <p className='donation-count'>${latprojdetail.project_count} RAISED</p>
                                </span>
                                </div>

                                <div className="d-flex flex-wrap gap-5 justify-content-start">


                                    <>
                                        <a href='#invest'><Button variant="primary" className=" btn  btn-bordered-white m-0">
                                            Invest
                                        </Button>



                                        </a>
                                        <Button className="btn sm:ml-2 btn-bordered-white m-0" variant="primary" onClick={() => setModalShowrefer(true)}>


                                            Share
                                        </Button><ReferalPopup
                                            id={slug}
                                            userRef={userDetail}
                                            show={modalShowrefer}
                                            onHide={() => setModalShowrefer(false)} /></>


                                </div>
                                {latprojdetail?.user_invest && latprojdetail?.user_invest?.length ?
                                    [...new Map(latprojdetail?.user_invest?.slice(0, 3)?.map(item =>
                                        [item["title"], item])).values()].map((item, idx) => {
                                            const date1 = new Date(item.updated_at)
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
                                                                <path d="M12 12C13.2416 12 14.248 10.9926 14.248 9.75C14.248 8.50736 13.2416 7.5 12 7.5C10.7584 7.5 9.75197 8.50736 9.75197 9.75C9.75197 10.9926 10.7584 12 12 12Z" stroke="#494c4e" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M14.9974 14.25C16.6528 14.25 17.9737 15.7453 16.8057 16.9195C15.703 18.0281 13.9431 18.75 12 18.75C10.0569 18.75 8.29702 18.0281 7.19428 16.9195C6.02632 15.7453 7.34722 14.25 9.00262 14.25L14.9974 14.25Z" stroke="#494c4e" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                            </span>

                                                            <span><div className="progress_name">{item.username} </div> <div>${item.price} Cdn / {Math.round(Number(latprojdetail.price) * Number(matic['matic-network']?.cad))} MATIC ({days_difference} days ago)</div></span>
                                                        </div>
                                                    </li>


                                                </ul>
                                            )
                                        }) :
                                    <div className="col-12 col-sm-12 text-center col-lg-12 mt-2 mb-2">

                                        <span className='allproj2 w-100'>
                                            No user has invested yet
                                        </span>

                                    </div>
                                }


                            </div>
                        </div>
                    </div>
                    {/* {userDetail !== null && ( */}

                    {/* )} */}
                    <div className="col-12 col-lg-8 mt-4">
                        <div class="user-description ">

                            <h5 className='user_title gap-5'><div><svg width="24px" fill="#fff" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z stroke=" /><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z" /></svg></div><div>Description</div>

                                {/* <i class="fa-solid fa-pen" ></i>
						<i class="fa-sharp fa-solid fa-trash"></i> */}


                            </h5>
                            <ReadMore data={latprojdetail.description} />
                            {/* <p dangerouslySetInnerHTML={{ __html: latprojdetail.description }} /> */}
                        </div>
                    </div>

                    <div className='col-12 col-lg-4 mt-4'>


                        <div className='table-main-detail position-relative'>



                            <ProjdataTable
                                id={slug}
                            />
                        </div>

                    </div>
                    <div className='col-12'>
                        <div className='mt-4'>
                            <div className='table-detail'>
                                <LatNftdataTable />
                            </div>
                        </div>

                    </div>

                    <div className=" col-12 mt-4">
                        <div id="invest" className="items mt-0 explore-items p-0">
                            <ProjNFTS
                                refid={refid}
                            />
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );

}

export default ProjDetails;