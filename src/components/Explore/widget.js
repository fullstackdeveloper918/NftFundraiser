import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { GetNftwol, GetSettings } from '../../redux/Actions/projectAction';


import { BuyNft } from '../Wallet/interact';

import { useState } from 'react';
import DModal from '../Create/3dModal';
import { GetUserAction } from '../../redux/Actions/authAction';
import CopyToClipboard from 'react-copy-to-clipboard';
import dayjs from 'dayjs';


const Widget = () => {
    const dispatch = useDispatch()

    const slug = useParams();

    const latprojnftdetail = useSelector(state => {
        return state.projectdetails.getnftwoldetails
    })


    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })

    useEffect(() => {
        dispatch(GetUserAction())
        dispatch(GetNftwol(slug))

    }, [slug])
    const [copy, setCopy] = useState(false)

const location = useLocation()

const userprojurl = `http://localhost:3000/referral/widget/${slug.slug}` + `?refid=${latprojnftdetail?.user_data?.wallet_id}`
    return (
        <section className="item-details-area">
            {/* <Spin spinning={loading}> */}
            <div className="container">

                <div className="row justify-content-between content_project px-0">
                    <div className='py-0 col-12 mt-2 mb-2 mt-lg-0 mb-lg-0'>
                        <span Class="title_main " style={{ color: '#fff' }}>{latprojnftdetail.title}  </span>
                    </div>
                    <div className="col-12 col-lg-4">

                        <div className="item-info">

                            <><div className="item-thumb text-center align-items-center d-flex">

                                <>
                                    {latprojnftdetail.extention === "Player" &&
                                        <>
                                            <video
                                                width="100%"
                                                controls
                                                src={latprojnftdetail.image}
                                            />
                                        </>
                                    }
                                    {latprojnftdetail.extention === "modal" &&
                                        <>
                                            <DModal
                                                vdo={latprojnftdetail.image}

                                            />
                                        </>
                                    }
                                    {latprojnftdetail.extention === 'Image' &&
                                        <>

                                            <img src={latprojnftdetail.image} alt="" />
                                        </>
                                    }

                                </>

                            </div>

                            </>

                        </div>
                    </div>

                    <div className="col-12 col-lg-8 mt-4 mt-lg-0">

                        <div className="content ">
                            <div className="card no-hover position-relative">

                                <div className="owner align-items-start">
                                    <span className='boldertext w-100'>Project Name : </span>
                                    <span>{latprojnftdetail.project_name}</span>
                                </div>
                                <div className="owner align-items-start">
                                    <span className='boldertext w-100'>Project Price : </span>
                                    <span>{latprojnftdetail.price}</span>
                                </div>

                                <div className="item-info-list">
                                    <ul className="list-unstyled mb-0">
                                        <span class='boldertext'>End-Date</span>
                                        <span> {dayjs(latprojnftdetail.end_date).format("DD MMM YYYY")}</span>
                                    </ul>
                                </div>
                                <div className="row">

                                    <div className="col-10 p-0">

                                        <div className="form-group m-0">

                                            <input
                                                type="text"
                                                className="form-control"
                                                name="display_name"
                                                value={`https://app.karmatica.io/referral/widget/${slug.slug}`+`?refid=${latprojnftdetail?.user_data?.wallet_id}`}

                                            />


                                        </div>
                                    </div>

                                </div>
                                <div className="col-2 p-0 text-right">
                                <CopyToClipboard text={userprojurl} >
                                    <div className='copy'>

                                        <a> <i className="fa-sharp fa-solid fa-copy" onClick={() => setCopy(true)} onMouseLeave={() => setCopy(false)} disabled={window.ethereum?.selectedAddress && sessionStorage.getItem('authToken') ? false : true}></i></a>
                                    </div>
                                </CopyToClipboard>
                            
                            {copy == true &&
                                <span className='copytext'>Copied!</span>

                            }


                        </div>
                            </div>
                        </div>







                    </div>
                </div >
                </div >


        </section >
    );
}


export default Widget;