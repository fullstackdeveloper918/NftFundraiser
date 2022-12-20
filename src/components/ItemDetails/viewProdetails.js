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

const ProjDetails = () => {


    const { id } = useParams();
    // console.log(id, 'idd')
    const [tok, setTok] = useState('')
    // console.log('tok', tok)
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = React.useState(false);
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


    return (
        // <section className="item-details-area">
        //     <div className="container">
        //         <div className='row py-0'>

        //         </div>

        //         <div className="row justify-content-between px-0">
        //             <div className="col-12 col-lg-4">
        //                 <div className="item-info">

        //                     <><div className="item-thumb text-center">
        //                         {latprojdetail && latprojdetail?.nft_data && latprojdetail?.nft_data?.length ?
        //                             <img src={latprojdetail.nft_data[0].image} alt="first nft" />
        //                             : null}

        //                     </div>



        //                     </>



        //                 </div>
        //             </div>

        //             <div className="col-12 col-lg-8">
        //                 <span Class="title_main ">{latprojdetail.title}</span>
        //                 <div className="card mt-3 no-hover">
        //                     <span className='nft_price'>{latprojdetail.selling_amount} raised of {latprojdetail.price}</span>

        //                     <div className='progressbar'>
        //                         <ProgressBar varient="success" now={latprojdetail.project_percentage} />
        //                         {/* <span className="progress-bar bg-success" role="progressbar" style={{ width: "70%" }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" now={latprojdetail.project_percentage}> {latprojdetail.project_percentage}% </span> */}
        //                     </div>

        //                     <div className="content sm:mt-5 mt-lg-0">
        //                         <div className="item-info-list">
        //                             <ul className="list-unstyled viewproduct-detail">
        //                                 <li> <span>Owned By : </span> <span> Organization name</span></li>
        //                                 <li className="price d-flex">
        //                                     <span>Current Price : </span><span>{latprojdetail.price} MATIC</span>
        //                                 </li>

        //                                 <li>
        //                                     <span>Number of NFTs Minted :  </span><span>{latprojdetail.number_of_nft}</span>
        //                                 </li>
        //                             </ul>
        //                         </div>
        //                         {userDetail !== null && (

        //                             <><Button variant="primary" onClick={() => setModalShow(true)}>
        //                                 Share
        //                             </Button><MyVerticallyCenteredModal
        //                                     id={id}
        //                                     userRef={userDetail}
        //                                     show={modalShow}
        //                                     onHide={() => setModalShow(false)} /></>
        //                         )}





        //                     </div>
        //                 </div>
        //             </div>


        //             <div class="col-12 description mt-3 ">
        //                 <h3 > Description</h3>
        //                 <div className="card no-hover countdown-times">

        //                     <div className="countdown d-flex " dangerouslySetInnerHTML={{ __html: latprojdetail.description }} />
        //                 </div>
        //             </div>

        //             <ProjNFTS />




        //         </div>
        //     </div >
        // </section >
        <section className="item-details-area project-nft-si main-proj-detail">
            <div className="container">
                <div className="row justify-content-between p-0">

                    <div className="col-12 col-lg-12 relative">
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
                        {/*                    
                             <div className="item-info" >

                                 <><div className="item-thumb text-center">
                                     <img src={x[0]?.image} alt="" />
                                 </div>


                                 </>


                             </div> */}
                        <div className="project_img">
                            <img class="avatar-sm rounded-circle" src={latprojdetail?.user_data?.avatar} alt="" />
                        </div>

                    </div>

                    <div className="cart col-12 col-lg-12 content-baner mt-md-5">
                        <div className="content mt-5 mt-lg-0">
                            <div className='align-items-center justify-content-between'>
                                <div className='d-sm-flex justify-content-between align-items-center'>
                                    <h3 className="m-0 p-0">{latprojdetail.title}</h3>
                                    <h5 className="detail_url"><a >{latprojdetail?.user_data?.username}</a></h5>
                                </div>
                                <div className='project-total-detail pt-3 pb-4'>

                                    {/* <div>
                                        <span>Owned By:</span> <span>{latprojdetail?.user_data?.username}</span>
                                    </div>
                                    <div>
                                        <span>Total NFT's:</span><span>{latprojdetail?.number_of_nft}</span>
                                    </div> */}
                                    <div>
                                        <span>Chain: </span><span>Polygon (Matic)</span>
                                    </div>

                                    <div>
                                        <span>Created : </span><span>{dayjs(latprojdetail?.created_at).format("DD MMM YYYY")}</span>
                                    </div>
                                </div>
                                <div>

                                    <h5 className='user_title'><div>Project Detail</div>
                                        {/* <i class="fa-solid fa-pen" ></i>
                                                 <i class="fa-sharp fa-solid fa-trash"></i> */}

                                        {/* {latprojdetail?.status == 1 && (
                                            <div >

                                                <a className=""> <Link to={`/updateproject/${latprojdetail.id}`} style={{ color: '#FFF' }}> <i class="fa-solid fa-pen" ></i></Link></a>
                                                <a className="" onClick={() => deleteHandler(latprojdetail.id)} style={{ color: '#FFF' }}> <i class="fa-sharp fa-solid fa-trash"></i>
                                                </a>
                                            </div>
                                        )} */}
                                    </h5>
                                </div>

                            </div>
                            {/* footer?.footer?.description }} */}
                            <p dangerouslySetInnerHTML={{ __html: latprojdetail.description }} />



                        </div>

                    </div>

                    {/* <CollItem /> */}
                </div>
            </div>
            <br />
            <br />
            <br />
            <div className='container table-detail'>
                <div className='col-12'>
                    <LatNftdataTable />
                </div>

            </div>
            <div>
                <span className='nft_price'>{latprojdetail.selling_amount} raised of {latprojdetail.price}</span>

                <div className='progressbar'>
                    <ProgressBar varient="success" now={latprojdetail.project_percentage} />
                    {/* <span className="progress-bar bg-success" role="progressbar" style={{ width: "70%" }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" now={latprojdetail.project_percentage}> {latprojdetail.project_percentage}% </span> */}
                </div>
            </div>

            <div className="container mt-5">

                <div className="row items mt-0 explore-items px-0">
                    <ProjNFTS />


                </div>
            </div>
        </section>
    );

}

export default ProjDetails;