import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { useState } from 'react';
import { getPopularCollectiondetails } from '../../redux/Slices/popularCollectionSlice';
import { PopularCollectionActionDetails } from '../../redux/Actions/popularAction';

// console.log(NFTContract.abi,"abi")
const PopularDetails = () => {



    const { id } = useParams();
    // console.log(id, 'idd')
    const populardetail = useSelector(state => {
        // debugger
        return state?.collection.collectiondetail
    })
    console.log(populardetail, 'populardetail')


    const dispatch = useDispatch()


    useEffect(() => {


        dispatch(PopularCollectionActionDetails({ id }))
    }, [dispatch])




    return (

        <section className="item-details-area">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-12 col-md-8 ">
                        <div className="item-info">
                            {/* {latprojdetail?.map((item, key) => ( */}

                            <><div className="item-thumb text-center">
                                <img src={populardetail.image} alt="" />
                            </div><div className="card no-hover countdown-times my-4">
                                    {/* ksdjfksdjbfjsdbf */}
                                    {/* {nftdetail.description} */}
                                    {/* <div className="countdown d-flex justify-content-center" /> */}
                                    <p dangerouslySetInnerHTML={{ __html: populardetail.description }} className="nft-detail-nft" />
                                </div>

                            </>

                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="card no-hover content sm:mt-5 mt-lg-0">
                            <div className='d-flex  align-items-center justify-content-between'>
                                <h3 className="m-0">{populardetail?.title}</h3>

                                <div className='eddlbtton d-flex  align-items-center '>
                                    {/* <a className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2"> <Link to={`/updateproject/${projdetail.projectdetails.id}`} style={{ color: '#FFF' }}>Edit</Link></a>
                                        <a className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-2" onClick={() => deleteHandler(projdetail.projectdetails.id)} style={{ color: '#FFF' }}>Delete</a> */}
                                </div>

                            </div>








                        </div>
                    </div>
                </div>
            </div >

        </section >
    );

}


export default PopularDetails;