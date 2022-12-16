import React, { Component, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { DeleteProject, GetCollectionDetails, ProjectDetail } from '../../redux/Actions/projectAction';
import Banner from './editBanner';
const ProjNftDetails = () => {
    const deleteHandler = (id) => {
        dispatch(DeleteProject(id))
    }

    const { id } = useParams()
    // console.log(id, 'idd')
    const [modalShow, setModalShow] = React.useState(false);

    const dispatch = useDispatch()

    const projdetail = useSelector(state => {
        // debugger
        return state?.projectdetails?.projectdetails
    })
    // console.log(projdetail, 'projdata')

    useEffect(() => {
        // debugger
        dispatch(ProjectDetail(id))
    }, [id])


    // const deleteHandler = (id) => {
    //     dispatch(DeleteProject(id))
    // }
    // debugger
    const bannerHandler = () => {

    }
    return (
        <section className="item-details-area project-nft-si"   >
            <div className="container">
                <div className="row justify-content-between p-0">

                    <div className="col-12 col-lg-12">
                        <div className="item-info" >


                            <div className="item-thumb text-center">
                                {/* {projdetail && projdetail?.nft_data && projdetail?.nft_data?.length ? */}
                                <div>
                                    <i class="fa-solid fa-pen-to-square item-thumb-edit" onClick={() => 
                                      setModalShow(true)}></i>
                                        <Banner
                                            id={id}
                                            show={modalShow}
                                            onHide={() => setModalShow(false)} />
                                </div>
                                <img src={projdetail?.image} alt="first nft" />
                                {/* : null} */}
                            </div>

                        </div>
                        {/*                    
                                <div className="item-info" >

                                    <><div className="item-thumb text-center">
                                        <img src={x[0]?.image} alt="" />
                                    </div>


                                    </>


                                </div> */}

                    </div>

                    <div className="cart col-12 col-lg-12 content-baner">
                        <div className="content mt-5 mt-lg-0">
                            <div className='d-flex  align-items-center justify-content-between'>
                                <h3 className="m-0 ">{projdetail.title}</h3>

                                <div>
                                    {projdetail?.status == 0 && (
                                        <div className='eddlbtton d-flex  align-items-center px-2'>

                                            <a className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2"> <Link to={`/updateproject/${projdetail.id}`} style={{ color: '#FFF' }}>Edit</Link></a>
                                            <a className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-2" onClick={() => deleteHandler(projdetail.id)} style={{ color: '#FFF' }}>Delete</a>
                                        </div>
                                    )}
                                </div>

                            </div>
                            {/* footer?.footer?.description }} */}
                            <p dangerouslySetInnerHTML={{ __html: projdetail.description }} />



                        </div>

                    </div>

                    {/* <CollItem /> */}
                </div>
            </div>


            <div className="container">
                <div className='row mb-0'>
                    <h3 className="mb-0">NFTs</h3>
                </div>
                <div className="row items mt-0 explore-items px-0">

                    {projdetail?.nft_data?.map((x, idx) => {
                        // {projdetail?.map((item, idx) => {
                        return (
                            <div key={`eds_${idx}`} className="col-12 col-md-3 item explore-item mt-0">
                                <div className="card no-hover m-0">
                                    <div className="image-over">
                                        <Link to={`/nft/details/${x.id}`}>
                                            <img className="card-img-top" src={x.image} alt="" />
                                        </Link>
                                        {/* Author */}

                                    </div>
                                    {/* Card Caption */}
                                    <div className="card-caption px-0 col-12 ">
                                        {/* Card Body */}
                                        <div className="card-body">
                                            <a href="#">
                                                <h5 className="mt-3 m-0 pb-2 p-0">{x.title}</h5>
                                            </a>
                                            <span dangerouslySetInnerHTML={{ __html: x.description }} />

                                            <div className="card-bottom d-flex justify-content-between">
                                                {/* <span>{item.price}</span> */}
                                                {/* <span><i className="icon-heart mr-2" />{item.likes}</span> */}
                                            </div>
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

export default ProjNftDetails;