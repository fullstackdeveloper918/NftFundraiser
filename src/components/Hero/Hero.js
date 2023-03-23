import React, { Component } from 'react';

import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { Roles } from '../Wallet/interact';
import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { GetMostactivityProject, getPublicLiveProjects } from '../../redux/Actions/projectAction';






const projectTypesMap = {
    "LatestProjects": 2,
    "RecentCampaigns": 1
}
const Hero = ({ type }) => {
    const history = useHistory()

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    function success(pos) {
        var crd = pos.coords;

        // console.log("Your current position is:");
        // console.log(`Latitude : ${crd.latitude}`);
        // console.log(`Longitude: ${crd.longitude}`);
        // console.log(`More or less ${crd.accuracy} meters.`);
        localStorage.setItem('latitude', `${crd.latitude}`);
        localStorage.setItem('longitude', `${crd.longitude}`);
        // setLatitude(`${crd.latitude}`)
        // setLongitude(`${crd.longitude}`)
    }

    function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const userRole = useSelector(state => {
        return state.user.userdetail.role
    })

    const userToken = useSelector(state => {
        return state.user.userToken
    })
    const dispatch = useDispatch()

    const mostactivityProjects = useSelector(state => {
        return state?.projectdetails?.getmostProjActivity
    })
    console.log(mostactivityProjects, 'mostactivityProjects')
    useEffect(() => {
        dispatch(getPublicLiveProjects({
            cursor: 1,
            type: projectTypesMap[type],
            projectType: type,
        }))
        dispatch(GetMostactivityProject())
    }, [dispatch])
    const currentLocation = () => {
        // 
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    if (result.state === "granted") {
                        // console.log(result.state);
                        //If granted then you can directly call your function here
                        navigator.geolocation.getCurrentPosition(success);
                    } else if (result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "denied") {
                        //If denied then you have to show instructions to enable location
                    }
                    result.onchange = function () {
                        // console.log(result.state);
                    };
                });
        } else {
            alert("Sorry Not available!");
        }
    }

    useEffect(() => {
        currentLocation()
    }, [])

    const handleCreate = () => {
        if (Roles["CREATOR"] == userRole) {
            history.push('/create')
        }
        if (Roles["BUYER"] == userRole) {
            Swal.fire({
                icon: 'info',
                html:
                    'Sign up as a Creator to start a project and upload NFTs',
                // showCloseButton: false,
                focusConfirm: false,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Ok!',
                confirmButtonAriaLabel: 'Thumbs up, great!',
            })
        }
        else if (!userToken && !localStorage.getItem('authToken')) {
            Swal.fire({
                icon: 'info',
                html:
                    'Sign up as a Creator to start a project and upload NFTs',
                // showCloseButton: false,
                focusConfirm: false,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Ok!',
                confirmButtonAriaLabel: 'Thumbs up, great!',
            })
        }

    }

    return (
        <section className="hero-section">
            <div className="container">
                <div className="row ">

                    <div className="col-12 col-md-6 col-lg-7">

                        <h1 className="mt-4">Create NFTs to fund real-life projects. Earn up to 30% by sharing with friends.</h1>
                        {/* <p>Earn rewards by referring your friends.</p> */}
                        {/* Buttons */}
                        <div className="button-group">
                            <Link className="btn btn-bordered-white" to={`/all/${"LatestProjects"}`}><i className="icon-rocket mr-2" />Explore</Link>
                            <a className="btn btn-bordered-white" onClick={handleCreate}><i className="icon-note mr-2" />Create </a>
                        </div>
                    </div>

                    <div className='col-12 col-md-6 col-lg-4 auction-slider auctions-slides'>
                        {/* {mostactivityProjects[0]?.map((item, idx) => { */}
                        {/* return ( */}

                        <div key={`auc_${mostactivityProjects[0]?.id}`} className="item card">



                            <div className="image-over">
                                <Link to={`/projects/${mostactivityProjects[0]?.slug}`}>

                                    <img class="card-img-top" src={mostactivityProjects[0]?.image} alt=""></img>
                                </Link>

                            </div>

                            <div className="card-caption col-12 p-0">

                                <div className="card-body pt-0">

                                    {/* <a href="#">
                                        <h5 className="mb-0">{mostactivityProjects[0]?.title?.slice(0, 16)}</h5>
                                    </a> */}
                                    {/* <a className="seller d-flex align-items-center mb-2" href="#">
                                        <img className="avatar-sm rounded-circle" src={mostactivityProjects[0]?.user_data?.avatar} alt="" />
                                        <span className="ml-2 mb-0">{mostactivityProjects[0]?.user_data?.username}</span>
                                    </a>
                                    <div className="card-bottom d-flex justify-content-between">
                                        <span>{Math.round(mostactivityProjects[0]?.price)} MATIC</span>
                                        {mostactivityProjects[0]?.number_of_nft == 1 ? (

                                            <span>{mostactivityProjects[0]?.number_of_nft} NFT</span>
                                        ) : (
                                            <span>{mostactivityProjects[0]?.number_of_nft} NFTs</span>
                                        )

                                        }
                                    </div> */}

                                    {/* ) */}
                                    {/* })} */}
                                    {/* Card Caption */}
                                    <div className="card-caption col-12 p-0">
                                        {/* Card Body */}
                                        <div className="card-body">
                                            {/* <div className="countdown-times ">
                                                        <div className="countdown d-flex justify-content-center" data-date={item.date} />
                                                    </div> */}

                                            {/* <a > */}
                                            <h5 className="mb-0">{mostactivityProjects[0]?.title?.slice(0, 16)}</h5>
                                            {/* </a> */}


                                            <div
                                                className="seller d-flex align-items-center my-2"
                                            >

                                                <a href="#">
                                                    <h6 className="ml-2 mb-0">
                                                        {mostactivityProjects[0]?.user_data.username?.slice(0, 12)}
                                                    </h6>
                                                </a>

                                                {/* <a > */}
                                                <h6 className="ml-2 mb-0">
                                                    {mostactivityProjects[0]?.user_data.username?.slice(0, 12)}
                                                </h6>
                                                {/* </a> */}

                                                {/* <span className="ml-2 mb-0">{item.user_data.username}</span> */}
                                            </div>
                                            {/* <div className="card-bottom d-flex justify-content-between">
                              <span>{Math.round(item.price)} MATIC</span>
                              {item?.number_of_nft == 1 ? (
                                <span>{item.number_of_nft} NFT</span>
                              ) : (
                                <span>{item.number_of_nft} NFTs</span>
                              )}
                            </div> */}



                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>



                    </div>
                </div>

            </div>

            {/* Shape */}
            <div className="shape">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 465" version="1.1">
                    <defs>
                        <linearGradient x1="49.7965246%" y1="28.2355058%" x2="49.7778147%" y2="98.4657689%" id="linearGradient-1">
                            <stop stopColor="rgba(69,40,220, 0.15)" offset="0%" />
                            <stop stopColor="rgba(87,4,138, 0.15)" offset="100%" />
                        </linearGradient>
                    </defs>
                    <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                        <polygon points fill="url(#linearGradient-1)">
                            <animate id="graph-animation" xmlns="http://www.w3.org/2000/svg" dur="2s" repeatCount attributeName="points" values="0,464 0,464 111.6,464 282.5,464 457.4,464 613.4,464 762.3,464 912.3,464 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,323.3 282.5,373 457.4,423.8 613.4,464 762.3,464 912.3,464 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,336.6 457.4,363.5 613.4,414.4 762.3,464 912.3,464 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,323.3 613.4,340 762.3,425.6 912.3,464 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,290.4 762.3,368 912.3,446.4 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,329.6 912.3,420 1068.2,427.6 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,402.4 1068.2,373 1191.2,412 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,336.6 1191.2,334 1328.1,404 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,282 1191.2,282 1328.1,314 1440.1,372.8 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,282 1191.2,204 1328.1,254 1440.1,236 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,282 1191.2,204 1328.1,164 1440.1,144.79999999999998 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,282 1191.2,204 1328.1,164 1440.1,8 1440.1,464 0,464;" fill="freeze" />
                        </polygon>
                    </g>
                </svg>
            </div>
        </section>
    );

}

export default Hero;