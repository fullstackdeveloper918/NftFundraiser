import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { ProjectList } from "../../redux/Actions/projectAction";
import Loader from "../Loader/loader";
import { DeleteProject } from "./../../redux/Actions/projectAction";
import swal from "sweetalert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { debounce } from "lodash";
import { Empty } from "antd";

const GetAllProjects = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const location = useLocation();
  const history = useHistory();
  const projects = useSelector((state) => {
    return state.projectdetails.projects;
  });

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
          ProjectList({
            setCount,
            count: page,
            location,
            setLoading,
            searchQuery,
            history,
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

  const showDeleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        ;
        dispatch(DeleteProject(id, history));
        Swal.fire("Deleted!", "Your project has been deleted.", "success").then(function(){

          window.location="/projectlist";
        })
      }
    });
  };

  // Debounce function with a delay of 500 milliseconds
  const debouncedSearch = debounce((value) => {
    setSearchQuery(value);
  }, 500);

  return (
    <>
      <section className="explore-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              {/* Intro */}
              <div className="text-left mb-4 create_projrct">
                {projects?.data?.length !== 0 && (
                  <h3 className="mb-0">My Projects</h3>
                )}
                <div>
                  {projects?.data?.length !== 0 && (
                    <Link to="/create">
                      <i class="fa-solid fa-plus create"> </i>{" "}
                      <span style={{ color: "#fff" }}>Create Project</span>
                    </Link>
                  )}
                </div>
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
                      // <Link key={`edth_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item">
                      <div className="col-12 col-sm-6 col-lg-3 item explore-item">
                        {/* <button onClick={() => showDeleteHandler()}>delete</button> */}
                        <div className="card project_cards">
                          <div className="image-over relative ">
                            {item.is_nft_mintted != 1 && (
                              <i
                                class="fa-sharp fa-solid fa-trash"
                                onClick={() => showDeleteHandler(item.id)}
                              ></i>
                            )}
                            <Link to={`/projnftdetails/${item.slug}`}>
                              {/* <i class="fa-solid fa-pen" ></i> */}
                              <img
                                className="card-img-top"
                                src={item?.image}
                                alt={item.nft_data.description}
                              />
                            </Link>
                          </div>
                          <div className="token">
                            <span></span>
                          </div>
                          {/* Card Caption */}
                          <div className="card-caption col-12 p-0">
                            {/* Card Body */}
                            <div className="card-body">
                              {/* <a> */}
                              <h5 className="mb-0 pb-0 break-all">
                                {item.title.slice(0, 16)}
                              </h5>
                              {/* </a> */}
                              <div className="seller d-flex align-items-center my-2">
                                <span>Owned By</span>

                                <h6 className="ml-2 mb-0">You</h6>
                              </div>
                              <div className="card-bottom d-flex justify-content-between">
                                <span>{item.price} MATIC</span>
                                {item?.number_of_nft == 1 ? (
                                  <span>{item?.number_of_nft} NFT </span>
                                ) : (
                                  // <><span>{item.nft_data.length} NFTs </span>
                                  <span> +{item.number_of_nft} NFTs </span>
                                )}
                              </div>

                              {/* <a className="btn btn-bordered-white btn-smaller mt-3"> <Link to={`/updateproject/${item.id}`}>Edit</Link></a> */}
                              {/* <a className="btn btn-bordered-white btn-smaller mt-3" onClick={() => deleteHandler(item.id)}>Delete</a> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      // </Link>
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
                            fetchData({
                              page: currentPage + 1,
                              isLoadMore: true,
                            })
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
                    {window.ethereum?.selectedAddress ? (
                      <h2 className="allproj2">
                        <Empty />
                        You have no projects yet,{" "}
                        <Link to="/create">create one now</Link>
                      </h2>
                    ) : (
                      <h2 className="allproj2">
                        Please connect you wallet to continue,{" "}
                        <Link to="/wallet-connect">Connect</Link>
                      </h2>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default GetAllProjects;
