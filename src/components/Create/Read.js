import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProjectList } from '../../redux/Actions/projectAction';




const Read = () => {

    // const [projc, setProjc] = useState([])
    // console.log(projc, 'projc')
    const dispatch = useDispatch()
    const proj = useSelector(state => {
        return state.getproject
        // setProjc(proj)
    })

    // console.log(proj.projects, 'projects')

    useEffect(() => {
        dispatch(ProjectList())
    }, [])

    return (
        <section className="live-auctions-area">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>Auctions</span>
                                <h3 className="mt-3 mb-0">Live Auctions</h3>
                            </div>
                            <div className="intro-btn">
                                <a className="btn content-btn" href="/auctions">View All</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="auctions-slides">
                    <div className="swiper-container slider-mid items">
                        <div className="swiper-wrapper">
                            {/* Single Slide */}
                            {proj?.projects?.map((item, idx) => (
                                <div key={`auc_${idx}`} className="swiper-slide item">
                                    <div className="card">
                                        <div className="image-over">
                                            <Link to={`/item-details/${item.id}`}>
                                                <img className="card-img-top" src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' alt="" />
                                            </Link>
                                        </div>
                                        {/* Card Caption */}
                                        <div className="card-caption col-12 p-0">
                                            {/* Card Body */}
                                            <div className="card-body">
                                                <div className="countdown-times mb-3">
                                                    <div className="countdown d-flex justify-content-center" data-date={item.start_date} />
                                                </div>
                                                <a href="/item-details">
                                                    <h5 className="mb-0">{item.title}</h5>
                                                </a>
                                                <a className="seller d-flex align-items-center my-3" href="/item-details">
                                                    <img className="avatar-sm rounded-circle" src='https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' alt="" />
                                                    <span className="ml-2">{item.description}</span>
                                                </a>
                                                <div className="card-bottom d-flex justify-content-between">
                                                    <span>{item.price}</span>
                                                    <span>{item.count}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                            )}
                        </div>
                        <div className="swiper-pagination" />
                    </div>
                </div>
            </div>
        </section>
    );

}

export default Read;