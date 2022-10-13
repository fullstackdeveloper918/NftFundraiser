import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PopularCollectionAction } from '../../redux/Actions/popularAction';
import { ProjectList } from '../../redux/Actions/projectAction';
import { DeleteProject } from './../../redux/Actions/projectAction';


const AllCollections = () => {

    const dispatch = useDispatch()

    const coll = useSelector(state => {
        // debugger
        return state.collection.collection
    })
    console.log(coll, "coll")
    useEffect(() => {

        dispatch(PopularCollectionAction({}))
    }, [dispatch])

    return (
        <>
            <section className="explore-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center mb-4">

                                <h3 className="mt-3 mb-0">Popular Collections</h3>

                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center text-center">
                        <div className="col-12">
                            {/* Explore Menu */}


                        </div>
                    </div>
                    <div className="row items explore-items h-auto">
                        {coll && coll.length ?
                            [...new Map(coll?.map(item =>
                                [item["title"], item])).values()].map((item, idx) => {
                                    return (
                                        <Link key={`edth_${idx}`} to={`/item-details/${item.id}`} className="col-12 col-sm-6 col-lg-3 item explore-item">
                                            <div>
                                                <div className="card">
                                                    <div className="image-over">
                                                        <img className="card-img-top" src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' alt={item.image.description} />
                                                    </div>
                                                    {/* Card Caption */}
                                                    <div className="card-caption col-12 p-0">
                                                        {/* Card Body */}
                                                        <div className="card-body">
                                                            <a>
                                                                <h5 className="mb-0">{item.title}</h5>
                                                            </a>
                                                            <div className="seller d-flex align-items-center my-3">
                                                                <span style={{ color: '#8E8E8E' }}>Owned By</span>
                                                                <a href="/author">
                                                                    <h6 className="ml-2 mb-0">{item?.user_data?.username}</h6>
                                                                </a>
                                                            </div>
                                                            <div className="card-bottom d-flex justify-content-between">
                                                                <span>{item.price} MATIC</span>
                                                                <span>{item.number_of_nft} NFTS</span>
                                                            </div>
                                                            <div>
                                                                {item.status == '1' ?
                                                                    <Button>Donation</Button>
                                                                    :

                                                                    <Button>Product Sale</Button>
                                                                }
                                                            </div>
                                                            {/* <a className="btn btn-bordered-white btn-smaller mt-3"> <Link to={`/updateproject/${item.id}`}>Edit</Link></a> */}
                                                            {/* <a className="btn btn-bordered-white btn-smaller mt-3" onClick={() => deleteHandler(item.id)}>Delete</a> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }) :
                            <div className="col-12 col-sm-6 col-lg-3">
                                <h2>
                                    No Popular Collections
                                </h2>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </>
    );

}

export default AllCollections; 