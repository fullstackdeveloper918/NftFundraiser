import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { DeleteProject, GetCollectionDetails, ProjectDetail } from '../../redux/Actions/projectAction';
import { getProjectDetail } from '../../redux/Slices/projectSlice';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Author from '../Author/Author';
import CollItem from './bread-crumb';
import { LatestProjectDetail } from './../../redux/Actions/projectAction';

const ProjNftDetails = () => {

    const deleteHandler = (id) => {
        dispatch(DeleteProject(id))
    }

    const { id } = useParams();
    // console.log(id, 'idd')
    const [modalShow, setModalShow] = React.useState(false);

    const dispatch = useDispatch()

    const projdetail = useSelector(state => {
        // debugger
        return state?.projectdetails?.projectdetails
    })
    console.log(projdetail, 'projdata')

    useEffect(() => {
        // debugger
        dispatch(ProjectDetail(id))
    }, [id])


    // const deleteHandler = (id) => {
    //     dispatch(DeleteProject(id))
    // }
    // debugger

    return (
        <section className="item-details-area">
            <div className="container">
                <div className="row justify-content-between">

                    <div className="col-12 col-lg-12">
                        <div className="item-info" >

                            <div className="item-thumb text-center">
                                {projdetail && projdetail?.nft_data && projdetail?.nft_data?.length ?

                                    <img src={projdetail.nft_data[0].image} alt="first nft" />
                                    : null}

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

                    <div className="col-12 col-lg-6">
                        <div className="content mt-5 mt-lg-0">
                            <div className='d-flex  align-items-center justify-content-between'>
                                <h3 className="m-0">{projdetail.title}</h3>



                            </div>
                            <p>{projdetail.description}</p>



                        </div>

                    </div>
                    {projdetail?.status == 0 && (
                        <div className='eddlbtton d-flex  align-items-center px-2'>

                            <a className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2"> <Link to={`/updateproject/${projdetail.id}`} style={{ color: '#FFF' }}>Edit</Link></a>
                            <a className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-2" onClick={() => deleteHandler(projdetail.id)} style={{ color: '#FFF' }}>Delete</a>
                        </div>
                    )}
                    {/* <CollItem /> */}
                </div>
            </div>


            <div className="container">

                <div className="row items explore-items px-2">
                    <span>NFT'S</span>
                    {projdetail?.nft_data?.map((x, idx) => {
                        // {projdetail?.map((item, idx) => {
                        return (
                            <div key={`eds_${idx}`} className="col-12 col-md-3 item explore-item">
                                <div className="card no-hover my-2">
                                    <div className="image-over">
                                        <Link to={`/nft/details/${x.id}`}>
                                            <img className="card-img-top" src={x.image} alt="" />
                                        </Link>
                                        {/* Author */}

                                    </div>
                                    {/* Card Caption */}
                                    <div className="card-caption col-12 ">
                                        {/* Card Body */}
                                        <div className="card-body">
                                            <a href="#">
                                                <h5 className="mb-2">{x.title}</h5>
                                            </a>
                                            <span>{x.description}</span>

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
        </section>
    );

}

export default ProjNftDetails;