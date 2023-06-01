import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import Loader from "../Loader/loader";
import {
  CategoriesAction,
  getPublicLiveProjects,
} from "../../redux/Actions/projectAction";
import { Button, Pagination } from "antd";

const projectTypesMap = {
  LatestProjects: 2,
  RecentCampaigns: 1,
};

const ExploreAll = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  console.log('count', count)
  const [currentPage, setCurrentPage] = useState(1);

  const liveProjects = useSelector((state) => {
    return state?.projectdetails?.liveProjects[type];
  });
  const liveProjectspag = useSelector((state) => {
    return state?.projectdetails?.liveProjectsPag;
  });
  console.log(liveProjects, "live");


  const handleIncrement = () => {
    // 
    // if (startDate && endDate && numberofNfts) {

    // setCount(prevCount => prevCount + 1)
    dispatch(
      getPublicLiveProjects({
        cursor: 1,
        type: projectTypesMap[type],
        projectType: type,
        setCount,
        setLoading,
        location,
        count: count + 1,
      })
    );
    // }
  };


  const handleDecrement = () => {
    dispatch(
      getPublicLiveProjects({
        cursor: 1,
        type: projectTypesMap[type],
        projectType: type,
        setLoading,
        setCount,
        location,
        count: count - 1,
      })
    );
  };
  useEffect(() => {
    // 

    dispatch(
      getPublicLiveProjects({
        cursor: 1,
        type: projectTypesMap[type],
        projectType: type,
        setLoading,
        location,
        setCount,
        count,
      })
    );
  }, [dispatch, type]);

  return (
    <section className="explore-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            <div className="intro text-center mb-4">
              <h3 className="mt-3 mb-0">
                {type.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}
              </h3>
              <p>
                Invest in NFTs that are based on real-life projects or events
                related to important causes
              </p>
            </div>
          </div>
        </div>

        <div className="row items explore-items h-auto">
          {loading ? (
            <Loader />
          ) : (
            <>
              {liveProjects?.data && liveProjects?.data?.length ? (
                [
                  ...new Map(
                    liveProjects?.data?.map((item) => [item["title"], item])
                  ).values(),
                ].map((item, idx) => {
                  return (
                    <Link
                      key={`edth_${idx}`}
                      className="col-12 col-sm-6 col-lg-3 item explore-item"
                    >
                      <div>
                        <Link to={`/projects/${item.slug}`}>
                          <div className="card">
                            <div className="image-over">
                              <Link to={`/projects/${item.slug}`}>
                                <img
                                  className="card-img-top"
                                  src={item.image}
                                  alt=""
                                />
                              </Link>
                              {/* <div className="image-over">
                                                        <img className="card-img-top" src={item.image} alt="" /> */}
                            </div>

                            <div className="card-caption col-12 p-0">
                              {/* Card Body */}
                              <div className="card-body">
                                {/* <div className="countdown-times ">
                                                        <div className="countdown d-flex justify-content-center" data-date={item.date} />
                                                    </div> */}
                                {/* <a > */}
                                <h5 className="mb-0">
                                  {item.title.slice(0, 15)}
                                </h5>
                                {/* </a> */}
                                <div
                                  className="seller d-flex align-items-center my-3"

                                >
                                  <span>Owned By</span>
                                  {/* <img className="avatar-sm rounded-circle" src={item?.user_data?.avatar} alt="" /> */}

                                  {/* <a > */}
                                  <h6 className="ml-2 mb-0">
                                    {item.user_data.username.slice(0, 12)}
                                  </h6>
                                  {/* </a> */}

                                  {/* <span className="ml-2 mb-0">{item.user_data.username}</span> */}
                                </div>
                                <div className="card-bottom d-flex justify-content-between nft-price">
                                  <span><img className="mr-1" src='../img/image14.png' />{Math.round(item.price)} MATIC</span>
                                  {item?.number_of_nft == 1 ? (
                                    <span>{item.number_of_nft} NFT</span>
                                  ) : (
                                    <span>{item.number_of_nft} NFTs</span>
                                  )}
                                </div>
                                <div className="d-flex justify-content-between edit-buttons nft-price mt-2">
                                  <Link to={`/projects/${item.slug}`} style={{ color: "white" }} className="btn  btn-smaller mt-3 mb-0">


                                    <i className="icon-handbag" />
                                    {/* <i className="fa-solid fa-sack-dssollar"></i> */}
                                  </Link>
                                  <Link to={`/projects/${item.slug}`} className="btn  btn-smaller mt-3 ml-2 mb-0" style={{ color: "white" }}>


                                    <i class="fa-solid fa-share-nodes text-white"></i>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="col-12 col-sm-12 col-lg-12">
                  <h2 className="allproj2">No latest project found</h2>
                </div>
              )}
            </>
          )}
        </div>
        {/* <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={liveProjects?.data_count}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}
        /> */}
        {liveProjects.current_page != liveProjects.totalPageCount ? (
          // <>
          // {liveProjects?.data?.length > 8 &&
          <div className="morebutton"><a onClick={(e) => handleIncrement(e)} className="btn btn-bordered-white">Load More</a></div>
          // }
          // </>

        ) : (
          // <>
          // {liveProjects?.data?.length > 8 &&
          <div className="morebutton"><a onClick={(e) => handleDecrement(e)} className="btn btn-bordered-white">Load Previous</a></div>
          // }
          // </>
        )}
      </div>
    </section>
  );
};
export default ExploreAll;
