import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ProjectList } from '../../redux/Actions/projectAction';
import Loader from '../Loader/loader';
import { DeleteProject } from './../../redux/Actions/projectAction';


const GetAllProjects = () => {
    const [loading, setLoading] = useState()    // console.log(projc, 'projc')
    const dispatch = useDispatch()

    const projects = useSelector(state => {
        return state.projectdetails.projects
    })

    console.log(projects, 'projects')

    useEffect(() => {
        dispatch(ProjectList())
    }, [dispatch])

    const showDeleteHandler = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // debugger
                dispatch(DeleteProject(id))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

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
                                    {window.ethereum?.selectedAddress && (

                                        <h3 className="mt-3 mb-0">My Projects</h3>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row items explore-items h-auto">
                            {projects && projects.length ?
                                [...new Map(projects.map(item =>
                                    [item["title"], item])).values()].map((item, idx) => {
                                        return (
                                            <Link key={`edth_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item">
                                                <div>
                                                    {/* <button onClick={() => showDeleteHandler()}>delete</button> */}
                                                    <div className="card project_cards">
                                                        <div className="image-over relative ">
                                                            <i class="fa-sharp fa-solid fa-trash" onClick={() => showDeleteHandler(item.id)}></i>
                                                            <Link to={`/projnftdetails/${item.slug}`}>
                                                                {/* <i class="fa-solid fa-pen" ></i> */}
                                                                <img className="card-img-top" src={item?.image} alt={item.nft_data.description} />
                                                            </Link>
                                                        </div>
                                                        <div className='token'>
                                                            <span></span>
                                                        </div>
                                                        {/* Card Caption */}
                                                        <div className="card-caption col-12 p-0">
                                                            {/* Card Body */}
                                                            <div className="card-body">
                                                                <a>
                                                                    <h5 className="mb-0">{item.title.slice(0, 20)}</h5>
                                                                </a>
                                                                <div className="seller d-flex align-items-center my-3">
                                                                    <span>Owned By</span>
                                                                    <a href="/author">
                                                                        <h6 className="ml-2 mb-0">You</h6>
                                                                    </a>
                                                                </div>
                                                                <div className="card-bottom d-flex justify-content-between">
                                                                    <span>{item.price} MATIC</span>

                                                                    {item.nft_data.length == 1 ? (

                                                                        <span>{item.nft_data.length} NFT </span>
                                                                    ) : (
                                                                        <><span>{item.nft_data.length} NFTs </span>
                                                                            <span> + {item.number_of_nft} NFTs </span></>
                                                                    )}
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
                                <div className="col-12 col-sm-12 col-lg-12">
                                    {window.ethereum?.selectedAddress ? (
                                        <h2 className='allproj2'>
                                            You have no project yet, <Link to="/create">Create one</Link>
                                        </h2>

                                    ) : (
                                        <h2 className='allproj2'>
                                            Please connect you wallet to continue, <Link to="/wallet-connect">Connect</Link>
                                        </h2>
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                </section>
            )}
        </>
    );

}

export default GetAllProjects; 