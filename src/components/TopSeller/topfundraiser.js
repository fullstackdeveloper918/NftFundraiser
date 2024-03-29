import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TopFundraiserAction } from '../../redux/Actions/fundraiserAction';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';



const Fundraiser = () => {
    const dispatch = useDispatch()


    const fund = useSelector(state => {
        return state?.fundraiser?.fundraiser
    })

    useEffect(() => {
        dispatch(TopFundraiserAction({}))
    }, [dispatch])


    return (
        <section className="top-seller-area">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>Fundraisers</span>
                                <h3 className="mt-3 mb-0">Top Fundraisers</h3>
                            </div>

                            <div className="intro-btn">
                                {fund?.length > 5 &&

                                    <Link className="btn content-btn" to='/allfundraise'>View All</Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row items">
                    {fund?.map((item, idx) => {
                        return (
                            <div key={`ts_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                {/* Single Seller */}
                                <Link to={`/fundraiser/detail/${item.user_id}`}>
                                    <div className="card no-hover">
                                        <div className="single-seller d-flex align-items-center">

                                            <img className="avatar-md rounded-circle" src={item?.organization_detail?.banner_image} alt="" />

                                            {/* Seller Info */}
                                            <div className="seller-info ml-3 nft-price">
                                                <a className="seller mb-2 text-capitalize">{item?.organization_detail?.organization_name}</a>
                                                {/* <span dangerouslySetInnerHTML={{ __html: item?.organization_detail?.description?.slice(0, 15) }} /> */}
                                                <span><img className="mr-1" src='../../img/image14.png' /> ${Number(Math.round(item.amount))} Raised</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                    {fund?.length === 0 &&
                  
                    <div className="no-data">
                      <Empty />
                    </div>
}
                  
                </div>
            </div>
        </section>
    );

}

export default Fundraiser;