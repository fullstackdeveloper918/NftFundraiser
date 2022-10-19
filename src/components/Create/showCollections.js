import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GetCollectionsAction } from '../../redux/Actions/projectAction'

const ShowCollections = () => {
    const dispatch = useDispatch()
    const col = useSelector(state => {
        // debugger
        return state?.projectdetails?.getcollections
    })
    console.log(col, 'col')
    useEffect(() => {
        dispatch(GetCollectionsAction())
    }, [])
    return (
        <section className="explore-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-7">
                        {/* Intro */}
                        <div className="intro text-center mb-4">
                            <span>Explore</span>
                            <h3 className="mt-3 mb-0">My Collections</h3>
                            <p>Mint NFTs that are based on real-life projects or events related to important causes.</p>
                        </div>
                    </div>
                </div>

                <div className="row items explore-items h-auto">
                    {col && col.length ?
                        [...new Map(col?.map(item =>
                            [item["title"], item])).values()].map((item, idx) => {
                                return (
                                    <Link key={`edth_${idx}`} to={`/collection/${item.id}`} className="col-12 col-sm-6 col-lg-3 item explore-item">
                                        <div>
                                            <div className="card">
                                                <div className="image-over">
                                                    <Link to={`/collection/${item.id}`}>
                                                        <img className="card-img-top" src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' alt="" />
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
                        <div className="col-12 col-sm-6 col-lg-3">
                            <h2>
                                No Collections
                            </h2>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default ShowCollections