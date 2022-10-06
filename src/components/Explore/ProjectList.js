import React, { Component, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProjectList } from '../../redux/Actions/projectAction';
import { DeleteProject } from './../../redux/Actions/projectAction';


const GetAllProjects = () => {

    // const [projc, setProjc] = useState([])
    // console.log(projc, 'projc')
    const dispatch = useDispatch()

    const proj = useSelector(state => {
        return state.projectdetails
    })
    useEffect(() => {
        dispatch(ProjectList())
    }, [dispatch])

    console.log(proj, 'projects')

    const deleteHandler = (id) => {

        dispatch(DeleteProject(id))
    }

    return (
        <section className="explore-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-7">
                        {/* Intro */}
                        <div className="intro text-center mb-4">
                            <span>Explore</span>
                            <h3 className="mt-3 mb-0">Projects</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</p>
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
                <div className="row items explore-items">
                    {proj?.projects?.map((item, idx) => {
                        return (
                            <div key={`edth_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item" data-groups={item.group}>
                                <div className="card">
                                    <div className="image-over">
                                        <Link to={`/item-details/${item.id}`}>
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
                                                <span>Owned By</span>
                                                <a href="/author">
                                                    <h6 className="ml-2 mb-0">{item.type}</h6>
                                                </a>
                                            </div>
                                            <div className="card-bottom d-flex justify-content-between">
                                                <span>{item.price}</span>
                                                <span>{item.count}</span>
                                            </div>
                                            <a className="btn btn-bordered-white btn-smaller mt-3"> <Link to={`/updateproject/${item.id}`}>Edit</Link></a>
                                            <a className="btn btn-bordered-white btn-smaller mt-3" onClick={() => deleteHandler(item.id)}>Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );

}

export default GetAllProjects; 