// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom';
// import { getPublicLiveProjects, LatestProjectDetail } from '../../redux/Actions/projectAction';

// const ProjNFTS = () => {


//     const dispatch = useDispatch()
//     const { id } = useParams();
//     const latprojdetail = useSelector(state => {
//         // 
//         return state.projectdetails.latestprojectdetails
//     })

//     useEffect(() => {
//         // 
//         dispatch(LatestProjectDetail(id))

//     }, [id])
//     return (
//         <section className="live-auctions-area single_project-detail">
//             <div className="container">
//                 <div className='intro row m-0'>
//                     <div className="intro-content">
//                         <span style={{ marginLeft: "15px" }}>NFTs</span>
//                         <h3 className="w-full mb-0">NFTs</h3>
//                     </div>
//                 </div>


//                 <div className="row items">

//                     {latprojdetail?.nft_data?.map((item, idx) => {
//                         return (
//                             <div key={`auct_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
//                                 {/* <div className="intro text-center">
//                                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati <br /> dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</p>
//                                 </div> */}
//                                 <div className="card">

//                                     <div className="image-over">
//                                         <Link to={`/nftprojdetails/${item.id}`}>
//                                             <img className="card-img-top" src={item.image} alt="" />
//                                         </Link>
//                                     </div>
//                                     {/* Card Caption */}
//                                     <div className="card-caption col-12 p-0">
//                                         {/* Card Body */}
//                                         <div className="card-body">
//                                             <div className="countdown-times mb-3">
//                                                 <div className="countdown d-flex" data-date={item.end_date} />
//                                             </div>
//                                             <a href="/item-details">
//                                                 <h5 className="mb-0">{item.title.toUpperCase()} {item.token_id}</h5>
//                                             </a>
//                                             {/* <a className="seller d-flex align-items-center my-3">
//                                                 <img className="avatar-sm rounded-circle"
//                                                     src='https://images.unsplash.com/photo-1547555999-14e818e09e33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80' alt="" />
//                                                 <span className="ml-2">{item.from}</span>
//                                             </a> */}
//                                             <div className="card-bottom d-flex">
//                                                 <span dangerouslySetInnerHTML={{ __html: item.description.slice(0, 28).toUpperCase() }} /><span></span>
//                                             </div>

//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//                 {/* {
//                 <div className="row">
//                     <div className="col-12 text-center">
//                         <a className="btn btn-bordered-white mt-5">Load More</a>
//                     </div>
//                 </div>
//                } */}
//             </div>
//         </section >
//     );

// }

// export default ProjNFTS;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPublicLiveProjects, LatestProjectDetail } from '../../redux/Actions/projectAction';
import { getPopularCollectiondetails } from '../../redux/Slices/popularCollectionSlice';

const CollectionNFTS = () => {


    const dispatch = useDispatch()
    const { id } = useParams();
    const collNft = useSelector(state => {
        // 
        return state?.collection?.collectiondetail
    })
    console.log(collNft, "collNft")
    useEffect(() => {

        dispatch(getPopularCollectiondetails())
    }, [dispatch])
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

                    {collNft?.nft_data?.map((item, idx) => {
                        return (
                            <div key={`auct_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                {/* <div className="intro text-center">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati <br /> dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</p>
                                </div> */}
                                <div className="card">

                                    <div className="image-over">
                                        <Link to={`/nftprojdetails/${item.id}`}>
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
                                            <a href="/item-details">
                                                <h5 className="mb-0">{item.title.slice(0,20)}...</h5>
                                            </a>
                                            {/* <a className="seller d-flex align-items-center my-3">
                                                <img className="avatar-sm rounded-circle"
                                                    src='https://images.unsplash.com/photo-1547555999-14e818e09e33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80' alt="" />
                                                <span className="ml-2">{item.from}</span>
                                            </a> */}
                                            <div className="card-bottom d-flex">
                                                <span dangerouslySetInnerHTML={{ __html: item.description.slice(0, 50) }} />
                                            </div>

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

export default CollectionNFTS;