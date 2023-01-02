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
                                            <Link to={`/popularcollection/details/${item?.id}`}>
                                                <img className="card-img-top" src={item?.image} alt="" />
                                            </Link>

                                        </div>

                                        {/* Card Caption */}
                                        <div className="card-caption col-12 p-0">
                                            <img className='logo' src="/img/logo.png" alt='logo' width={50} height={50} />
                                            {/* Card Body */}
                                            <div className="card-body">
                                                <a>
                                                    <h5 className="mb-0 mt-3">{item.title}</h5>
                                                </a>

                                                <div class=""><p> {item.description.slice(0, 26)}<span>....</span></p></div>

                                                <div class="mb-2 d-flex align-items-center justify-content-between">
                                                    <div class="mt-2 mb-2 d-flex text-align-center fundraiser_sale">
                                                        <div>
                                                            <span>Total NFTs</span>
                                                            <div>{item.nft_data.length}</div>
                                                        </div>
                                                        {/* <div>
                                                                        <span>Sale</span>
                                                                        <div>100</div>
                                                                    </div> */}
                                                    </div>
                                                    {/* <span class="share">
                                                        <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#fff" stroke-width="2" d="M18,8 C19.6568542,8 21,6.65685425 21,5 C21,3.34314575 19.6568542,2 18,2 C16.3431458,2 15,3.34314575 15,5 C15,6.65685425 16.3431458,8 18,8 Z M6,15 C7.65685425,15 9,13.6568542 9,12 C9,10.3431458 7.65685425,9 6,9 C4.34314575,9 3,10.3431458 3,12 C3,13.6568542 4.34314575,15 6,15 Z M18,22 C19.6568542,22 21,20.6568542 21,19 C21,17.3431458 19.6568542,16 18,16 C16.3431458,16 15,17.3431458 15,19 C15,20.6568542 16.3431458,22 18,22 Z M16,18 L8,13 M16,6 L8,11"></path></svg>
                                                    </span> */}
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