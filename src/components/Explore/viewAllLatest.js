import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPublicLiveProjects } from '../../redux/Actions/projectAction';

const projectTypesMap = {
    "Latest Projects": 2,
    "Recent Campaigns": 1
}

const ExploreAll = () => {
    const { type } = useParams()
    const dispatch = useDispatch()


    const liveProjects = useSelector(state => {
        return state.projectdetails.liveProjects
    })
    console.log(liveProjects, 'live')
    useEffect(() => {
        // debugger
        dispatch(getPublicLiveProjects({
            cursor: 1,
            type: projectTypesMap[type],
        }))
    }, [dispatch, type])

    return (
        <section className="explore-area load-more p-0">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                {/* <span>{this.state.initData.pre_heading}</span> */}
                                <h3 className="mt-3 mb-0">{type}</h3>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row items">
                    {liveProjects?.map((item, idx) => {
                        return (
                            <div key={`exo_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
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
                                            <a href="/item-details">
                                                <h5 className="mb-0">{item.title}</h5>
                                            </a>
                                            <div className="seller d-flex align-items-center my-3">
                                                <span>Owned By</span>
                                                <a href="/author">
                                                    <h6 className="ml-2 mb-0">{item.owner}</h6>
                                                </a>
                                            </div>
                                            <div className="card-bottom d-flex justify-content-between">
                                                <span>{item.price}</span>
                                                <span>{item.count}</span>
                                            </div>
                                            {/* <a className="btn btn-bordered-white btn-smaller mt-3" href="/login"><i className="icon-handbag mr-2" />{item.btnText}</a> */}
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
        </section>
    );
}


export default ExploreAll;