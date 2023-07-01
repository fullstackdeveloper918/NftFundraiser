import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getPublicLiveProjects } from "../../redux/Actions/projectAction";
import { useState } from "react";
import Loader from "../Loader/loader";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Empty } from "antd";

const projectTypesMap = {
  LatestProjects: 2,
  RecentCampaigns: 1,
};
const AuctionsOne = ({ type }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const liveProjects = useSelector((state) => {
    return state?.projectdetails?.liveProjects[type];
  });

  const [selected, setSelected] = React.useState([]);

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getPublicLiveProjects({
        cursor: 1,
        type: projectTypesMap[type],
        projectType: type,
        location,
        count,
        setData,
      })
    ).then((res) => {
      if (res) setLoading(false);
    });
  }, [dispatch]);

  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id);

      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      );
    };

  function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
      React.useContext(VisibilityContext);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "10px",
        }}
      >
        <LeftOutlined
          disabled={isFirstItemVisible}
          onClick={() => scrollPrev()}
        />
      </div>
    );
  }

  function RightArrow() {
    const { isLastItemVisible, scrollNext } =
      React.useContext(VisibilityContext);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "20px",
        }}
      >
        <RightOutlined
          disabled={isLastItemVisible}
          onClick={() => scrollNext()}
        />
      </div>
    );
  }

  return (
    <section className="live-auctions-area">
      <div className="container">
        <div className="row">
          <div className="col-12 " style={{ marginBottom: "20px" }}>
            {/* Intro */}
            <div className="intro d-flex justify-content-between align-items-end m-0">
              <div className="intro-content">
                <span>Project</span>
                <h3 className="mt-3 mb-0">
                  {type.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}
                </h3>
              </div>
              <div className="intro-btn">
                {liveProjects?.data?.length > 4 && (
                  <Link to={`/all/${type}`} style={{ color: "white" }}>
                    <a className="btn content-btn">View All</a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="auctions-slides ">
          <div className="swiper-container slider-mid items ">
            {/* Single Slide */}
            {loading ? (
              <Loader height="30px" width="30px" />
            ) : (
              <>
                <ScrollMenu LeftArrow={liveProjects?.data?.length > 4 && LeftArrow} RightArrow={liveProjects?.data?.length > 4 && RightArrow}>
                  
                  {liveProjects?.data?.map((item, idx) => {
                    return (
                      <div
                        onClick={() => handleClick(item.id)}
                        style={{
                          width: "280px",
                          height: "448px",
                          maxWidth: "290px",
                          marginLeft: "20px",
                          maxHeight: "450px",
                          borderRadius: "5px",
                        }}
                        tabIndex={0}
                      >
                        <div className="card">
                          <div
                            key={`auc_${item.id}`}
                            // className="swiper-slide item card position-relative auctions-slides-card"
                          >
                            <div className="image-over">
                              <Link to={`/projects/${item.slug}`}>
                                <img
                                  className="card-img-top"
                                  src={item?.image}
                                  alt=""
                                />
                              </Link>
                            </div>
                            <div className="card-caption col-12 p-0">
                              <div className="card-body">
                                {/* <a> */}
                                <h5 className="mb-0">
                                  {item?.title?.slice(0, 34)}...
                                </h5>
                                {/* </a> */}
                                <div className="seller d-flex align-items-center my-3">
                                  <span>Owned By</span>
                                  {/* <a> */}
                                  <h6 className="ml-2 mb-0">
                                    {item?.user_data.username?.slice(0, 12)}
                                  </h6>
                                  {/* </a> */}
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
                                  {item?.number_of_nft === '1' ? (
                                    <span>{item.number_of_nft} NFT</span>
                                  ) : (
                                    <span>{item.number_of_nft} NFTs</span>
                                  )}
                                </div>
                                <div className="d-flex justify-content-between edit-buttons nft-price ">
                                  <a
                                    className="btn  btn-smaller mt-3 mb-0"
                                    href={`/projects/${item.slug}`}
                                  >
                                    <i className="icon-handbag" />
                                    {/* <i className="fa-solid fa-sack-dssollar"></i> */}
                                  </a>
                                  <a
                                    className="btn  btn-smaller mt-3 ml-2 mb-0"
                                    href={`/projects/${item.slug}`}
                                  >
                                    <i class="fa-solid fa-share-nodes text-white"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            height: "200px",
                          }}
                        />
                      </div>
                    );
                  })}
                  {liveProjects?.data?.length === 0 && 
                  <div className="no-data">
                      <Empty />
                    </div>
}
                </ScrollMenu>
              </>
            )}

            <div className="swiper-pagination" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default AuctionsOne;
