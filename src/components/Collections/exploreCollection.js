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
        // 
        return state.collection.collection
    })
    // console.log(coll, "coll")
    useEffect(() => {

        dispatch(PopularCollectionAction())
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
                                [item["title"], item])).values()]?.map((item, idx) => {
                                    return (
                                        <Link key={`edth_${idx}`} to={`/popularcollection/details/${item.id}`} className="col-12 col-sm-6 col-lg-3 item explore-item" >
                                            <div>
                                                <div className="card position-relative ">
                                                    <div className="image-over ">
                                                        <img className="card-img-top" src={item.image} />
                                                    </div>

                                                    {/* Card Caption */}
                                                    <div className="card-caption col-12 p-0">
                                                        <img className='logo' src="/img/logo.png" alt='logo' width={50} height={50} />
                                                        {/* Card Body */}
                                                        <div className="card-body">
                                                            <a>
                                                                <h5 className="mb-0 mt-3">{item.title}</h5>
                                                            </a>

                                                            <div class=""><p>{item.description.slice(0, 26)}<span>....</span></p></div>

                                                            <div class="mb-2 align-items-center justify-content-between">
                                                                <div class="mt-2 mb-2 d-flex justify-content-between text-align-center fundraiser_sale">
                                                                  
                                                                        <span>Total Nft's</span>
                                                                        <span>{item.nft_data.length}</span>
                                                                   
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