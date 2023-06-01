import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { GetCollectionDetails } from '../../redux/Actions/projectAction';
import { Button } from 'react-bootstrap';
import CollItem from './bread-crumb';
import ReadMore from '../../readMore';

const CollectionDetails = () => {

    const { id } = useParams();
    const [modalShow, setModalShow] = React.useState(false);

    const dispatch = useDispatch()

    const coldetail = useSelector(state => {
        return state?.projectdetails?.getcollectiondetails
    })

    useEffect(() => {
        dispatch(GetCollectionDetails(id))
    }, [id])

    return (
        <section className="item-details-area">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-12 col-lg-12">
                        <div className="item-info">

                            <><div className="item-thumb text-center">
                                <img src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' alt="" />
                            </div>


                            </>


                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="content mt-5 mt-lg-0">
                            <div className='d-flex  align-items-center justify-content-between'>
                                <h3 className="m-0">{coldetail.title}</h3>

                                <div className='eddlbtton d-flex  align-items-center '>
                                    <Button className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" variant="primary" onClick={() => setModalShow(true)} style={{ color: '#FFF' }}>
                                        Add item
                                    </Button>
                                </div>

                            </div>

                            <ReadMore data={coldetail?.description} />



                        </div>
                    </div>
                    <CollItem />
                </div>
            </div >


        </section >
    );

}

export default CollectionDetails;