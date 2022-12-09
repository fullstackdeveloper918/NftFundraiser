import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { DeleteProject, GetCollectionDetails, ProjectDetail } from '../../redux/Actions/projectAction';
import { getProjectDetail } from '../../redux/Slices/projectSlice';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Author from '../Author/Author';
import CollItem from './bread-crumb';

const CollectionDetails = () => {

    const initData = {
        itemImg: "/img/avtar1.png",
        date: "2022-03-30",
        tab_1: "Bids",
        tab_2: "History",
        tab_3: "Details",
        ownerImg: "/img/avtar1.png",
        itemOwner: "Themeland",
        created: "15 Jul 2021",
        title: "Walking On Air",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
        price_1: "1.5 ETH",
        price_2: "$500.89",
        count: "1 of 5",
        size: "14000 x 14000 px",
        volume: "64.1",
        highest_bid: "2.9 BNB",
        bid_count: "1 of 5",
        btnText: "Place a Bid"
    }
    const tabData_1 = [
        {
            id: "1",
            img: "/img/avtar1.png",
            price: "14 ETH",
            time: "4 hours ago",
            author: "@arham"
        },
        {
            id: "2",
            img: "/img/avtar2.jpg",
            price: "10 ETH",
            time: "8 hours ago",
            author: "@junaid"
        },
        {
            id: "3",
            img: "/img/avtar3.png",
            price: "12 ETH",
            time: "3 hours ago",
            author: "@yasmin"
        }
    ]

    const tabData_2 = [
        {
            id: "1",
            img: "/img/avtar1.png",
            price: "32 ETH",
            time: "10 hours ago",
            author: "@hasan"
        },
        {
            id: "2",
            img: "/img/avtar2.jpg",
            price: "24 ETH",
            time: "6 hours ago",
            author: "@artnox"
        },
        {
            id: "3",
            img: "/img/avtar3.png",
            price: "29 ETH",
            time: "12 hours ago",
            author: "@meez"
        }
    ]

    const sellerData = [
        {
            id: "1",
            img: "/img/avtar1.png",
            seller: "@ArtNoxStudio",
            post: "Creator"
        },
        {
            id: "2",
            img: "/img/avtar2.jpg",
            seller: "Virtual Worlds",
            post: "Collection"
        }
    ]

    const { id } = useParams();
    // console.log(id, 'idd')
    const [modalShow, setModalShow] = React.useState(false);

    const dispatch = useDispatch()

    const coldetail = useSelector(state => {
        return state?.projectdetails?.getcollectiondetails
    })
    // console.log(coldetail, 'coldetail')

    useEffect(() => {
        dispatch(GetCollectionDetails(id))
    }, [id])

    // const deleteHandler = (id) => {
    //     dispatch(DeleteProject(id))
    // }


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

                                    {/* <MyVerticallyCenteredModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    /> */}
                                    {/* <a className="btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2"> <Link to={""} style={{ color: '#FFF' }}>Add item</Link></a> */}
                                </div>

                            </div>
                            <p>{coldetail.description}</p>



                        </div>
                    </div>
                    <CollItem />
                </div>
            </div >


        </section >
    );

}

export default CollectionDetails;