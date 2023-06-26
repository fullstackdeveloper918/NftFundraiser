import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { LatestProjectDetail } from '../../redux/Actions/projectAction';

const ProjNFTS = (props) => {

    const dispatch = useDispatch()
    const { slug } = useParams();
    const latprojdetail = useSelector(state => {
        return state.projectdetails.latestprojectdetails
    })
  
    useEffect(() => {
        dispatch(LatestProjectDetail(slug))
    }, [slug])

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
                    {latprojdetail?.nft_data?.map((item, idx) => {
                       
                        return (
                            
                                
                            <div key={`auct_${idx}`} className="col-12 col-sm-6 col-lg-3 item soldout-card">
                               <div className="inner-card">
                            {item.sold_nft == 1 && 
                            <div className='sold-outbtn'>SOLD OUT</div>  
                            }  
                            <div className="card">
        
                                    <div className="image-over">
                                        <Link to={item.sold_nft == 0 && `/nftprojdetails/${item.slug}?refid=${props.refid}`}>
                                            {item.extention === 'modal' || item.extention === 'Player' ? (
                                                <img className="card-img-top" src={item.preview_imag} alt="" />
                                            ) : (
                                                <img className="card-img-top" src={item.image} alt="" />
                                            )}
                                        </Link>
                                    </div>
                                    {/* Card Caption */}
                                    <div className="card-caption col-12 p-0 nfts-detail">
                                        {/* Card Body */}
                                        <div className="card-body">
                                            <h5 className="mb-0">{item.title.slice(0, 16)} ...</h5>
                                            <div className="card-bottom mt-1">
                                                <p dangerouslySetInnerHTML={{ __html: item.description.slice(0, 45) }} />
                                            </div>
                                            <div className='d-flex justify-content-between button_group buy-invest-btn align-items-center nft-price'>
                                                {item.sold_nft !== 1 && (
                                                
                                                    <a> <button className='d-flex align-items-center btn py-2 ml-lg-auto btn-bordered-white'><i className="icon-handbag mr-2" /> <Link to={item.sold_nft == 0 && `/nftprojdetails/${item.slug}?refid=${props.refid}`} style={{ color: "white" }}>Invest</Link></button></a>
                                                )}
                                                <a> <img className="mr-1" src='../img/image14.png' />{item.price}</a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section >
    );
}
export default ProjNFTS;