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

const ProjDetails = () => {


    const { id } = useParams();
    // console.log(id, 'idd')
    const [tok, setTok] = useState('')
    // console.log('tok', tok)
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = React.useState(false);
    const latprojdetail = useSelector(state => {
        // debugger
        return state.projectdetails.latestprojectdetails
    })
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
        // debugger
        dispatch(LatestProjectDetail(id))
        dispatch(GetUserAction())

    }, [id])




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

                            </div>

                                <div className="card no-hover countdown-times my-4">

                                    <div className="countdown d-flex " dangerouslySetInnerHTML={{ __html: latprojdetail.description }} />
                                </div>

                            </>



                        </div>
                    </div>

                    <div className="col-12 col-lg-4">

                        <div className="card no-hover">
                            <span className='nft_price'>{latprojdetail.selling_amount} raised of {latprojdetail.price}</span>

                            <div className='progressbar'>
                                <ProgressBar varient="success" now={latprojdetail.project_percentage} />
                                {/* <span className="progress-bar bg-success" role="progressbar" style={{ width: "70%" }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" now={latprojdetail.project_percentage}> {latprojdetail.project_percentage}% </span> */}
                            </div>

                            <div className="content sm:mt-5 mt-lg-0">
                                <div className="item-info-list">
                                    <ul className="list-unstyled viewproduct-detail">
                                        <li> <span>Owned By : </span> <span> Organization name</span></li>
                                        <li className="price d-flex">
                                            <span>Current Price : </span><span>{latprojdetail.price} MATIC</span>
                                        </li>

                                        <li>
                                            <span>Number of NFTs Minted :  </span><span>{latprojdetail.number_of_nft}</span>
                                        </li>
                                    </ul>
                                </div>
                                {userDetail !== null && (

                                    <><Button variant="primary" onClick={() => setModalShow(true)}>
                                        Share
                                    </Button><MyVerticallyCenteredModal
                                            id={id}
                                            userRef={userDetail}
                                            show={modalShow}
                                            onHide={() => setModalShow(false)} /></>
                                )}





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