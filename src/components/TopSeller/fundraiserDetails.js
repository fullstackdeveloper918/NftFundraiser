import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { TopFundraiserDetail } from '../../redux/Actions/fundraiserAction';
import { GetfundraiserProject } from '../../redux/Actions/projectAction';
import { Link } from 'react-router-dom';
import FunddataTable from './fundraiserdetail';
import FundTransdataTable from './fundPaymenttable';
import ReadMore from '../../readMore';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import EditName from './Edit-organization/editName';
import EditBanner from './Edit-organization/editBanner';
import { GetUserAction } from '../../redux/Actions/authAction';
import DescEdit from './Edit-organization/descEdit';
import EditLogo from './Edit-organization/logoEdit';

const FundraiserDetail = () => {
    const { user_id } = useParams()
    // const id = useParams()
    // const { id } = useParams()
    const dispatch = useDispatch()
    const [modalShoweditfund, setModalShoweditfund] = React.useState(false);
    const [modalShoweditfundimg, setModalShoweditfundimg] = React.useState(false);
    const [modalShoweditfunddes, setModalShoweditfunddesc] = React.useState(false);
    const [modalShoweditfundlogo, setModalShoweditfundlogo] = React.useState(false);
    const funddetail = useSelector(state => {
        return state?.fundraiser?.fundraiserdetail
    })
    // console.log(funddetail, 'fdddetail')
    const fundprojdetail = useSelector(state => {
        // 
        return state?.projectdetails?.getfundProjDetails
    })
    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })
    const userDetail = userdet.referrer_id

    useEffect(() => {
        dispatch(GetUserAction())
        dispatch(TopFundraiserDetail(user_id))
        dispatch(GetfundraiserProject(user_id))

    }, [dispatch, user_id])

    const investHandler = () => {

        if (!window.ethereum?.selectedAddress) {
            Swal.fire({
                icon: 'warning',
                html:
                    'Connect Wallet to Invest',
                showCloseButton: false,
                focusConfirm: false,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Ok!',
                confirmButtonAriaLabel: 'Thumbs up, great!',

            })
        }
    }
    return (
        <section className="item-details-area fundraise-main">
            <div className="container">

                <div className="row justify-content-between p-0">
                    <div className='col-12'>
                        <div className='nft-edit-icon'>
                            <span className='title_main'>{funddetail?.organization_detail?.organization_name}</span>
                            {funddetail?.user_id === userDetail?.user_id &&
                            <i className="fa-solid fa-pen " onClick={(e) => {
                                // setNftID(slug)

                                setModalShoweditfund(true)
                            }
                            } ></i>
                        }
                            <EditName
                                // id={projslug}
                                // nft_id={nftId}
                                show={modalShoweditfund}
                                onHide={() => setModalShoweditfund(false)} />

                        </div>
                    </div>
                    <div className="col-12 col-lg-8">
                        <div className="item-info">

                            <div className="item-thumb text-center">
                                <div>
                                    {funddetail?.user_id === userDetail?.user_id &&
                                    <i class="fa-solid fa-pen-to-square item-thumb-edit" onClick={() =>
                                        setModalShoweditfundimg(true)}></i>
                                    }
                                    <EditBanner
                                        show={modalShoweditfundimg}
                                        onHide={() => setModalShoweditfundimg(false)} />
                                </div>
                                <img src={funddetail?.organization_detail?.banner_image} alt="" />
                                {/* <img src="/img/ph.jpg" /> */}
                                {/* <img src='/img/ph.jpg' alt="" /> */}
                            </div>

                        </div>
                        <div className='lorem_done edit_icon_des mt-3'>
                     
                           
                  
                           <img src={userdet?.organization_detail?.logo} width="32px" height="32px" viewBox="0 0 24 24" fill="none"  alt='' />

                            <span className='cutom_dis'> {funddetail?.organization_detail?.organization_name} is organizing this fundraiser. </span>
                            <div>
                            {funddetail?.user_id === userDetail?.user_id &&
                            <i className="fa-solid fa-pen-to-square" onClick={() =>
                                setModalShoweditfundlogo(true)}></i>
                            }
                            <EditLogo
                                show={modalShoweditfundlogo}
                                onHide={() => setModalShoweditfundlogo(false)} />
                        </div>
                        </div>
                        <br />

                        <div className="progress_nft mobile_nft mb-3">
                            <div className='progress_main'><span>
                                <span className='nft_price'>${funddetail.total_fundraised} Cdn raised from all projects</span><small> </small>
                            </span>
                                <li className="price d-flex justify-content-between progressbar progress">
                                    <span className="progress-bar bg-success" role="progressbar" style={{ width: "70%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></span>

                                </li>
                            </div>


                            <h5 class="user_title_1 mt-3 mb-0"><div>Projects</div></h5>
                            <ul className="m-0 custom_lis pl-0 fund_row">
                                {fundprojdetail && fundprojdetail.length ?
                                    [...new Map(fundprojdetail.map(item =>
                                        [item["title"], item])).values()]?.slice(0, 3)?.map((item, idx) => {
                                            const date1 = new Date(item.created_at)
                                            const date2 = new Date()
                                            // console.log('todat', date2)
                                            const time_difference = date2.getTime() - date1.getTime();
                                            const days_difference = Math.ceil(time_difference / (1000 * 60 * 60 * 24));
                                            // const totaldays = days_difference.slice(0,1)
                                            // console.log("daysss", days_difference)
                                            return (
                                                <li>
                                                    <div className='lorem_done p-0'>
                                                        <span><svg width="32px" height="32px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" mirror-in-rtl="true">
                                                            <path fill="#494c4e" d="M8 6H5c-.553 0-1-.448-1-1s.447-1 1-1h3c.553 0 1 .448 1 1s-.447 1-1 1zM13 10H5c-.553 0-1-.448-1-1s.447-1 1-1h8c.553 0 1 .448 1 1s-.447 1-1 1zM13 14H5c-.553 0-1-.448-1-1s.447-1 1-1h8c.553 0 1 .448 1 1s-.447 1-1 1z" />
                                                            <path fill="#494c4e" d="M18 2v8c0 .55-.45 1-1 1s-1-.45-1-1V2.5c0-.28-.22-.5-.5-.5h-13c-.28 0-.5.22-.5.5v19c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5V21c0-.55.45-1 1-1s1 .45 1 1v1c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0h14c1.1 0 2 .9 2 2z" />
                                                            <path fill="#494c4e" d="M23.87 11.882c.31.54.045 1.273-.595 1.643l-9.65 5.57c-.084.05-.176.086-.265.11l-2.656.66c-.37.092-.72-.035-.88-.314-.162-.278-.09-.65.17-.913l1.907-1.958c.063-.072.137-.123.214-.167.004-.01.012-.015.012-.015l9.65-5.57c.64-.37 1.408-.234 1.72.305l.374.65z" />
                                                        </svg>

                                                        </span>
                                                        <span><div className="progress_name">{item.title} </div> <div>{days_difference} days ago</div></span>
                                                    </div>
                                                </li>


                                            )
                                        }) :
                                    <div className="col-12 col-sm-12 col-lg-12">

                                        <span className='allproj2'>
                                            No Projects
                                        </span>

                                    </div>
                                }
                            </ul>
                            <Link className="" to="/all/LatestProjects"><p className='see_all'>See all</p></Link>

                        </div>


                        <div className='custam_col mt-3 mt-lg-0'>
                            <h5 class="user_title justify-content-between">

                                <div className='d-flex align-items-center gap-5'> <div><svg width="24px" fill="#fff" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z stroke=" /><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z" /></svg></div><div>Description</div></div>
                                <div >
                                {funddetail?.user_id === userDetail?.user_id &&
                                    <i className="fa-solid fa-pen" onClick={() =>
                                        setModalShoweditfunddesc(true)}></i>
                                    }
                                    <DescEdit
                                        show={modalShoweditfunddes}
                                        onHide={() => setModalShoweditfunddesc(false)} />
                                </div>
                            </h5>

                            <div className=" no-hover">
                                {/* <span className="mt-0 mb-2" dangerouslySetInnerHTML={{ __html: funddetail?.organization_detail?.description }} /> */}
                                <ReadMore data={funddetail?.organization_detail?.description} />
                                <div className="price d-flex justify-content-between align-items-center">
                                </div>
                            </div>
                        </div>

                        <div className='funddeatil mt-3 '>

                            <FunddataTable />
                        </div>
                    </div>

                    <div className="col-12 col-lg-4 desktop_nft">
                        <div className="progress_nft  mb-3">
                            <div className='progress_main'><span>
                                <span className='nft_price'>${funddetail.total_fundraised} Cdn raised from all projects</span><small> </small>
                            </span>

                                <li className="price d-flex justify-content-between progressbar progress">
                                    <span className="progress-bar bg-success" role="progressbar" style={{ width: "100%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></span>

                                </li>
                                {/* <div className='progressbar'>
                                            <ProgressBar varient="success" />
                                            <span className="progress-bar bg-success" role="progressbar" style={{ width: "70" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" now={projdetail.project_percentage}> {projdetail.project_percentage}% </span>
                                        </div> */}

                                {/* <div className='progressbar'>
                                        <ProgressBar varient="success" now={latprojdetail.project_percentage} />
                                        <span className="progress-bar bg-success" role="progressbar" style={{ width: "70" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" now={projdetail.project_percentage}> {projdetail.project_percentage}% </span>
                                    </div> */}

                            </div>

                            <div className="d-flex gap-5 flex-wrap justify-content-start">

                                <div>

                                    <Button variant="primary" onClick={() => investHandler()} className=" btn  btn-bordered-white m-0 mr-2">
                                        Invest
                                    </Button>

                                </div>





                            </div>

                            <h5 class="user_title_1 mt-3 mb-0"><div>Projects</div></h5>

                            <ul className="m-0 custom_lis pl-0 fund_row">
                                {fundprojdetail && fundprojdetail.length &&
                                    [...new Map(fundprojdetail.map(item =>
                                        [item["title"], item])).values()]?.slice(0, 3)?.map((item, idx) => {
                                            const date1 = new Date(item.created_at)
                                            const date2 = new Date()
                                            // console.log('todat', date2)
                                            const time_difference = date2.getTime() - date1.getTime();
                                            const days_difference = Math.ceil(time_difference / (1000 * 60 * 60 * 24));
                                            // const totaldays = days_difference.slice(0,1)
                                            // console.log("daysss", days_difference)
                                            return (
                                                <li>
                                                    <div className='lorem_done p-0'>
                                                        <span><svg width="32px" height="32px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" mirror-in-rtl="true">
                                                            <path fill="#494c4e" d="M8 6H5c-.553 0-1-.448-1-1s.447-1 1-1h3c.553 0 1 .448 1 1s-.447 1-1 1zM13 10H5c-.553 0-1-.448-1-1s.447-1 1-1h8c.553 0 1 .448 1 1s-.447 1-1 1zM13 14H5c-.553 0-1-.448-1-1s.447-1 1-1h8c.553 0 1 .448 1 1s-.447 1-1 1z" />
                                                            <path fill="#494c4e" d="M18 2v8c0 .55-.45 1-1 1s-1-.45-1-1V2.5c0-.28-.22-.5-.5-.5h-13c-.28 0-.5.22-.5.5v19c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5V21c0-.55.45-1 1-1s1 .45 1 1v1c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0h14c1.1 0 2 .9 2 2z" />
                                                            <path fill="#494c4e" d="M23.87 11.882c.31.54.045 1.273-.595 1.643l-9.65 5.57c-.084.05-.176.086-.265.11l-2.656.66c-.37.092-.72-.035-.88-.314-.162-.278-.09-.65.17-.913l1.907-1.958c.063-.072.137-.123.214-.167.004-.01.012-.015.012-.015l9.65-5.57c.64-.37 1.408-.234 1.72.305l.374.65z" />
                                                        </svg>

                                                        </span>
                                                        <span><div className="progress_name">{item.title} </div> <div>{days_difference} days ago</div></span>
                                                    </div>
                                                </li>


                                            )
                                        })}
                            </ul>
                            <Link className="" to={`/all/fundraise/projects/${user_id}`}><p className='see_all'>See all</p></Link>
                        </div>
                        <div className="content mt-5 mt-lg-0">
                            {/* <h3 className="m-0">{this.state.initData.title}</h3> */}
                            {/* <p>{this.state.initData.content}</p> */}
                            <div className="owner d-flex align-items-center">

                                <a className="owner-meta d-flex align-items-center ml-3" href="/author">
                                    {/* <img className="avatar-sm rounded-circle" src={this.state.initData.ownerImg} alt="" /> */}
                                    {/* <h6 className="ml-2"></h6> */}

                                </a>
                            </div>

                            {/* <div className="item-info-list">

                                <ul className="list-unstyled">

                                    <div className="custam_col no-hover">
                                        <h5 class="user_title"><div>Projects</div></h5>
                                        

                                        {fundprojdetail && fundprojdetail.length &&
                                            [...new Map(fundprojdetail.map(item =>
                                                [item["title"], item])).values()]?.slice(0, 4)?.map((item, idx) => {
                                                    const date1 = new Date(item.created_at)
                                                    const date2 = new Date()
                                                    const time_difference = date2.getTime() - date1.getTime();
                                                    const days_difference = Math.ceil(time_difference / (1000 * 60 * 60 * 24));
                                                    console.log("daysss", days_difference)
                                                    return (

                                                        <>
                                                            <ul className="project_back">
                                                                <li className='item_title'>
                                                                    {item.title}
                                                                </li><li className='item_created'>
                                                                    {days_difference} days ago
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




                            </div> */}

                        </div>
                    </div>
                </div>
                {/* <div className='row'>
                    <div className='col-12 col-md-8'>

                    </div>
                    <div className='col-12 col-md-4'>

                    </div>
                </div> */}

                <div className=''>
                    {/* <div className='col-7'>
                        <div className='funddeatil'>

                            <FunddataTable />
                        </div>
                    </div> */}
                    <div className='col-12 mt-3 mb-3'>
                        <div className='funddeatil table-detail '>
                            <FundTransdataTable />

                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </section >
    );
}
// }

export default FundraiserDetail;