import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import Loader from "../Loader/loader";
import { getPublicLiveProjects } from "../../redux/Actions/projectAction";

import { debounce } from "lodash";

const projectTypesMap = {
  LatestProjects: 2,
  RecentCampaigns: 1,
};

const ExploreAll = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData({ page: currentPage, searchQuery, isLoadMore: false });
  }, [searchQuery]);

  const fetchData = async ({ page, searchQuery, isLoadMore }) => {
    if (!loading) {
      setLoading(true);
      try {
        dispatch(
          getPublicLiveProjects({
            cursor: 1,
            type: projectTypesMap[type],
            projectType: type,
            setLoading,
            location,
            count: page,
            setData,
            data,
            searchQuery,
          })
        ).then((res) => {
          setLoading(false);
          if (isLoadMore) {
            setData([...data, ...res?.payload?.data]);
          } else {
            setData(res?.payload?.data);
          }

          setCurrentPage(Number(res?.payload?.current_page));
          setTotalPage(res?.payload?.totalPageCount);
        });
      } catch (error) {
        console.log("Error fetching data:", error);
        setLoading(false);
      }
    }
  };

  // Debounce function with a delay of 500 milliseconds
  const debouncedSearch = debounce((value) => {
    setSearchQuery(value);
  }, 500);

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
        {data?.length > 7 && (
          <input
            autoFocus
            placeholder="Enter your search keyword"
            onChange={(val) => debouncedSearch(val?.target?.value)}
          />
        )}
        <div className="row items explore-items h-auto mt-3">
          {loading ? (
            <Loader />
          ) : (
            <>
              {data?.length > 0 ? (
                <>
                  {data?.map((item, idx) => (
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
                              <div className="d-flex justify-content-between edit-buttons nft-price mt-2">
                                <Link
                                  to={`/projects/${item.slug}`}
                                  style={{ color: "white" }}
                                  className="btn  btn-smaller mt-3 mb-0"
                                >
                                  <i className="icon-handbag" />
                                </Link>
                                <Link
                                  to={`/projects/${item.slug}`}
                                  className="btn  btn-smaller mt-3 ml-2 mb-0"
                                  style={{ color: "white" }}
                                >
                                  <i class="fa-solid fa-share-nodes text-white"></i>
                                </Link>
                              </div>
                            </div>

                            <div className="card-caption col-12 p-0">
                              {/* Card Body */}
                              <div className="card-body">
                                {/* <div className="countdown-times ">
                                                        <div className="countdown d-flex justify-content-center" data-date={item.date} />
                                                    </div> */}
                                {/* <a > */}
                                <h5 className="mb-0">
                                  {item?.title?.slice(0, 15)}
                                </h5>
                                {/* </a> */}
                                <div className="seller d-flex align-items-center my-3">
                                  <span>Owned By</span>
                                  {/* <img className="avatar-sm rounded-circle" src={item?.user_data?.avatar} alt="" /> */}

                                  {/* <a > */}
                                  <h6 className="ml-2 mb-0">
                                    {item?.user_data?.username.slice(0, 12)}
                                  </h6>
                                  {/* </a> */}

                                  {/* <span className="ml-2 mb-0">{item.user_data.username}</span> */}
                                </div>
                                <div className="card-bottom d-flex justify-content-between nft-price">
                                  <span>
                                    <img
                                      className="mr-1"
                                      src="../img/image14.png"
                                      alt=""
                                    />
                                    {Math.round(item.price)} MATIC
                                  </span>
                                  {item?.number_of_nft === 1 ? (
                                    <span>{item.number_of_nft} NFT</span>
                                  ) : (
                                    <span>{item.number_of_nft} NFTs</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </Link>
                  ))}

                  {loading && data.length > 0 && (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Loader height="40px" width="40px" />
                    </div>
                  )}

                  {totalPage !== currentPage && (
                    <div
                      className="morebutton"
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <a
                        onClick={(e) =>
                          fetchData({ page: currentPage + 1, isLoadMore: true })
                        }
                        className="btn btn-bordered-white"
                      >
                        Load More
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <div className="col-12 col-sm-12 col-lg-12">
                  <h2 className="allproj2">No latest projects found</h2>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
export default ExploreAll;
