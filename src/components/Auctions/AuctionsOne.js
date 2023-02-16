import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPublicLiveProjects } from '../../redux/Actions/projectAction';




const projectTypesMap = {
    "LatestProjects": 2,
    "RecentCampaigns": 1
}


const AuctionsOne = ({ type }) => {

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
                                {liveProjects?.length > 4 &&

                                    <Link to={`/all/${type}`} style={{ color: 'white' }} ><a className="btn content-btn">View All</a></Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="auctions-slides ">
                    <div className="swiper-container slider-mid items ">
                        <div className="swiper-wrapper  ">
                            {/* Single Slide */}

                            {liveProjects?.map((item, idx) => {
                                return (

                                    <div key={`auc_${item.id}`} className="swiper-slide item card">


                                        {/* {item?.nft_data?.map((item, idx) => { */}
                                        {/* return ( */}
                                        <div className="image-over">
                                            <Link to={`/projects/${item.slug}`}>
                                                <img className="card-img-top" src={item?.image} alt="" />
                                            </Link>

                                        </div>
                                        {/* ) */}
                                        {/* })} */}
                                        {/* Card Caption */}
                                        <div className="card-caption col-12 p-0">
                                            {/* Card Body */}
                                            <div className="card-body">
                                                {/* <div className="countdown-times ">
                                                        <div className="countdown d-flex justify-content-center" data-date={item.date} />
                                                    </div> */}
                                                <a href="#">
                                                    <h5 className="mb-0">{item.title.slice(0, 16)}</h5>
                                                </a>
                                                <div className="seller d-flex align-items-center my-3" href="#">
                                                    <span>Owned By</span>
                                                    {/* <img className="avatar-sm rounded-circle" src={item?.user_data?.avatar} alt="" /> */}

                                                    <a href='#'>
                                                        <h6 className="ml-2 mb-0">{item.user_data.username}</h6>
                                                    </a>

                                                    {/* <span className="ml-2 mb-0">{item.user_data.username}</span> */}
                                                </div>
                                                <div className="card-bottom d-flex justify-content-between">
                                                    <span>{Math.round(item.price)} MATIC</span>
                                                    {item?.number_of_nft == 1 ? (

                                                        <span>{item.number_of_nft} NFT</span>
                                                    ) : (
                                                        <span>{item.number_of_nft} NFTs</span>
                                                    )

                                                    }
                                                </div>

                                                <div className='d-flex justify-content-between'>
                                                    <a className="btn btn-bordered-white btn-smaller mt-3 mb-0" href="/login">Invest</a>
                                                    <a className="btn btn-bordered-white btn-smaller mt-3 mb-0" href="/login">Share</a>
                                                </div>




                                                <Link to={`/projects/${item.slug}`} style={{ color: "white" }}> <a className="btn btn-bordered-white btn-smaller mt-3 mb-0" ><i className="icon-handbag mr-2" />Buy</a> </Link></div>



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