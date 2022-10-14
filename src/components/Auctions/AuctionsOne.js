import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPublicLiveProjects } from '../../redux/Actions/projectAction';





const projectTypesMap = {
    "LatestProjects": 2,
    "RecentCampaigns": 1
}


const AuctionsOne = ({ key, type }) => {

    const dispatch = useDispatch()

    const liveProjects = useSelector(state => {
        return state?.projectdetails?.liveProjects[type]
    })
    console.log(liveProjects, 'liveeproj')
    useEffect(() => {
        dispatch(getPublicLiveProjects({
            cursor: 1,
            type: projectTypesMap[type],
            projectType: type,
        }))

    }, [dispatch])

    return (


        <section className="live-auctions-area">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>Project</span>
                                <h3 className="mt-3 mb-0">{type.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}</h3>
                            </div>
                            <div className="intro-btn">
                                <a className="btn content-btn" href={`/all/${type}`}>View All</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="auctions-slides">
                    <div className="swiper-container slider-mid items">
                        <div className="swiper-wrapper">
                            {/* Single Slide */}
                            {liveProjects?.map((item, idx) => {
                                return (
                                    <div key={`auc_${idx}`} className="swiper-slide item">
                                        <div className="card">
                                            <div className="image-over">
                                                <Link to={`/proj-details/${item.id}`}>
                                                    <img className="card-img-top" src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' alt="" />
                                                </Link>
                                            </div>
                                            {/* Card Caption */}
                                            <div className="card-caption col-12 p-0">
                                                {/* Card Body */}
                                                <div className="card-body">
                                                    <div className="countdown-times mb-3">
                                                        <div className="countdown d-flex justify-content-center" data-date={item.date} />
                                                    </div>
                                                    <a href="/item-details">
                                                        <h5 className="mb-0">{item.title}</h5>
                                                    </a>
                                                    <a className="seller d-flex align-items-center my-3" href="/item-details">
                                                        <img className="avatar-sm rounded-circle" src='/img/avtar3.png' alt="" />
                                                        <span className="ml-2">@{item.user_data.username}</span>
                                                    </a>
                                                    <div className="card-bottom d-flex justify-content-between">
                                                        <span>{item.price} MATIC</span>
                                                        <span>{item.number_of_nft} NFTS</span>
                                                    </div>
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
    )
}
export default AuctionsOne;