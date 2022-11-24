import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { CategoriesAction, getPublicLiveProjects } from '../../redux/Actions/projectAction';

const projectTypesMap = {
    "LatestProjects": 2,
    "RecentCampaigns": 1
}

const ExploreAll = () => {

    const { type } = useParams()
    const dispatch = useDispatch()


    const liveProjects = useSelector(state => {
        return state?.projectdetails?.liveProjects[type]
    })
    console.log(liveProjects, 'live')
    useEffect(() => {
        // debugger
        dispatch(getPublicLiveProjects({
            cursor: 1,
            type: projectTypesMap[type],
            projectType: type,

        }))
    }, [dispatch, type])

    // useEffect(() => {
    //     dispatch(CategoriesAction())
    // }, [])

    // const cate = useSelector(state => {
    //     // debugger
    //     return []
    // })
    // console.log(cate, 'category')
    return (

        <section className="explore-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-7">
                        {/* Intro */}
                        <div className="intro text-center mb-4">
                            <span>Explore</span>
                            <h3 className="mt-3 mb-0">{type.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}</h3>
                            <p>Mint NFTs that are based on real-life projects or events related to important causes.</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center text-center">
                    <div className="col-12">
                        {/* Explore Menu */}
                        <div className="explore-menu btn-group btn-group-toggle flex-wrap justify-content-center text-center mb-4" data-toggle="buttons">
                            {/* {cate?.map((item, idx) => {
                                return (
                                    <Link key={`${idx}`} to='#'>
                                        <label className="btn active d-table text-uppercase p-2">

                                            <input type="radio" defaultValue="all" defaultChecked className="explore-btn" />
                                            <span>{item.title}</span>
                                        </label>
                                    </Link>
                                )
                            })} */}
                            <label className="btn d-table text-uppercase p-2">
                                <input type="radio" defaultValue="all" defaultChecked className="explore-btn" />
                                <span>Arts</span>
                            </label>
                            <label className="btn d-table text-uppercase p-2">
                                <input type="radio" defaultValue="sports" className="explore-btn" />
                                <span>Education</span>
                            </label>
                            <label className="btn d-table text-uppercase p-2">
                                <input type="radio" defaultValue="sports" className="explore-btn" />
                                <span>Gaming</span>
                            </label>
                            <label className="btn d-table text-uppercase p-2">
                                <input type="radio" defaultValue="art" className="explore-btn" />
                                <span>Music</span>
                            </label>
                            <label className="btn d-table text-uppercase p-2">
                                <input type="radio" defaultValue="sports" className="explore-btn" />
                                <span>Medical</span>
                            </label>
                            <label className="btn d-table text-uppercase p-2">
                                <input type="radio" defaultValue="sports" className="explore-btn" />
                                <span>Other</span>
                            </label>
                            <label className="btn d-table text-uppercase p-2">
                                <input type="radio" defaultValue="sports" className="explore-btn" />
                                <span>Photography</span>
                            </label>
                            <label className="btn d-table text-uppercase p-2">
                                <input type="radio" defaultValue="music" className="explore-btn" />
                                <span>Sports</span>
                            </label>
                            <label className="btn d-table text-uppercase p-2">
                                <input type="radio" defaultValue="sports" className="explore-btn" />
                                <span>Tradings Cards</span>
                            </label>
                            <label className="btn d-table text-uppercase p-2">
                                <input type="radio" defaultValue="sports" className="explore-btn" />
                                <span>Travel</span>
                            </label>
                            <label className="btn d-table text-uppercase p-2">
                                <input type="radio" defaultValue="sports" className="explore-btn" />
                                <span>Utility</span>
                            </label>
                            <label className="btn d-table text-uppercase p-2">
                                <input type="radio" defaultValue="collectibles" className="explore-btn" />
                                <span>Virtual Worlds</span>
                            </label>



                        </div>
                    </div>
                </div>
                <div className="row items explore-items h-auto">
                    {liveProjects && liveProjects.length ?
                        [...new Map(liveProjects?.map(item =>
                            [item["title"], item])).values()].map((item, idx) => {
                                return (
                                    <Link key={`edth_${idx}`} to={`/item-details/${item.id}`} className="col-12 col-sm-6 col-lg-3 item explore-item">
                                        <div>
                                            <div className="card">
                                                <div className="image-over">
                                                    <Link to={`/projdetails/${item.id}`}>
                                                        <img className="card-img-top" src={item.image} alt="" />
                                                    </Link>
                                                </div>
                                                {/* Card Caption */}
                                                <div className="card-caption col-12 p-0">
                                                    {/* Card Body */}
                                                    <div className="card-body">
                                                        <a href="/item-details">
                                                            <h5 className="mb-0">{item.title}</h5>
                                                        </a>
                                                        <div className="seller d-flex align-items-center my-3">
                                                            <span style={{ color: '#8E8E8E' }}>Owned By</span>
                                                            <a href="/author">
                                                                <h6 className="ml-2 mb-0"> @{item?.user_data?.username}</h6>
                                                            </a>
                                                        </div>
                                                        <div className="card-bottom d-flex justify-content-between">
                                                            <span>{item.price} MATIC</span>
                                                            <span>{item.number_of_nft} NFTS</span>
                                                        </div>
                                                        {/* <a className="btn btn-bordered-white btn-smaller mt-3" href="/wallet-connect"><i className="icon-handbag mr-2" />dfg</a> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }) :
                        <div className="col-12 col-sm-12 col-lg-12">
                            <h2 className='allproj2'>
                                No latest project found
                            </h2>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}
export default ExploreAll;