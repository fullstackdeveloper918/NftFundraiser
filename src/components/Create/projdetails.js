import dayjs from 'dayjs';
import React, { Component, useEffect } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { DeleteProject, GetCollectionDetails, ProjectDetail } from '../../redux/Actions/projectAction';
import latprojDetails from '../../themes/latproj-details';
import LatNftdataTable from '../Explore/latProjNftdata';
import NftdataTable from '../Explore/nftdataTable';
import Banner from './editBanner';
import EditNft from './editNft';
import DesPopup from './desPopup';
import ProjdataTable from '../Explore/projDetailtable';

// import ProgressBar from 'react-bootstrap';

const ProjNftDetails = () => {
    const deleteHandler = (id) => {
        dispatch(DeleteProject(id))
    }

    const { id } = useParams()
    // console.log(id, 'idd')
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowedit, setModalShowedit] = React.useState(false);
    const [modalShowadd, setModalShowadd] = React.useState(false);
    const [modalShowrefer, setModalShowrefer] = React.useState(false);
    const dispatch = useDispatch()
    const [modalShowDes, setModalShowDes] = React.useState(false);
    const projdetail = useSelector(state => {
        // 
        return state?.projectdetails?.projectdetails
    })
    console.log(projdetail, 'projdata')

    useEffect(() => {
        // 
        dispatch(ProjectDetail(id))
    }, [id])


    // const deleteHandler = (id) => {
    //     dispatch(DeleteProject(id))
    // }
    // 
    const bannerHandler = () => {

    }
    return (
        <section className="item-details-area project-nft-si main-proj-detail">
            <div className="container">

                <div className="row justify-content-between p-0">
                    <div className='col-12'>
                        <h3 className="my-2 p-0 ">{projdetail.title}</h3>
                    </div>

                    <div className='col-12 col-lg-8'>
                        <div className="item-info" >
                            <div className="item-thumb text-center">
                                {/* {projdetail && projdetail?.nft_data && projdetail?.nft_data?.length ? */}
                                <div>
                                    <i class="fa-solid fa-pen-to-square item-thumb-edit" onClick={() =>
                                        setModalShow(true)}></i>
                                    <Banner
                                        id={id}
                                        show={modalShow}
                                        onHide={() => setModalShow(false)} />
                                </div>
                                <img src={projdetail?.image} alt="first nft" />
                                {/* : null} */}
                            </div>
                        </div>

                        <div class="user-description mt-5">
                            <h5 className='user_title'><div>Description</div>
                                {/* <i class="fa-solid fa-pen" ></i>
							<i class="fa-sharp fa-solid fa-trash"></i> */}

                                {/* {projdetail?.status == 1 && (
								<div >

									<a className=""> <Link to={`/updateproject/${projdetail.id}`} style={{ color: '#FFF' }}> <i class="fa-solid fa-pen" ></i></Link></a>
									<a className="" onClick={() => deleteHandler(projdetail.id)} style={{ color: '#FFF' }}> <i class="fa-sharp fa-solid fa-trash"></i>
									</a>
								</div>
								)} */}
                                <div >
                                    <i class="fa-solid fa-pen" onClick={() =>
                                        setModalShowDes(true)}></i>
                                    <DesPopup
                                        id={id}
                                        show={modalShowDes}
                                        onHide={() => setModalShowDes(false)} />
                                </div>
                            </h5>
                            <p dangerouslySetInnerHTML={{ __html: projdetail.description }} />
                        </div>
                    </div>
                    {/* <div className='flex-column'>
							<span className='nft_price'>{projdetail.selling_amount} raised of {projdetail.price}</span>

							<div className='progressbar'>
								<ProgressBar varient="success" now={projdetail.project_percentage} />
								<span className="progress-bar bg-success" role="progressbar" style={{ width: "70%" }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" now={projdetail.project_percentage}> {projdetail.project_percentage}% </span>
							</div>
							
						</div> */}

                    <div className='col-12 col-lg-4 mt-5 mt-lg-0'>
                        <div>
                            <div>
                                <div className="progress_nft mb-3">
                                    <div className='progress_main'><span>
                                        <span className='nft_price'>{projdetail.selling_amount} raised of {projdetail.price}</span><small> USD raised of $200,000 goal </small>
                                        <div className='progressbar'>
                                            <ProgressBar varient="success" now={projdetail.project_percentage} />
                                            {/* <span className="progress-bar bg-success" role="progressbar" style={{ width: "70" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" now={projdetail.project_percentage}> {projdetail.project_percentage}% </span> */}
                                        </div>
                                        <p className='donation-count'>2K donations</p>
                                    </span>
                                    </div>

                                    <div className="d-flex justify-content-start">
                                        <>
                                            {/* <Button className=" btn  btn-bordered-white m-0 mr-2" variant="primary" onClick={() => setModalShowrefer(true)}>
                                        Share
                                    </Button> */}
                                            <Button className=" btn  btn-bordered-white m-0 mr-2" variant="primary">
                                                Share
                                            </Button>
                                            {/* <ReferalPopup
                                            id={id}
                                            userRef={userDetail}
                                            show={modalShowrefer}
                                            onHide={() => setModalShowrefer(false)} /> */}
                                        </>

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
                            {/* <div className='progress_main'><span>
                                <span className='nft_price'>{projdetail.selling_amount} raised of {projdetail.price}</span>

                                <div className='progressbar'>
                                    <ProgressBar varient="success" now={projdetail.project_percentage} />
                                 
                                </div>
                            </span>

                            </div> */}
                        </div>

                        <div className='container table-main-detail position-relative'>

                            <ProjdataTable
                                id={id}
                            />
                        </div>

                    </div>

                    {/* <div className='col-12 col-lg-4  mt-5'>
                    <div className='container table-main-detail'>
							
                            <ProjdataTable
                                     id={id}
                            />
                     </div>
				</div> */}

                    <div className='col-12 mt-3'>
                        <div className='container table-detail'>

                            <LatNftdataTable />


                        </div>
                    </div>

                    <div className="col-12 mt-3">
                        {/* <div className='intro row m-0'>
							<div className="intro-content">
								<span >NFTs</span>
								<h3 className="w-full mb-0 pt-4">NFTs</h3>
							</div>
						</div> */}
                        <div className='nfts_main'>
                            <h5 className='user_title'>NFT'S </h5>
                            <div className="row items mt-0 explore-items px-0">

                                <div className='col-12 col-sm-6 col-lg-3 item explore-item'>
                                    <div className='card no-hover m-0 add-nft '>

                                        <div class="image-over relative">
                                            <Link to={`/addnft/${projdetail.id}`}>

                                                + Add NFT </Link>

                                        </div>
                                    </div>
                                </div>


                                {projdetail?.nft_data?.map((x, idx) => {
                                    // {projdetail?.map((item, idx) => {
                                    return (
                                        <div key={`eds_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item ">

                                            <div className="card no-hover m-0">



                                                {/* <i class="fa-sharp fa-solid fa-trash"></i> */}
                                                <div className="image-over relative">
                                                    <Link to={`/nft/details/${x.id}`}>
                                                        <img className="card-img-top" src={x.image} alt="" />
                                                    </Link>
                                                    <div className='token'>
                                                        <span>#{x?.token_id}</span>
                                                        <span className='cards-icons'>
                                                            <i className="fa-solid fa-pen" onClick={() => setModalShowedit(true)}></i>

                                                            <EditNft
                                                                id={id}
                                                                nft_id={x.id}
                                                                show={modalShowedit}
                                                                onHide={() => setModalShowedit(false)} />
                                                        </span>
                                                    </div>
                                                    {/* Author */}

                                                </div>
                                                {/* Card Caption */}
                                                <div className="card-caption px-0 col-12 ">
                                                    {/* Card Body */}
                                                    <div className="card-body">

                                                        <a href="#" className="d-flex justify-content-between align-items-center">
                                                            <h5 className="m-0 pb-2 p-0 text-capitalize">{x.title.slice(0, 16)}...</h5>

                                                        </a>
                                                        <div className='creater mt-1 mb-1'>
                                                            <span >Creator:</span><span className='ml-2'>{x?.user_data?.username}</span>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-end mt-1 mb-1">
                                                            <span dangerouslySetInnerHTML={{ __html: x.description.slice(0, 22) }} /><span>...</span>
                                                        </div>


                                                        <div className='mint'>
                                                            {x.is_mint == 0 ? (

                                                                <button>
                                                                    <a href='#'>Mint</a>
                                                                </button>
                                                            ) : (
                                                                <button disabled>
                                                                    <a >Minted</a>
                                                                </button>
                                                            )}
                                                        </div>

                                                        <div className="card-bottom d-flex justify-content-between">
                                                            {/* <span>{item.price}</span> */}
                                                            {/* <span><i className="icon-heart mr-2" />{item.likes}</span> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );

}

export default ProjNftDetails;