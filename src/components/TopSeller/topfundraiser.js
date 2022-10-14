import React, { Component, useEffect } from 'react';
import axios from 'axios';
import { getTopFundraiser } from '../../redux/Slices/projectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TopFundraiserAction } from '../../redux/Actions/fundraiserAction';



const Fundraiser = () => {
    const dispatch = useDispatch()

    const fund = useSelector(state => {
        return state.fundraiser.fundraiser
    })
    console.log(fund, 'fdd')

    useEffect(() => {
        dispatch(TopFundraiserAction({}))
    }, [dispatch])


    return (
        <section className="top-seller-area">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro m-0">
                            <div className="intro-content">
                                <span>Fundraisers</span>
                                <h3 className="mt-3 mb-0">Top Fundraisers</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row items">
                    {fund?.map((item, idx) => {
                        return (
                            <div key={`ts_${idx}`} className="col-12 col-sm-6 col-lg-4 item">
                                {/* Single Seller */}
                                <div className="card no-hover">
                                    <div className="single-seller d-flex align-items-center">
                                        <a href="/author">
                                            <img className="avatar-md rounded-circle" src={item.avatar} alt="" />
                                        </a>
                                        {/* Seller Info */}
                                        <div className="seller-info ml-3">
                                            <a className="seller mb-2" href="/author">@{item.username}</a>
                                            <span>{item.amount}</span>
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

export default Fundraiser;