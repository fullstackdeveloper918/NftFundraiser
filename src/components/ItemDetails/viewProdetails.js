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

const ProjDetails = () => {


    const { id } = useParams();
    // console.log(id, 'idd')
    const [tok, setTok] = useState('')
    // console.log('tok', tok)
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowrefer, setModalShowrefer] = React.useState(false);
    const latprojdetail = useSelector(state => {
        // 
        return state.projectdetails.latestprojectdetails
    })
    const [modalShoww, setModalShoww] = React.useState(false);
    console.log('latproj', latprojdetail)
    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })
    const userDetail = userdet.referrer_id
    // console.log('userdet', userDetail)
    const log = useSelector(state => {
        return state.user.userToken
    })
    useEffect(() => {
        // 
        dispatch(LatestProjectDetail(id))
        dispatch(GetUserAction())

    }, [id])

    const deleteHandler = (id) => {
        dispatch(DeleteProject(id))
    }

    const projdetail = useSelector(state => {
        // 
        return state?.projectdetails?.projectdetails
    })



    return (

        <section className="item-details-area project-nft-si main-proj-detail">
            <div className="container">
                <div className="row">
                    <div className='col-12'>
                        <h3 className="p-0">{latprojdetail.title}</h3>
                    </div>

                    <div className="col-12 col-lg-8 relative">
                        <div className="item-info" >


                            <div className="item-thumb text-center">
                                {/* {projdetail && projdetail?.nft_data && projdetail?.nft_data?.length ? */}
                                <div>
                                    <i class="fa-solid fa-pen-to-square item-thumb-edit" onClick={() => setModalShow(true)}></i>


                                    <Banner
                                        id={id}
                                        show={modalShow}
                                        onHide={() => setModalShow(false)} />
                                </div>
                                <img src={latprojdetail?.image} alt="first nft" />
                                {/* : null} */}
                            </div>

                        </div>


                        <div className="fundraiser mt-3">
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

                    <div className="col-lg-4 col-12">
                        <div>
                            <div className="progress_nft mb-3">
                                <div className='progress_main'><span>
                                    <span className='nft_price'>{latprojdetail.selling_amount} raised of {latprojdetail.price}</span><small> USD raised of $200,000 goal </small>
                                    <div className='progressbar'>
                                        <ProgressBar varient="success" now={latprojdetail.project_percentage} />
                                        {/* <span className="progress-bar bg-success" role="progressbar" style={{ width: "70" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" now={projdetail.project_percentage}> {projdetail.project_percentage}% </span> */}
                                    </div>
                                    <p className='donation-count'>2K donations</p>
                                </span>
                                </div>

                                <div className="d-flex justify-content-start">
                                    <><Button className=" btn  btn-bordered-white m-0 mr-2" variant="primary" onClick={() => setModalShowrefer(true)}>
                                        Share
                                    </Button><ReferalPopup
                                            id={id}
                                            userRef={userDetail}
                                            show={modalShowrefer}
                                            onHide={() => setModalShowrefer(false)} /></>

                                    <Button variant="primary" className=" btn  btn-bordered-white m-0">
                                        Donate
                                    </Button>
                                </div>





                                <ul className="m-0 custom_lis pl-0">
                                    <li>
                                        <div className='lorem_done p-0'>
                                            <span><svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75Z" stroke="" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M12 12C13.2416 12 14.248 10.9926 14.248 9.75C14.248 8.50736 13.2416 7.5 12 7.5C10.7584 7.5 9.75197 8.50736 9.75197 9.75C9.75197 10.9926 10.7584 12 12 12Z" stroke="#4528dc" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M14.9974 14.25C16.6528 14.25 17.9737 15.7453 16.8057 16.9195C15.703 18.0281 13.9431 18.75 12 18.75C10.0569 18.75 8.29702 18.0281 7.19428 16.9195C6.02632 15.7453 7.34722 14.25 9.00262 14.25L14.9974 14.25Z" stroke="#4528dc" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            </span>
                                            <span><div className="progress_name">Anonymous </div> <div>$25</div></span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='lorem_done p-0'>
                                            <span><svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75Z" stroke="" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M12 12C13.2416 12 14.248 10.9926 14.248 9.75C14.248 8.50736 13.2416 7.5 12 7.5C10.7584 7.5 9.75197 8.50736 9.75197 9.75C9.75197 10.9926 10.7584 12 12 12Z" stroke="#4528dc" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M14.9974 14.25C16.6528 14.25 17.9737 15.7453 16.8057 16.9195C15.703 18.0281 13.9431 18.75 12 18.75C10.0569 18.75 8.29702 18.0281 7.19428 16.9195C6.02632 15.7453 7.34722 14.25 9.00262 14.25L14.9974 14.25Z" stroke="#4528dc" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            </span>
                                            <span><div className="progress_name">Anonymous </div> <div >$27 </div></span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='lorem_done p-0'>
                                            <span><svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75Z" stroke="" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M12 12C13.2416 12 14.248 10.9926 14.248 9.75C14.248 8.50736 13.2416 7.5 12 7.5C10.7584 7.5 9.75197 8.50736 9.75197 9.75C9.75197 10.9926 10.7584 12 12 12Z" stroke="#4528dc" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M14.9974 14.25C16.6528 14.25 17.9737 15.7453 16.8057 16.9195C15.703 18.0281 13.9431 18.75 12 18.75C10.0569 18.75 8.29702 18.0281 7.19428 16.9195C6.02632 15.7453 7.34722 14.25 9.00262 14.25L14.9974 14.25Z" stroke="#4528dc" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg></span>
                                            <span><div className="progress_name">Kevin Sheridan </div> <div className="price">$50</div></span>
                                        </div>
                                    </li>

                                </ul>
                                <p className='see_all'>See all</p>
                            </div>
                        </div>
                    </div>
                    {/* {userDetail !== null && ( */}

                    {/* )} */}
                    <div className="col-8 col-lg-8">
                        <div class="user-description ">
                            <h5 className='user_title'><div>Description</div>
                                {/* <i class="fa-solid fa-pen" ></i>
						<i class="fa-sharp fa-solid fa-trash"></i> */}


                            </h5>
                            <ReadMore data={latprojdetail.description} />
                            {/* <p dangerouslySetInnerHTML={{ __html: latprojdetail.description }} /> */}
                        </div>
                    </div>

                    <div className='col-12 col-lg-4 mt-5 mt-lg-0'>


                        <div className='container table-main-detail position-relative'>



                            <ProjdataTable
                            //  id={id}
                            />
                        </div>

                    </div>
                    {/*                    
			<div className="item-info" >

				<><div className="item-thumb text-center">
					<img src={x[0]?.image} alt="" />
				</div>


				</>


			</div> */}

                </div>

                {/* <div className='col-12 col-md-4'>
			
			<div className='project-total-detail'>

				<div className='flex-column'>
					<span className='nft_price'>{projdetail.selling_amount} raised of {projdetail.price}</span>

					<div className='progressbar'>
						<ProgressBar varient="success" now={projdetail.project_percentage} />
						<span className="progress-bar bg-success" role="progressbar" style={{ width: "70%" }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" now={projdetail.project_percentage}> {projdetail.project_percentage}% </span>
					</div>
					
				</div>

				<div >
					<span className="mr-2">Total NFT's:</span><span>{projdetail?.number_of_nft}</span>
				</div>
				<div>
					<span  className="mr-2">Chain: </span><span>Polygon (Matic)</span>
				</div>

				<div>
					<span  className="mr-2">Created : </span><span>{dayjs(projdetail?.created_at).format("DD MMM YYYY")}</span>
				</div> */}

                {/* <div className='project-btn flex-column'>
					<button>
						<a href="#">Share</a> 
					</button>
					<button>
						<a href="#">Donate Now</a>
					</button>

				</div> */}
                {/* </div> */}

                {/* </div> */}


                <div className='col-md-12 col-12'>
                    {/* <div className='py-4 owner-nft'>
				<img class="avatar-sm rounded-circle" src={projdetail?.user_data?.avatar} alt="" /> <span>Owned By:</span>  <span>{projdetail?.user_data?.username}</span>
			</div> */}





                    <div className='col-12 mt-3'>
                        <div className='container table-detail'>
                            <LatNftdataTable />
                        </div>
                    </div>

                    {/* <div className='mt-5 row justify-content-between proj_main'>
				<div className="cart col-12 col-md-8 content-baner ">
					<div className="content">
						<div className='align-items-center justify-content-between'>
							<div className='d-sm-flex justify-content-between align-items-center'>
								<h3 className="m-0 p-0">{latprojdetail.title}</h3>
								
							</div>
							<div className='project-total-detail'>


								<div>
									<div className="project_img">
										<span>Owned By:</span> 
										<img class="avatar-sm rounded-circle" src={latprojdetail?.user_data?.avatar} alt="" />
										<span>{latprojdetail?.user_data?.username}</span>
									</div>

								</div>
								<div>
									<span>Chain: </span><span>Polygon (Matic)</span>
								</div>

								<div>
									<span>Created : </span><span>{dayjs(latprojdetail?.created_at).format("DD MMM YYYY")}</span>
								</div>
							</div>
							

						</div>
						



					</div>

				</div>

				<div className='col-12 col-md-4'>
					<div>
						<span className='nft_price'>{latprojdetail.selling_amount} raised of {latprojdetail.price}</span>

						<div className='progressbar'>
							<ProgressBar varient="success" now={latprojdetail.project_percentage} />
							
						</div>
					</div>
				</div>
			</div> */}

                    {/* <div className='col-12'>
				<div>

					<h5 className='user_title {item.title.slice(0, 16)}'><div>Description</div>
						
					</h5>
					<p dangerouslySetInnerHTML={{ __html: latprojdetail.description }} />
				</div>
			</div> */}

                </div>
            </div>

            {/* <div className='container table-detail'>
		<div className='row'>
			<div className='col-8'>
				<LatNftdataTable />
			</div>
			
		</div>

	</div> */}

            <div className="container mt-3">

                <div className="row items mt-0 explore-items px-0">
                    <ProjNFTS />


                </div>
            </div>
        </section>
    );

}

export default ProjDetails;