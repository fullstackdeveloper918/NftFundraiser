import React, { Component } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ProjectDetail } from '../../redux/Actions/projectAction';



const CollItem = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const projdetail = useSelector(state => {
        // 
        return state?.projectdetails?.projectdetails
    })
    // console.log(projdetail, 'projdata')

    useEffect(() => {
        // 
        dispatch(ProjectDetail(id))
    }, [id])


    return (
        <div>
            <div className="row justify-content-center text-center mt-5 mt-lg-0">
                <div className="col-12">
                    {/* Explore Menu */}
                    <div className="explore-menu btn-group btn-group-toggle flex-wrap justify-content-center text-center mb-4" data-toggle="buttons">

                    </div>
                </div>
            </div>
            <div className="row items explore-items">
                {Object.keys(projdetail).map((item, idx) => {
                    // {projdetail?.map((item, idx) => {
                    return (
                        <div key={`eds_${idx}`} className="col-12 col-md-6 item explore-item" >
                            <div className="card no-hover text-center">
                                <div className="image-over">
                                    <a href="/item-details">
                                        {/* <img className="card-img-top" src={item.img} alt="" /> */}
                                    </a>
                                    {/* Author */}
                                    <a className="author" href="/authors">
                                        <div className="author-thumb avatar-lg">
                                            <img className="rounded-circle" src={item?.nft_data?.title} alt="" />
                                        </div>
                                    </a>
                                </div>
                                {/* Card Caption */}
                                <div className="card-caption col-12 ">
                                    {/* Card Body */}
                                    <div className="card-body mt-4">
                                        <a href="/item-details">
                                            <h5 className="mb-2">{item?.nft_data?.title}</h5>
                                        </a>
                                        {/* <span>{item.content}</span> */}
                                        <hr />
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
    );
}


export default CollItem;