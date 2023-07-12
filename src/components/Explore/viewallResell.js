import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ResellAction } from "../../redux/Actions/resellNftAction";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "../Loader/loader";
import { debounce } from "lodash";

const ExploreAllResell = () => {
  const dispatch = useDispatch();
 
  const [count, setCount] = useState(1);
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData({ page: currentPage, isLoadMore: false, searchQuery });
  }, [searchQuery]);

  const fetchData = async ({ page, isLoadMore, searchQuery }) => {
    if (!loading) {
      setLoading(true);
      try {
        dispatch(
          ResellAction({
            cursor: 1,
            setCount,
            setLoading,
            location,
            count: page,
            searchQuery,
          })
        ).then((res) => {
          setLoading(false);

          if (isLoadMore) {
            setData([...data, ...res?.data]);
          } else {
            setData(res?.data);
          }

          setCurrentPage(Number(res?.current_page));
          setTotalPage(res?.totalPageCount);
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
              <h3 className="mt-3 mb-0">All Reselled NFTs</h3>
              <p>
                Invest in NFTs that are based on real-life projects or events
                related to important causes
              </p>
            </div>
          </div>
        </div>

        <input
          autoFocus
          placeholder="Enter your search keyword"
          onChange={(val) => debouncedSearch(val?.target?.value)}
        />

        <div className="row items explore-items h-auto mt-3">
          {loading ? (
            <Loader />
          ) : (
            <>
              {data?.length > 0 ? (
                <>
                  {data?.map((item, idx) => {
                    return (
                      <Link
                        key={`edth_${idx}`}
                        className="col-12 col-sm-6 col-lg-3 item explore-item"
                      >
                        <div>
                          <Link to={`/nft/resell/details/${item?.slug}`}>
                            <div className="card">
                              <div className="image-over">
                                <Link to={`/nft/resell/details/${item?.slug}`}>
                                  <img
                                    className="card-img-top"
                                    src={item?.image}
                                    alt=""
                                  />
                                </Link>
                                <div className="d-flex justify-content-between edit-buttons nft-price mt-2">
                                    <Link
                                      to={`/nft/resell/details/${item?.slug}`}
                                      style={{ color: "white" }}
                                      className="btn  btn-smaller mt-3 mb-0"
                                    >
                                      <i className="icon-handbag" />
                                      {/* <i className="fa-solid fa-sack-dssollar"></i> */}
                                    </Link>
                                    <Link
                                      to={`/nft/resell/details/${item?.slug}`}
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
                                 
                                  <a>
                                    <h5 className="mb-0">
                                      {item?.title?.slice(0, 15)}
                                    </h5>
                                  </a>
                                  <div className="seller d-flex align-items-center my-3">
                                    <span>Owned By</span>

                                    <a>
                                      <h6 className="ml-2 mb-0">
                                        {item?.user_data?.username?.slice(0, 12)}
                                      </h6>
                                    </a>

                                  </div>
                                  <div className="card-bottom d-flex justify-content-between nft-price">
                                    <span>
                                      <img
                                        className="mr-1"
                                        src="../../img/image14.png"
                                        alt=""
                                      />
                                      {Math.round(item?.price)} MATIC
                                    </span>
                                    {/* {item?.number_of_nft == 1 ? ( */}
                                    <span>1 NFT</span>
                                    {/* ) : ( */}
                                    {/* <span>{item.number_of_nft} NFTs</span> */}
                                    {/* )} */}
                                  </div>
                                 
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </Link>
                    );
                  })}

                  {loading && data?.length > 0 && (
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
                  <h2 className="allproj2">No NFTs found</h2>
                </div>
              )}
            </>
          )}
        </div>
        
      </div>
    </section>
  );
};
export default ExploreAllResell;
