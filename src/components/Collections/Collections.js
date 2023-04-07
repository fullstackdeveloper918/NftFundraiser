import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PopularCollectionAction } from '../../redux/Actions/popularAction';
import { Link } from 'react-router-dom';
const Collections = () => {
    const dispatch = useDispatch()
    const coll = useSelector(state => {
        //
        return state?.collection?.collection
    })
    console.log(coll, "coll detail")
    useEffect(() => {
        dispatch(PopularCollectionAction({}))
    }, [dispatch])
    return (
        <section className="popular-collections-area">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>POPULAR</span>
                                <h3 className="mt-3 mb-0">Popular Collections</h3>
                            </div>
                            <div className="intro-btn">
                                {coll?.length > 8 &&
                                    <Link className="btn content-btn text-left" to="/allcollections">Explore More</Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row items">
                    {coll?.slice(0, 8)?.map((item, idx) => {
                        return (
                            <div key={`cd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                <div className="card no-hover text-center">
                                    <div className="image-over">
                                        <Link to={`/popularcollection/details/${item?.slug}`}>
                                            <img className="card-img-top" src={item?.image} alt="" />
                                        </Link>
                                        {/* Seller */}
                                        <div className="seller" >
                                            <div className="seller-thumb avatar-lg">
                                                <img className='rounded-circle' src={item?.user_data?.avatar} alt='logo' width={50} height={50} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Card Caption */}
                                    <div className="card-caption col-12 p-0">
                                        {/* Card Body */}
                                        <div className="card-body mt-4">
                                            {/* <a> */}
                                            <h5 className="">{item.title.slice(0, 12)} </h5>
                                            {/* </a> */}
                                            <div class="align-items-center">
                                                <div class="d-flex justify-content-center text-align-center gap-5">
                                                    <div class=" align-items-center">
                                                        <div class="d-flex justify-content-center text-align-center gap-5">
                                                            {item?.nft_data.length == 1 ? (
                                                                <span>Total NFT :</span>
                                                            ) : (
                                                                <span>Total NFTs :</span>
                                                            )
                                                            }
                                                            <span>{item?.nft_data?.length}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div >
            </div >
        </section >
    );
}
export default Collections;