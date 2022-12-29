import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReadMore from '../../readMore';
import { TopFundraiserAction } from '../../redux/Actions/fundraiserAction';
import { ProjectList } from '../../redux/Actions/projectAction';
import FundDetail from '../../themes/fund-detail';
import latprojDetails from '../../themes/latproj-details';
import Loader from '../Loader/loader';
import { DeleteProject } from './../../redux/Actions/projectAction';


const GetAllFundraise = () => {


    const latprojdetail = useSelector(state => {
        // 
        return state.projectdetails.latestprojectdetails
    })
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
                                            <div className="card project_cards position-relative ">
                                                {/* matic */}
                                                {/* <div className="card-bottom d-flex justify-content-between">
                                                    <span className='matics'>{item.amount} MATIC</span>
                                                  
                                                </div> */}
                                                <div className="image-over position-relative ">
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
                                                        <img className='logo' src="/img/logo.png" alt='logo' width={50} height={50}/>
                                                        <a>
                                                            <h5 className="mb-0 mt-3">Youth for Env'tal Sust & Devt </h5>
                                                        </a>
                                                        {/* <div className="seller d-flex align-items-center my-3">
                                                                    <span>Owned By</span>
                                                                    <a href="/author">
                                                                        <h6 className="ml-2 mb-0">You</h6>
                                                                    </a>
                                                                </div> */}
                                                        <div className=''>

                                                          <p> It is a long established fact that a reader</p>

                                                        </div>
                                                        
                                                        <div  className='mb-2 d-flex align-items-center justify-content-between'>
                                                          <div  className='mt-2 mb-2 d-flex text-align-center fundraiser_sale'>
                                                          <div>
                                                                <span>Created</span>
                                                                <div>148</div>
                                                            </div>
                                                            <div>
                                                                 <span>Sale</span>
                                                                 <div>100</div>
                                                            </div>
                                                          </div>
                                                            
                                                          <span className='share'><svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                 <path fill="none" stroke="#fff" stroke-width="2" d="M18,8 C19.6568542,8 21,6.65685425 21,5 C21,3.34314575 19.6568542,2 18,2 C16.3431458,2 15,3.34314575 15,5 C15,6.65685425 16.3431458,8 18,8 Z M6,15 C7.65685425,15 9,13.6568542 9,12 C9,10.3431458 7.65685425,9 6,9 C4.34314575,9 3,10.3431458 3,12 C3,13.6568542 4.34314575,15 6,15 Z M18,22 C19.6568542,22 21,20.6568542 21,19 C21,17.3431458 19.6568542,16 18,16 C16.3431458,16 15,17.3431458 15,19 C15,20.6568542 16.3431458,22 18,22 Z M16,18 L8,13 M16,6 L8,11" />
                                                          </svg></span>
                                                        </div>
                                                        
                                                        <div className='donate-btn'>
                                                                <button className='btn ml-lg-auto btn-bordered-white'>Donate Now</button>
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