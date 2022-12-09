import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProjectList } from '../../redux/Actions/projectAction';
import { DeleteProject } from './../../redux/Actions/projectAction';


const GetAllProjects = () => {
    // console.log(projc, 'projc')
    const dispatch = useDispatch()

    const projects = useSelector(state => {
        return state.projectdetails.projects
    })

    // console.log(projects, 'projects')

    useEffect(() => {
        dispatch(ProjectList())
    }, [dispatch])

    const deleteHandler = (id) => {
        dispatch(DeleteProject(id))
    }

    return (
        <>
            <section className="explore-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center mb-4">
                                {/* <span>Explore</span> */}
                                <h3 className="mt-3 mb-0">My Projects</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center text-center">
                        <div className="col-12">
                            {/* Explore Menu */}

                            <div className="explore-menu btn-group btn-group-toggle flex-wrap justify-content-center text-center mb-4" data-toggle="buttons">
                                <label className="btn active d-table text-uppercase p-2">
                                    <input type="radio" defaultValue="all" defaultChecked className="explore-btn" />
                                    <span>All</span>
                                </label>
                                <label className="btn d-table text-uppercase p-2">
                                    <input type="radio" defaultValue="art" className="explore-btn" />
                                    <span>Art</span>
                                </label>
                                <label className="btn d-table text-uppercase p-2">
                                    <input type="radio" defaultValue="music" className="explore-btn" />
                                    <span>Music</span>
                                </label>
                                <label className="btn d-table text-uppercase p-2">
                                    <input type="radio" defaultValue="collectibles" className="explore-btn" />
                                    <span>Collectibles</span>
                                </label>
                                <label className="btn d-table text-uppercase p-2">
                                    <input type="radio" defaultValue="sports" className="explore-btn" />
                                    <span>Sports</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row items explore-items h-auto">
                        {projects && projects.length ?
                            [...new Map(projects.map(item =>
                                [item["title"], item])).values()].map((item, idx) => {
                                    return (
                                        <Link key={`edth_${idx}`} to={`/projnftdetails/${item.id}`} className="col-12 col-sm-6 col-lg-3 item explore-item">
                                            <div>
                                                <div className="card">
                                                    <div className="image-over">
                                                        <img className="card-img-top" src={item?.nft_data[0]?.image} alt={item.nft_data.description} />
                                                    </div>
                                                    {/* Card Caption */}
                                                    <div className="card-caption col-12 p-0">
                                                        {/* Card Body */}
                                                        <div className="card-body">
                                                            <a>
                                                                <h5 className="mb-0">{item.title}</h5>
                                                            </a>
                                                            <div className="seller d-flex align-items-center my-3">
                                                                <span>Owned By</span>
                                                                <a href="/author">
                                                                    <h6 className="ml-2 mb-0">You</h6>
                                                                </a>
                                                            </div>
                                                            <div className="card-bottom d-flex justify-content-between">
                                                                <span>{item.price} MATIC</span>
                                                                <span>{item.number_of_nft} NFTS</span>
                                                            </div>
                                                            {/* <div>
                                                                {item.status == '1' ?
                                                                    <Button>Mint</Button>
                                                                    :
                                                                    <div className='approval'>
                                                                        Waiting For Approval
                                                                    </div>
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
                            <div className="col-12 col-sm-12 col-lg-12">
                                <h2 className='allproj2'>
                                    No project found
                                </h2>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </>
    );

}

export default GetAllProjects; 