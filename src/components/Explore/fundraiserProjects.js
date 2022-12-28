import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TopFundraiserAction } from '../../redux/Actions/fundraiserAction';
import { ProjectList } from '../../redux/Actions/projectAction';
import Loader from '../Loader/loader';
import { DeleteProject } from './../../redux/Actions/projectAction';


const GetAllFundraise = () => {
    const [loading, setLoading] = useState()    // console.log(projc, 'projc')
    const dispatch = useDispatch()

    const fund = useSelector(state => {
        return state?.fundraiser?.fundraiser
    })
    console.log(fund, 'fdd')

    useEffect(() => {
        dispatch(TopFundraiserAction({}))
    }, [dispatch])




    return (
        <>

            {loading ? (
                <Loader />
            ) : (

                <section className="explore-area">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-7">
                                {/* Intro */}
                                <div className="intro text-center mb-4">
                                    {/* <span>Explore</span> */}
                                    <h3 className="mt-3 mb-0">All Fundraiser's</h3>
                                </div>
                            </div>
                        </div>

                        <div className="row items explore-items h-auto">
                            {/* {fund && fund.length ?
                                [...new Map(fund.map(item =>
                                    [item["title"], item])).values()].map((item, idx) => { */}
                            {fund?.map((item, idx) => {

                                return (
                                    <Link key={`edth_${idx}`} to={`/fundraiser/detail/${item.user_id}`} className="col-12 col-sm-6 col-lg-3 item explore-item">
                                        <div>
                                            <div className="card project_cards">
                                                <div className="image-over relative ">
                                                    {/* <i class="fa-solid fa-pen" ></i>
                                                    <i class="fa-sharp fa-solid fa-trash"></i> */}
                                                    <img className="card-img-top" src={item?.avatar} />
                                                </div>
                                                <div className='token'>
                                                    <span></span>
                                                </div>
                                                {/* Card Caption */}
                                                <div className="card-caption col-12 p-0">
                                                    {/* Card Body */}
                                                    <div className="card-body">
                                                        <a>
                                                            <h5 className="mb-0">@ {item?.username}</h5>
                                                        </a>
                                                        {/* <div className="seller d-flex align-items-center my-3">
                                                                    <span>Owned By</span>
                                                                    <a href="/author">
                                                                        <h6 className="ml-2 mb-0">You</h6>
                                                                    </a>
                                                                </div> */}
                                                        <div className="card-bottom d-flex justify-content-between">
                                                            <span>{item.amount} MATIC</span>
                                                            {/* <span>{item.nft_data.length} NFTS </span> */}
                                                            {/* <span> + {item.number_of_nft} NFTS </span> */}
                                                        </div>

                                                        {/* <a className="btn btn-bordered-white btn-smaller mt-3"> <Link to={`/updateproject/${item.id}`}>Edit</Link></a> */}
                                                        {/* <a className="btn btn-bordered-white btn-smaller mt-3" onClick={() => deleteHandler(item.id)}>Delete</a> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                            {/* }) :
                                <div className="col-12 col-sm-12 col-lg-12">
                                    <h2 className='allproj2'>
                                        You have no project yet, <Link to="/create">Create one</Link>
                                    </h2>
                                </div>
                            } */}
                        </div>
                    </div>
                </section>
            )}
        </>
    );

}

export default GetAllFundraise; 