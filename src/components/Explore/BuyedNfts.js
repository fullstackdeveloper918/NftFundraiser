import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GetUserAction } from "../../redux/Actions/authAction";
import {
    CategoriesAction,
    getPublicLiveProjects,
} from "../../redux/Actions/projectAction";


const ExploreBuyedNfts = () => {
    const { type } = useParams();
    const dispatch = useDispatch();


    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })

    useEffect(() => {
        dispatch(GetUserAction())

    }, [dispatch]);

    return (
        <section className="explore-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-7">
                        <div className="intro text-center mb-4">
                            <h3 className="mt-3 mb-0">
                                My NFTs
                                {/* {type.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")} */}
                            </h3>
                            <p>
                                Invest in NFTs that are based on real-life projects or events
                                related to important causes
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row items explore-items h-auto">
                    {userdet?.purchase_nft && userdet?.purchase_nft?.length ? (
                        [
                            ...new Map(
                                userdet?.purchase_nft?.map((item) => [item["title"], item])
                            ).values(),
                        ].map((item, idx) => {
                            return (
                                <Link
                                    key={`edth_${idx}`}
                                    className="col-12 col-sm-6 col-lg-3 item explore-item"
                                >
                                    <div>
                                        <Link to={`/my/nfts-detail/${item.slug}`}>
                                            <div className="card">
                                                <div className="image-over">
                                                    <Link to={`/my/nfts-detail/${item.slug}`}>
                                                        <img
                                                            className="card-img-top"
                                                            src={item.image}
                                                            alt=""
                                                        />
                                                    </Link>
                                                    {/* <div className="image-over">
                                                        <img className="card-img-top" src={item.image} alt="" /> */}
                                                </div>

                                                <div className="card-caption col-12 p-0">
                                                    {/* Card Body */}
                                                    <div className="card-body">
                                                        {/* <div className="countdown-times ">
                                                        <div className="countdown d-flex justify-content-center" data-date={item.date} />
                                                    </div> */}
                                                        <a >
                                                            <h5 className="mb-0">
                                                                {item.title.slice(0, 15)}
                                                            </h5>
                                                        </a>
                                                        <div
                                                            className="seller d-flex align-items-center my-3"

                                                        >
                                                            <span>Owned By</span>
                                                            {/* <img className="avatar-sm rounded-circle" src={item?.user_data?.avatar} alt="" /> */}

                                                            <a >
                                                                <h6 className="ml-2 mb-0">
                                                                    {/* {item.user_data.username.slice(0, 12)} */}
                                                                    You
                                                                </h6>
                                                            </a>

                                                            {/* <span className="ml-2 mb-0">{item.user_data.username}</span> */}
                                                        </div>
                                                        <div className="card-bottom d-flex justify-content-between nft-price">
                                                            <span><img className="mr-1" src='../img/image14.png' alt="" />{Math.round(item.price)} MATIC</span>
                                                            {/* {item?.number_of_nft == 1 ? (
                                                                <span>{item.number_of_nft} NFT</span>
                                                            ) : (
                                                                <span>{item.number_of_nft} NFTs</span>
                                                            )} */}
                                                        </div>
                                                        <div className="d-flex justify-content-between edit-buttons nft-price mt-2">
                                                            <Link to={`/my/nfts-detail/${item.slug}`} style={{ color: "white" }} className="btn  btn-smaller mt-3 mb-0">


                                                                <i className="icon-handbag" />
                                                                {/* <i className="fa-solid fa-sack-dssollar"></i> */}
                                                            </Link>
                                                            <Link to={`/my/nfts-detail/${item.slug}`} className="btn  btn-smaller mt-3 ml-2 mb-0" style={{ color: "white" }}>


                                                                <i class="fa-solid fa-share-nodes text-white"></i>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="col-12 col-sm-12 col-lg-12">
                            <h2 className="allproj2">No latest project found</h2>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
export default ExploreBuyedNfts;
