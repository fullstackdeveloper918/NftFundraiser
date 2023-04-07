import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PopularCollectionAction } from '../../redux/Actions/popularAction';
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
                                        <Link key={`edth_${idx}`} to={`/popularcollection/details/${item.slug}`} className="col-12 col-sm-6 col-lg-3 item explore-item" >
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
                                                                <h5 className="mb-0 mt-3">{item.title.slice(0, 15)}...</h5>
                                                            </a>
                                                            <div class=""><p>{item.description.slice(0, 50)}...</p></div>
                                                            <div class="mb-2 align-items-center justify-content-between">
                                                                <div class="mt-2 mb-2 d-flex justify-content-between text-align-center fundraiser_sale">
                                                                    {item?.nft_data.length == 1 ? (
                                                                        <span>{item.nft_data.length} NFT</span>
                                                                    ) : (
                                                                        <span>{item.nft_data.length} NFTs</span>
                                                                    )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }) :
                            <div className="col-12 col-sm-12 col-lg-12 no-data">
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