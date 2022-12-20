import dayjs from 'dayjs';
import React, { Component, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { DeleteProject, GetCollectionDetails, ProjectDetail } from '../../redux/Actions/projectAction';
import NftdataTable from '../Explore/nftdataTable';
import Banner from './editBanner';
import EditNft from './editNft';
const ProjNftDetails = () => {
    const deleteHandler = (id) => {
        dispatch(DeleteProject(id))
    }

    const { id } = useParams()
    // console.log(id, 'idd')
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShoww, setModalShoww] = React.useState(false);
    const [modalShowadd, setModalShowadd] = React.useState(false);

    const dispatch = useDispatch()

    const projdetail = useSelector(state => {
        // 
        return state?.projectdetails?.projectdetails
    })
    console.log(projdetail, 'projdata')

    useEffect(() => {
        // 
        dispatch(ProjectDetail(id))
    }, [id])


    // const deleteHandler = (id) => {
    //     dispatch(DeleteProject(id))
    // }
    // 
    const bannerHandler = () => {

    }
    return (
        <section className="item-details-area project-nft-si main-proj-detail">
            <div className="container">
                <div className="row justify-content-between p-0">

                    <div className="col-12 col-lg-12 relative">
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
                        <div className="project_img">
                            <img class="avatar-sm rounded-circle" src={projdetail?.user_data?.avatar} alt="" />
                        </div>

                    </div>

                    <div className="cart col-12 col-lg-12 content-baner mt-md-5">
                        <div className="content mt-5 mt-lg-0">
                            <div className='align-items-center justify-content-between'>
                                <div className='d-sm-flex justify-content-between align-items-center'>
                                    <h3 className="m-0 p-0">{projdetail.title}</h3>
                                    <h5 className="detail_url"><a >{projdetail?.user_data?.username}</a></h5>
                                </div>
                                <div className='project-total-detail pt-3 pb-4'>

                                    <div>
                                        <span>Owned By:</span> <span>{projdetail?.user_data?.username}</span>
                                    </div>
                                    <div>
                                        <span>Total NFT's:</span><span>{projdetail?.number_of_nft}</span>
                                    </div>
                                    <div>
                                        <span>Chain: </span><span>Polygon (Matic)</span>
                                    </div>

                                    <div>
                                        <span>Created : </span><span>{dayjs(projdetail?.created_at).format("DD MMM YYYY")}</span>
                                    </div>
                                </div>
                                <div>

                                    <h5 className='user_title'><div>Project Description</div>
                                        {/* <i class="fa-solid fa-pen" ></i>
                                                    <i class="fa-sharp fa-solid fa-trash"></i> */}

                                        {projdetail?.status == 1 && (
                                            <div >

                                                <a className=""> <Link to={`/updateproject/${projdetail.id}`} style={{ color: '#FFF' }}> <i class="fa-solid fa-pen" ></i></Link></a>
                                                {/* <a className="" onClick={() => deleteHandler(projdetail.id)} style={{ color: '#FFF' }}> <i class="fa-sharp fa-solid fa-trash"></i> */}
                                                {/* </a> */}
                                            </div>
                                        )}
                                    </h5>
                                </div>

                            </div>
                            {/* footer?.footer?.description }} */}
                            <p dangerouslySetInnerHTML={{ __html: projdetail.description }} />



                        </div>

                    </div>

                    {/* <CollItem /> */}
                </div>
            </div>



            <div className="container mt-5">
                <div className='intro row m-0'>
                    <div className="intro-content">
                        <span >NFTs</span>
                        <h3 className="w-full mb-0 pt-4">NFTs</h3>
                    </div>
                </div>

                <div>
                    <Link to={`/addnft/${projdetail.id}`}>+ Add NFT</Link>
                    {/* <AddNFT
                        id={id}
                        show={modalShowadd}
                        onHide={() => setModalShowadd(false)} /> */}
                </div>
                <div className="row items mt-0 explore-items px-0">

                    {projdetail?.nft_data?.map((x, idx) => {
                        // {projdetail?.map((item, idx) => {
                        return (
                            <div key={`eds_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item mt-lg-0">
                                <div className="card no-hover m-0">
                                    <div>
                                        <i className="fa-solid fa-pen" onClick={() => setModalShoww(true)}></i>

                                        <EditNft
                                            id={id}
                                            nft_id={x.id}
                                            show={modalShoww}
                                            onHide={() => setModalShoww(false)} />
                                    </div>

                                    {/* <i class="fa-sharp fa-solid fa-trash"></i> */}
                                    <div className="image-over relative">
                                        <Link to={`/nft/details/${x.id}`}>
                                            <img className="card-img-top" src={x.image} alt="" />
                                        </Link>
                                        <div className='token'>
                                            <span>#{x?.token_id}</span>
                                        </div>
                                        {/* Author */}

                                    </div>
                                    {/* Card Caption */}
                                    <div className="card-caption px-0 col-12 ">
                                        {/* Card Body */}
                                        <div className="card-body">

                                            <a href="#" className="d-flex justify-content-between align-items-center">
                                                <h5 className="m-0 pb-2 p-0 text-capitalize">{x.title.slice(0, 22)}</h5>
                                                {/* <span>...</span> */}
                                            </a>
                                            <div className='creater mt-1 mb-1'>
                                                <span >Creator:</span><span className='ml-2'>{x?.user_data?.username}</span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-end mt-1 mb-1">
                                                <span dangerouslySetInnerHTML={{ __html: x.description.slice(0, 22) }} /><span>...</span>
                                            </div>


                                            <div className='mint'>
                                                {x.is_mint == 0 ? (

                                                    <button>
                                                        <a href='#'>Mint</a>
                                                    </button>
                                                ) : (
                                                    <button disabled>
                                                        <a >Minted</a>
                                                    </button>
                                                )}
                                            </div>

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