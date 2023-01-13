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
    console.log(coll, "coll detail")
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
                    {coll?.slice(0, 8)?.map((item, idx) => {
                        return (
                            <div key={`cd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                <div>
                                    <div className="card position-relative ">
                                        <div className="image-over ">
                                            <Link to={`/popularcollection/details/${item?.slug}`}>
                                                <img className="card-img-top" src={item?.image} alt="" />
                                            </Link>
                                        </div>
                                        {/* Card Caption */}
                                        <div className="card-caption col-12 p-0">
                                            <img className='logo' src="/img/logo.png" alt='logo' width={50} height={50} />
                                            {/* Card Body */}
                                            <div className="card-body">
                                                <a>
                                                    <h5 className="mb-0 ">{item.title}</h5>
                                                </a>
                                                <div class=""><p> {item.description.slice(0, 52)}</p></div>
                                                <div class="mb-2 align-items-center">
                                                    <div class="mt-2 mb-2 d-flex justify-content-between text-align-center fundraiser_sale">
                                                        <span>Total NFTs</span>
                                                        <span>{item.nft_data.length}</span>
                                                    </div>
                                                </div>
                                                {/* <div className="seller d-flex align-items-center my-3">
                                                                <span style={{ color: '#8E8E8E' }}>Owned By</span>
                                                                <a href="/author">
                                                                    <h6 className="ml-2 mb-0">{item?.user_data?.username}</h6>
                                                                </a>
                                                            </div> */}
                                                {/* <div className="card-bottom d-flex justify-content-between">
                                                                <span>{item.price} MATIC</span>
                                                                <span>{item.number_of_nft} NFTS</span>
                                                            </div> */}
                                                {/* <div>
                                                                {item.status == '1' ?
                                                                    <Button>Donation</Button>
                                                                    :
                                                                    <Button>Product Sale</Button>
                                                                }
                                                            </div> */}
                                                {/* <a className="btn btn-bordered-white btn-smaller mt-3"> <Link to={`/updateproject/${item.id}`}>Edit</Link></a> */}
                                                {/* <a className="btn btn-bordered-white btn-smaller mt-3" onClick={() => deleteHandler(item.id)}>Delete</a> */}
                                            </div>
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