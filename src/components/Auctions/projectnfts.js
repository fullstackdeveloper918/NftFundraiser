
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPublicLiveProjects, LatestProjectDetail } from '../../redux/Actions/projectAction';

const ProjNFTS = () => {


    const dispatch = useDispatch()
    const { slug } = useParams();
    const latprojdetail = useSelector(state => {
        // 
        return state.projectdetails.latestprojectdetails
    })
    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })
    useEffect(() => {
        // 
        dispatch(LatestProjectDetail(slug))

    }, [slug])
    return (
        <section className="live-auctions-area single_project-detail">
            <div className="container">
                <div className='intro row m-0'>
                    <div className="intro-content">
                        <span style={{ marginLeft: "0px" }}>NFTs</span>
                        <h3 className="w-full mb-0">NFTs</h3>
                    </div>
                </div>


                <div className="row items">

                    {latprojdetail?.nft_data?.map((item, idx) => {
                        return (
                            <div key={`auct_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                {/* <div className="intro text-center">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati <br /> dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</p>
                                </div> */}
                                <div className="card">

                                    <div className="image-over">
                                        <Link to={`/nftprojdetails/${item.slug}`}>
                                            <img className="card-img-top" src={item.image} alt="" />
                                        </Link>
                                    </div>
                                    {/* Card Caption */}
                                    <div className="card-caption col-12 p-0">
                                        {/* Card Body */}
                                        <div className="card-body">
                                            {/* <div className="countdown-times mb-3">
                                                <div className="countdown d-flex" data-date={item.end_date} />
                                            </div> */}


                                            <h5 className="mb-0">{item.title.slice(0, 16)} ...</h5>

                                            {/* <a className="seller d-flex align-items-center my-3">
                                                <img className="avatar-sm rounded-circle"
                                                    src='https://images.unsplash.com/photo-1547555999-14e818e09e33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80' alt="" />
                                                <span className="ml-2">{item.from}</span>
                                            </a> */}
                                            <div className="card-bottom">
                                                <p dangerouslySetInnerHTML={{ __html: item.description.slice(0, 50) }} />
                                            </div>

                                            <div className='button_group buy-invest-btn'>
                                            <div className=''>
                                                            <a href="#"><button className='btn ml-lg-auto btn-bordered-white'>Buy</button></a>
                                                        </div>

                                                        <div className=''>
                                                            <a><button className='btn ml-lg-auto btn-bordered-white'>Invest</button></a>
                                                        </div>
                                            </div>
                                            {/* {item?.user_data?.user_id === userdet?.user_id && localStorage.getItem('authToken') && 

                                                {
                                                    item?.is_mint == 0 ? (
                                                        <div className='mint_btn'>
                                                            <a href="#"><button className='btn ml-lg-auto btn-bordered-white'>Mint</button></a>
                                                        </div>
                                                    ) : (

                                                        <div className='mint_btn'>
                                                            <a><button className='btn ml-lg-auto btn-bordered-white'>Minted</button></a>
                                                        </div>
                                                    )
                                                }
                                                
                                            } */}

                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* {
                <div className="row">
                    <div className="col-12 text-center">
                        <a className="btn btn-bordered-white mt-5">Load More</a>
                    </div>
                </div>
               } */}
            </div>
        </section >
    );

}

export default ProjNFTS;