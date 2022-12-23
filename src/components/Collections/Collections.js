import React, { Component, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { PopularCollectionAction } from '../../redux/Actions/popularAction';
import { Link } from 'react-router-dom';


const Collections = () => {

    const dispatch = useDispatch()

    const coll = useSelector(state => {
        // 
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
                    {coll.slice(0, 8)?.map((item, idx) => {



                        return (
                            <div key={`cd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                <div className="card no-hover text-center">
                                    <div className="image-over">
                                        <Link to={`/popularcollection/details/${item.id}`}>
                                            <img className="card-img-top" src={item?.image} alt="" />
                                        </Link>
                                        {/* Seller */}
                                        <a className="seller">

                                            {/* <Link to={`/item-details/${item.id}`} className="seller"> */}
                                            <div className="seller-thumb avatar-lg">
                                                <img className="rounded-circle" src={item?.user_data?.avatar} alt="" />
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