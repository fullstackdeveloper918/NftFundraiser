import React, { Component, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { PopularCollectionAction } from '../../redux/Actions/popularAction';
import { Link } from 'react-router-dom';


const Collections = () => {

    const dispatch = useDispatch()

    const coll = useSelector(state => {
        // debugger
        return state?.collection?.collection
    })
    console.log(coll, "coll")
    useEffect(() => {

        dispatch(PopularCollectionAction({}))
    }, [dispatch])
    return (
        <section className="popular-collections-area">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>POPULAR</span>
                                <h3 className="mt-3 mb-0">Popular Collections</h3>
                            </div>
                            <div className="intro-btn">
                                <Link className="btn content-btn text-left" to="/allcollections">Explore More</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row items">
                    {coll.slice(1, 9)?.map((item, idx) => {



                        return (
                            <div key={`cd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                <div className="card no-hover text-center">
                                    <div className="image-over">
                                        <Link to={`/item-details/${item.id}`}>
                                            <img className="card-img-top" src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' alt="" />
                                        </Link>
                                        {/* Seller */}
                                        <a className="seller">
                                            {/* <Link to={`/item-details/${item.id}`} className="seller"> */}
                                            <div className="seller-thumb avatar-lg">
                                                <img className="rounded-circle" src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' alt="" />
                                            </div>
                                        </a>
                                    </div>
                                    {/* Card Caption */}
                                    <div className="card-caption col-12 p-0">
                                        {/* Card Body */}
                                        <div className="card-body mt-4">
                                            <Link to={`/item-details/${item.id}`}>
                                                <h5 className="mb-2">{item.title}</h5>
                                            </Link>
                                            <span>{item.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        )
                    })}


                </div>
            </div>
        </section>
    );
}


export default Collections;