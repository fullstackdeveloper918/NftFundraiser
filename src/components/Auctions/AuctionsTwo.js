import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProjectList } from '../../redux/Actions/projectAction';
import { getProjectDetail } from '../../redux/Slices/projectSlice';


const AuctionsTwo = () => {

    const dispatch = useDispatch()
    const proj = useSelector(state => {
        return state.getproject
    })
    const projdetails = useSelector(state => {
        return state.getprojectdetail
    })
    console.log(projdetails, 'projdetai')
    useEffect(() => {
        dispatch(ProjectList())
    }, [])


    return (
        <section className="live-auctions-area load-more">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-7">
                        {/* Intro */}
                        <div className="intro text-center">
                            <span>Auctions</span>
                            <h3 className="mt-3 mb-0">Live Auctions</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati <br /> dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</p>
                        </div>
                    </div>
                </div>
                <div className="row items">
                    {proj?.projects?.map((item, idx) => {
                        return (
                            <div key={`auct_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                <div className="card">

                                    <div className="image-over">
                                        <Link to={`/item-details/${item.id}`}>
                                            <img className="card-img-top" src={'https://images.unsplash.com/photo-1594312915251-48db9280c8f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'} alt="" />
                                        </Link>
                                    </div>
                                    {/* Card Caption */}
                                    <div className="card-caption col-12 p-0">
                                        {/* Card Body */}
                                        <div className="card-body">
                                            <div className="countdown-times mb-3">
                                                <div className="countdown d-flex justify-content-center" data-date={item.end_date} />
                                            </div>
                                            <a href="/item-details">
                                                <h5 className="mb-0">{item.title}</h5>
                                            </a>
                                            <a className="seller d-flex align-items-center my-3" href="/author">
                                                <img className="avatar-sm rounded-circle" src='https://images.unsplash.com/photo-1547555999-14e818e09e33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80' alt="" />
                                                <span className="ml-2">@{item.description}</span>
                                            </a>
                                            <div className="card-bottom d-flex justify-content-between">
                                                <span>{item.price}</span>
                                                <span>{item.count}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <a id="load-btn" className="btn btn-bordered-white mt-5" href="#">Load More</a>
                    </div>
                </div>
            </div>
        </section >
    );

}

export default AuctionsTwo;