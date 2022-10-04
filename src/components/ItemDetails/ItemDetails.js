import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ProjectDetail } from '../../redux/Actions/projectAction';
import { getProjectDetail } from '../../redux/Slices/projectSlice';

const ItemDetails = () => {

    const id = useParams();
    // console.log(id, 'idd')

    const dispatch = useDispatch()

    const projdetail = useSelector(state => {
        return state.projectdetails
    })
    console.log(projdetail.projectdetails.address, 'proj')

    useEffect(() => {
        dispatch(ProjectDetail(id))
    }, [id])


    return (
        <section className="item-details-area">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-12 col-lg-5">
                        <div className="item-info">
                            {/* {projdetail?.map((item) => ( */}

                            <><div className="item-thumb text-center">
                                <img src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' alt="" />
                            </div><div className="card no-hover countdown-times my-4">
                                    <div className="countdown d-flex justify-content-center" data-date={projdetail.projectdetails.address} />
                                </div>
                                {/* Netstorm Tab */}
                                <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
                                    <><li>
                                        <a className="active" id="nav-home-tab" data-toggle="pill" href="#nav-home">
                                            <h5 className="m-0">tab 1</h5>
                                        </a>
                                    </li><li>
                                            <a id="nav-profile-tab" data-toggle="pill" href="#nav-profile">
                                                <h5 className="m-0">tab 2</h5>
                                            </a>
                                        </li><li>
                                            <a id="nav-contact-tab" data-toggle="pill" href="#nav-contact">
                                                <h5 className="m-0">tab 3</h5>
                                            </a>
                                        </li></>
                                </ul>
                            </>
                            {/* )) */}
                            {/* } */}
                            {/* <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-home">
                                    <ul className="list-unstyled">
                                        {this.state.tabData_1.map((item, idx) => {
                                            return (
                                                <li key={`tdo_${idx}`} className="single-tab-list d-flex align-items-center">
                                                    <img className="avatar-sm rounded-circle mr-3" src={item.img} alt="" />
                                                    <p className="m-0">Bid listed for <strong>{item.price}</strong> {item.time} <br />by <a href="/author">{item.author}</a></p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div className="tab-pane fade" id="nav-profile">
                                    <ul className="list-unstyled">

                                        {this.state.tabData_2.map((item, idx) => {
                                            return (
                                                <li key={`tdt_${idx}`} className="single-tab-list d-flex align-items-center">
                                                    <img className="avatar-sm rounded-circle mr-3" src={item.img} alt="" />
                                                    <p className="m-0">Bid listed for <strong>{item.price}</strong> {item.time} <br />by <a href="/author">{item.author}</a></p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div className="tab-pane fade" id="nav-contact">
                                    <div className="owner-meta d-flex align-items-center mt-3">
                                        <span>Owner</span>
                                        <a className="owner d-flex align-items-center ml-2" href="/author">
                                            <img className="avatar-sm rounded-circle" src={this.state.initData.ownerImg} alt="" />
                                            <h6 className="ml-2">{this.state.initData.itemOwner}</h6>
                                        </a>
                                    </div>
                                    <p className="mt-2">Created : {this.state.initData.created}</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="content mt-5 mt-lg-0">
                            <h3 className="m-0">{projdetail.projectdetails.title}</h3>
                            <p>{projdetail.projectdetails.description}</p>
                            <div className="owner d-flex align-items-center">
                                <span>Owned By</span>
                                <a className="owner-meta d-flex align-items-center ml-3" href="/author">
                                    <img className="avatar-sm rounded-circle" src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' alt="" />
                                    <h6 className="ml-2">{projdetail.projectdetails.type}</h6>
                                </a>
                            </div>
                            <div className="item-info-list mt-4">
                                <ul className="list-unstyled">
                                    <li className="price d-flex justify-content-between">
                                        <span>Current Price {projdetail.projectdetails.price}</span>
                                        <span>{projdetail.projectdetails.price}</span>
                                        <span>{projdetail.projectdetails.price}</span>
                                    </li>
                                    <li>
                                        <span>Size </span>
                                        <span>{projdetail.projectdetails.latitude}</span>
                                    </li>
                                    <li>
                                        <span>Volume Traded </span>
                                        <span>{projdetail.projectdetails.logitude}</span>
                                    </li>
                                </ul>
                            </div>
                            {/* <div className="row items">
                                {this.state.sellerData.map((item, idx) => {
                                    return (
                                        <div key={`sd_${idx}`} className="col-12 col-md-6 item px-lg-2">
                                            <div className="card no-hover">
                                                <div className="single-seller d-flex align-items-center">
                                                    <a href="/author">
                                                        <img className="avatar-md rounded-circle" src={item.img} alt="" />
                                                    </a>
                                                    <div className="seller-info ml-3">
                                                        <a className="seller mb-2" href="/author">{item.seller}</a>
                                                        <span>{item.post}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="col-12 item px-lg-2">
                                    <div className="card no-hover">
                                        <h4 className="mt-0 mb-2">Highest Bid</h4>
                                        <div className="price d-flex justify-content-between align-items-center">
                                            <span>{this.state.initData.highest_bid}</span>
                                            <span>{this.state.initData.bid_count}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a className="d-block btn btn-bordered-white mt-4" href="/wallet-connect">{this.state.initData.btnText}</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default ItemDetails;