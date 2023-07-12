import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ResellAction } from "../../redux/Actions/resellNftAction";
import Loader from "../Loader/loader";
import { Empty } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay:true,
  slidesToShow: 4,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
const Resell = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const nfts = useSelector((state) => {
    return state?.resell?.resell;
  });

  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  useEffect(() => {
    setLoading(true);
    dispatch(ResellAction({ count: 1 })).then((res) => {
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

  

  

  return (
    <section className="live-auctions-area">
      <div className="container">
        <div className="row">
          <div className="col-12" style={{ marginBottom: "20px" }}>
            {/* Intro */}
            <div className="intro d-flex justify-content-between align-items-end m-0">
              <div className="intro-content">
                <span>NFTs</span>
                <h3 className="mt-3 mb-0">Latest NFTs</h3>
              </div>
              <div className="intro-btn">
                {nfts?.data?.length > 4 && (
                  <Link to="/all/resll/nfts" style={{ color: "white" }}>
                    <a className="btn content-btn">View All</a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>  
        <div className="auctions-slides ">
          <div className="swiper-container slider-mid items ">
            {/* <div className="swiper-wrapper  "> */}
            {/* Single Slide */}
            {loading ? (
              <Loader height="30px" width="30px" />
            ) : (
              <>
                 <Slider {...settings}>
                  {nfts?.data?.map((item, idx) => {
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
                        className="inner-slider-box"
                        tabIndex={0}
                      >
                        <div className="card">
                          <div
                            key={`auc_${item.id}`}
                            // className="swiper-slide item card position-relative auctions-slides-card"
                          >
                            <div className="image-over">
                              <Link to={`/nft/resell/details/${item.slug}`}>
                                <img
                                  className="card-img-top"
                                  src={item?.image}
                                  alt=""
                                />
                              </Link>
                              <div className="d-flex justify-content-between edit-buttons nft-price ">
                                  <Link
                                    to={`/nft/resell/details/${item.slug}`}
                                    style={{ color: "white" }}
                                    className="btn  btn-smaller mt-3 mb-0"
                                  >
                                    <i className="icon-handbag" />
                                  </Link>
                                  <Link
                                    to={`/nft/resell/details/${item.slug}`}
                                    className="btn  btn-smaller mt-3 ml-2 mb-0"
                                    style={{ color: "white" }}
                                  >
                                    <i class="fa-solid fa-share-nodes text-white"></i>
                                  </Link>
                                </div>
                            </div>
                            <div className="card-caption col-12 p-0">
                              <div className="card-body">
                                {/* <a> */}
                                <h5 className="mb-0">
                                  {item?.title?.slice(0, 18)}...
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
                                  <span>1 NFT</span>
                                </div>
                               
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    );
                  })}

                  {nfts?.data?.length === 0 && (
                    <div className="no-data">
                      <Empty />
                    </div>
                  )}
                </Slider>
              </>
            )}
            {/* </div> */}
            {/* <div className="swiper-pagination" /> */}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Resell;
