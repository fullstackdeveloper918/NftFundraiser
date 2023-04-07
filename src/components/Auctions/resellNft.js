import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPublicLiveProjects } from "../../redux/Actions/projectAction";
import { ResellAction } from "../../redux/Actions/resellNftAction";
const Resell = ({ type }) => {
    const dispatch = useDispatch();
    const nfts = useSelector((state) => {
        return state?.resell?.resell;
    });
    console.log(nfts[0]?.image, "resellnfts");
    useEffect(() => {
        dispatch(ResellAction())
    }, [dispatch]);
    return (
        <section className="live-auctions-area">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>NFTs</span>
                                <h3 className="mt-3 mb-0">
                                    Latest NFTs
                                </h3>
                            </div>
                            <div className="intro-btn">
                                {nfts?.length > 4 && (
                                    <Link to='/all/resll/nfts' style={{ color: "white" }}>
                                        <a className="btn content-btn">View All</a>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="auctions-slides ">
                    <div className="swiper-container slider-mid items ">
                        <div className="swiper-wrapper  ">
                            {/* Single Slide */}
                            {nfts?.map((item, idx) => {
                                return (
                                    <div
                                        key={`auc_${item.id}`}
                                        className="swiper-slide item card position-relative auctions-slides-card"
                                    >
                                        <div className="image-over">
                                            <Link to={`/nft/resell/details/${item.slug}`}>
                                                <img
                                                    className="card-img-top"
                                                    src={item?.image}
                                                    alt=""
                                                />
                                            </Link>
                                        </div>
                                        <div className="card-caption col-12 p-0">
                                            <div className="card-body">
                                                {/* <a> */}
                                                <h5 className="mb-0">{item.title.slice(0, 16)}</h5>
                                                {/* </a> */}
                                                <div
                                                    className="seller d-flex align-items-center my-3"
                                                >
                                                    <span>Owned By</span>
                                                    {/* <a> */}
                                                    <h6 className="ml-2 mb-0">
                                                        {item.user_data.username.slice(0, 12)}
                                                    </h6>
                                                    {/* </a> */}
                                                </div>
                                                <div className="card-bottom d-flex justify-content-between nft-price" >
                                                    <span><img className="mr-1" src='../img/image14.png' />{Math.round(item.price)} MATIC</span>
                                                    <span>1 NFT</span>
                                                </div>
                                                <div className="d-flex justify-content-between edit-buttons nft-price ">
                                                    <Link to={`/nft/details/${item.slug}`} style={{ color: "white" }} className="btn  btn-smaller mt-3 mb-0">
                                                        <i className="icon-handbag" />
                                                    </Link>
                                                    <Link to={`/nft/details/${item.slug}`} className="btn  btn-smaller mt-3 ml-2 mb-0" style={{ color: "white" }}>
                                                        <i class="fa-solid fa-share-nodes text-white"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="swiper-pagination" />
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Resell;