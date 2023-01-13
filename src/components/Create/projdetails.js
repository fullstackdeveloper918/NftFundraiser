import dayjs from 'dayjs';
import React, { Component, useEffect, useState } from 'react';
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
import ReadMore from '../../readMore';
import { GetMatic } from '../ItemDetails/GetMAtic';
import ReferalPopup from '../ItemDetails/refralPopup';

// import ProgressBar from 'react-bootstrap';

const ProjNftDetails = () => {
    // const deleteHandler = (id) => {
    //     dispatch(DeleteProject(slug))
    // }

    const { slug } = useParams()
    // console.log(id, 'idd')
    const latprojdetail = useSelector(state => {
        // 
        return state.projectdetails.latestprojectdetails
    })
    const [matic, setmatic] = useState('')
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowedit, setModalShowedit] = React.useState(false);
    const [nftId, setNftID] = useState();
    console.log('nftid', nftId)
    const [modalShowadd, setModalShowadd] = React.useState(false);
    const [modalShowrefer, setModalShowrefer] = React.useState(false);
    const dispatch = useDispatch()
    const [modalShowDes, setModalShowDes] = React.useState(false);
    const projdetail = useSelector(state => {
        // 
        return state?.projectdetails?.projectdetails
    })
    console.log(projdetail?.nft_data && projdetail?.nft_data && projdetail?.nft_data.length && projdetail?.nft_data[0]?.is_mint, 'projdata')


    useEffect((event) => {
        (GetMatic(setmatic))
        // event.preventDefault()
        dispatch(ProjectDetail(slug))
    }, [slug])
    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })
    const userDetail = userdet.referrer_id

    // const deleteHandler = (id) => {
    //     dispatch(DeleteProject(id))
    // }
    // 
    const bannerHandler = () => {

    }

    return (

        <section className="item-details-area project-nft-si main-proj-detail ">
            <div className="container">

                <div className="row justify-content-between p-0">
                    <div className='col-12'>
                        <span className="my-2 p-0 title_main">{projdetail.title}</span>
                    </div>

                    <div className='col-12 col-lg-8'>
                        <div className="item-info" >
                            <div className="item-thumb text-center">
                                {/* {projdetail && projdetail?.nft_data && projdetail?.nft_data?.length ? */}
                                <div>
                                    <i class="fa-solid fa-pen-to-square item-thumb-edit" onClick={() =>
                                        setModalShow(true)}></i>
                                    <Banner
                                        id={slug}
                                        show={modalShow}
                                        onHide={() => setModalShow(false)} />
                                </div>
                                <img src={projdetail?.image} alt="first nft" />
                                {/* : null} */}
                            </div>
                        </div>

                        <div className="fundraiser mt-4 p-0">
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


                    <div className='col-12 col-lg-4 mt-3 mt-lg-0'>
                        <div className='progress_nft_main'>
                            <div >
                                <div className="progress_nft mb-3">
                                    <div className='progress_main'><span>
                                        {/* ({Number(projdetail.project_count) * Number(matic['matic-network']?.cad)} of {Number(projdetail.price) * Number(Math.round(matic['matic-network']?.cad))} MATIC ) */}
                                        <span className='nft_price'> {Number(projdetail.project_count) * Number(matic['matic-network']?.cad)} raised of ${Number(projdetail.price) * Number(Math.round(matic['matic-network']?.cad))} Cdn </span>
                                        <div>
                                            {/* <span className='nft_price'>{projdetail.project_count} raised of ${projdetail.price} Cdn </span> */}
                                            <span className='nft_price'>({projdetail.project_count} of {projdetail.price} MATIC )</span>

                                        </div>
                                        <div className='progressbar'>
                                            <ProgressBar varient="success" now={projdetail.project_percentage} />
                                            {/* <span className="progress-bar bg-success" role="progressbar" style={{ width: "70" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" now={projdetail.project_percentage}> {projdetail.project_percentage}% </span> */}
                                        </div>
                                        <p className='donation-count'>${projdetail.project_count} Cdn RAISED</p>
                                    </span>
                                    </div>

                                    <div className="d-flex justify-content-start">
                                        <Button variant="primary" className=" btn mr-2 btn-bordered-white m-0">
                                            Invest
                                        </Button>
                                        <>
                                            {projdetail?.nft_data && projdetail?.nft_data && projdetail?.nft_data.length > 0 && projdetail?.nft_data[0]?.is_mint == 0 ? (

                                                <Button className=" btn  btn-bordered-white m-0 mr-2" variant="primary">
                                                    Share
                                                </Button>
                                            ) : (
                                                <><Button className=" btn  btn-bordered-white m-0 mr-2" onClick={() => setModalShowrefer(true)} variant="primary">
                                                    Share
                                                </Button><ReferalPopup
                                                        id={slug}
                                                        userRef={userDetail}
                                                        show={modalShowrefer}
                                                        onHide={() => setModalShowrefer(false)} /></>

                                            )}
                                        </>



                                    </div>
                                    {projdetail?.user_invest && projdetail?.user_invest?.length ?
                                        [...new Map(projdetail?.user_invest?.slice(0, 3)?.map(item =>
                                            [item["title"], item])).values()].map((item, idx) => {

                                                // {projdetail.user_invest?.slice(0, 3)?.map((items) => {
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
                                                                    <path d="M12 12C13.2416 12 14.248 10.9926 14.248 9.75C14.248 8.50736 13.2416 7.5 12 7.5C10.7584 7.5 9.75197 8.50736 9.75197 9.75C9.75197 10.9926 10.7584 12 12 12Z" stroke="#4528dc" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                    <path d="M14.9974 14.25C16.6528 14.25 17.9737 15.7453 16.8057 16.9195C15.703 18.0281 13.9431 18.75 12 18.75C10.0569 18.75 8.29702 18.0281 7.19428 16.9195C6.02632 15.7453 7.34722 14.25 9.00262 14.25L14.9974 14.25Z" stroke="#4528dc" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                </svg>
                                                                </span>
                                                                <span><div className="progress_name">{item.username} </div> <div>${item.price} Cdn / 40 MATIC ({days_difference} days ago)</div></span>
                                                            </div>
                                                        </li>


                                                    </ul>
                                                )
                                            }) :
                                        <div className="col-12 col-sm-12 text-center col-lg-12 mt-2 mb-2">

                                            <span className='allproj2 boldertext w-100'>
                                                No user has invested yet
                                            </span>

                                        </div>
                                    }




                                    <p className='see_all'>See all</p>
                                </div>
                            </div>
                        </div>



                    </div>

                    <div className='col-12 col-lg-8 mt-4'>
                        <div class="user-description">

                            <h5 className='user_title justify-content-between'>

                                <div className='d-flex align-items-center gap-5'> <div><svg width="24px" fill="#fff" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z stroke=" /><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z" /></svg></div><div>Description</div></div>
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
                                        id={slug}
                                        show={modalShowDes}
                                        onHide={() => setModalShowDes(false)} />
                                </div>
                            </h5>
                            <ReadMore data={projdetail.description} />
                            {/* <p dangerouslySetInnerHTML={{ __html: projdetail.description }} /> */}
                        </div>
                    </div>

                    <div className='col-12 col-lg-4 mt-4'>
                        <div className='container table-main-detail position-relative'>

                            <ProjdataTable
                                id={slug}
                            />
                        </div>
                    </div>

                </div>

                <div className='col-12 mt-4'>
                    <div className='container table-detail'>

                        <LatNftdataTable />


                    </div>
                </div>
                <div className="col-12 mt-4">

                    <div className='nfts_main'>
                        <div className='intro row m-0 p-0'>
                            <div className="intro-content">
                                <span >NFTs</span>
                                <h3 className="w-full mb-0 pt-4">NFTs</h3>
                            </div>
                        </div>
                        <div className="row items mt-0 explore-items px-0">
                            <div className='col-12 col-sm-6 col-lg-3 item explore-item'>
                                <div className='card no-hover m-0 add-nft '>
                                    {projdetail.number_of_nft == projdetail?.nft_data?.length ? (

                                        <div class="image-over relative">




                                            <span>No NFT left to add</span>


                                        </div>
                                    ) : (
                                        <div class="image-over relative">



                                            <Link to={`/addnft/${projdetail.id}`}>

                                                + Add NFT </Link>



                                        </div>

                                    )}
                                </div>
                            </div>


                            {projdetail?.nft_data?.map((x, idx) => {
                                // {projdetail?.map((item, idx) => {
                                // const image_preview = URL.revokeObjectURL(x.preview_imag)
                                return (
                                    <div key={`eds_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item ">

                                        <div className="card no-hover m-0">



                                            {/* <i class="fa-sharp fa-solid fa-trash"></i> */}
                                            <div className="image-over relative">
                                                <Link to={`/nft/details/${x.slug}`}>
                                                    {x.extention === 'mp4' || x.extention === 'modal' ? (

                                                        <img className="card-img-top" src={x.preview_imag} alt="" />
                                                    ) : (
                                                        <img className="card-img-top" src={x.image} alt="" />
                                                    )}
                                                </Link>
                                                <div className='token'>
                                                    <span>#{x?.token_id}</span>
                                                    <span className='cards-icons'>
                                                        {x.is_mint == 0 &&

                                                            <div>
                                                                <i className="fa-solid fa-pen" onClick={(e) => {
                                                                    setNftID(x.slug)
                                                                    e.preventDefault();
                                                                    setModalShowedit(true)
                                                                }
                                                                } ></i>
                                                                {modalShowedit &&

                                                                    <EditNft
                                                                        // debugger
                                                                        id={slug}
                                                                        nft_id={nftId}
                                                                        show={modalShowedit}
                                                                        onHide={() => setModalShowedit(false)} />
                                                                }
                                                            </div>
                                                        }
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
                                                    {/* <div className='creater mt-1 mb-1'>
                                                        <span >Creator:</span><span className='ml-2'>{x?.user_data?.username}</span>
                                                    </div> */}
                                                    <div className="d-flex justify-content-between align-items-end mt-1 mb-1">
                                                        <span dangerouslySetInnerHTML={{ __html: x.description.slice(0, 52) }} /><span>...</span>
                                                    </div>


                                                    <div className='mint'>
                                                        {x.is_mint == 0 ? (

                                                            <button>
                                                                <Link to={`/nft/details/${x.slug}`}>Mint</Link>
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

        </section>
    );

}

export default ProjNftDetails;