import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPublicLiveProjects } from '../../redux/Actions/projectAction';

const initData = {
    pre_heading: "Auctions",
    heading: "Live Auctions",
    btnText: "View All"
}



const projectTypesMap = {
    "Latest Projects": 2,
    "Recent Campaigns": 1
}

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

function success(pos) {
    var crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
}
function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
const AuctionsOne = ({ type }) => {
    const dispatch = useDispatch()

    const liveProjects = useSelector(state => {
        return state.projectdetails.liveProjects
    })


    useEffect(() => {
        // if (navigator.geolocation) {
        //     navigator.permissions
        //         .query({ name: "geolocation" })
        //         .then(function (result) {
        //             if (result === "granted") {
        //                 console.log(result);
        //                 //If granted then you can directly call your function here
        //                 navigator.geolocation.getCurrentPosition(success);
        //             } else if (result === "prompt") {
        //                 navigator.geolocation.getCurrentPosition(success, errors, options);
        //             } else if (result === "denied") {
        //                 //If denied then you have to show instructions to enable location
        //             }
        //             result.onchange = function () {
        //                 console.log(result);
        //             };
        //         });
        // } else {
        //     alert("Sorry Not available!");
        // }
        dispatch(getPublicLiveProjects({
            cursor: 1,
            type: projectTypesMap[type],
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
                                <span>Auctions</span>
                                <h3 className="mt-3 mb-0">{type}</h3>
                            </div>
                            <div className="intro-btn">
                                <a className="btn content-btn" href="/auctions">View All</a>
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
                                                <Link to={`/item-details/${item.id}`}>
                                                    <img className="card-img-top" src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' alt="" />
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
                                                    <a className="seller d-flex align-items-center my-3" href="/item-details">
                                                        {/* <img className="avatar-sm rounded-circle" src={item.seller_thumb} alt="" /> */}
                                                        <span className="ml-2">{item.seller}</span>
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
    );
    // }
}

export default AuctionsOne;