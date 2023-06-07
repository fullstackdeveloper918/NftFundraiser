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

  useEffect(() => {
    fetchData(currentPage);
  }, []);

  const fetchData = async (page) => {
    if (!loading) {
      setLoading(true);
      try {
        dispatch(
          ProjectList({
            setCount,
            count: page,
            location,
            setLoading,
          })
        ).then((res) => {
          console.log(res, "res");
          setLoading(false);
          setData([...data, ...res?.data]);
          setCurrentPage(Number(res?.current_page));
          setTotalPage(res?.totalPageCount);
        });
      } catch (error) {
        console.log("Error fetching data:", error);
        setLoading(false);
      }
    }
  };

  console.log(projects, "projects");
  const handleIncrement = () => {
    // if (startDate && endDate && numberofNfts) {

    // setCount(prevCount => prevCount + 1)
    dispatch(
      ProjectList({
        location,
        setCount,
        setLoading,

        count: count + 1,
      })
    );
    // }
  };
  const handleDecrement = () => {
    dispatch(
      ProjectList({
        setLoading,
        setCount,
        location,
        count: 1,
      })
    );
  };
  useEffect(() => {
    dispatch(
      ProjectList({
        setCount,
        count,
        location,
        setLoading,
      })
    );
  }, [dispatch]);

  const showDeleteHandler = (id) => {
    dispatch(DeleteProject(id, history));
  };

  return (
    <>
      <section className="explore-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              {/* Intro */}
              <div className="text-left mb-4 create_projrct">
                {/* <span>Explore</span> */}
                {window.ethereum?.selectedAddress && (
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

          <div className="row items explore-items h-auto">
            {loading ? (
              <Loader />
            ) : (
              <>
                {projects?.data && projects?.data?.length ? (
                  [
                    ...new Map(
                      projects?.data?.map((item) => [item["title"], item])
                    ).values(),
                  ].map((item, idx) => {
                    return (
                      // <Link key={`edth_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item">
                      <div className="col-12 col-sm-6 col-lg-3 item explore-item">
                        {/* <button onClick={() => showDeleteHandler()}>delete</button> */}
                        <div className="card project_cards">
                          <div className="image-over relative ">
                            {item.is_nft_mintted !== 1 && (
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
                    );
                  })
                ) : (
                  <div className="col-12 col-sm-12 col-lg-12">
                    {window.ethereum?.selectedAddress ? (
                      <h2 className="allproj2">
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
          {projects.current_page != projects.totalPageCount ? (
            <>
              <div className="morebutton">
                <a
                  onClick={(e) => handleIncrement(e)}
                  className="btn btn-bordered-white"
                >
                  Load More
                </a>
              </div>
            </>
          ) : (
            <>
              {projects?.data?.length > 8 && (
                <div className="morebutton">
                  <a
                    onClick={(e) => handleDecrement(e)}
                    className="btn btn-bordered-white"
                  >
                    Load Previous
                  </a>
                </div>
              )}
            </>
          )}
          {/* <div className="morebutton"><a onClick={(e) => handleIncrement(e)} className="btn btn-bordered-white">Load More</a></div> */}
          {/* <Pagination defaultCurrent={6} total={500} /> */}
        </div>
      </section>
    </>
  );
};

export default GetAllProjects;
