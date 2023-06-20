
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Collapse } from 'antd';
import { GetNftwol, ProjectDetail, ProjectList } from '../../redux/Actions/projectAction';
import { useLocation, useParams } from 'react-router';
import { Table } from 'react-bootstrap';
import { GetUserAction } from '../../redux/Actions/authAction';
import { Link } from 'react-router-dom';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CopyToClipboard from 'react-copy-to-clipboard';
import { NftList } from '../../redux/Actions/projectAction';
import dayjs from 'dayjs';
import WidgetPopup from './widgetPopup';
import { set } from 'react-hook-form';
const RefralTransdataTable = (props) => {
    const dispatch = useDispatch()
    const [projSlug, setProjSlug] = useState(" ")
    const [nftSlug, setNftslug] = useState(" ")
    const [nftData, setNftdata] = useState()
    const { Panel } = Collapse;
    const onChange = (key) => {
        console.log(key);
    };
    const [copy, setCopy] = useState(false)
    const [expandIconPosition, setExpandIconPosition] = useState('end');
    const [widgetModalShow, setWidgetModalShow] = useState(false)
    const onPositionChange = (newExpandIconPosition) => {
        setExpandIconPosition(newExpandIconPosition);
    };
    const nftdetail = useSelector(state => {
        return state.projectdetails.nftlist
    })

    const userdet = useSelector(state => {

        return state?.user?.userdetail
    })
    const refid = userdet.wallet_id
    const projects = useSelector(state => {
        return state?.projectdetails?.projects
    })
    console.log('projects', projects?.data && projects?.data[0].title)
    const HandleProj = (e,) => {
        setProjSlug(e?.currentTarget?.value)
        // if (projSlug != " ") {
        const slug = projects?.data && projects?.data[0].slug
        dispatch(ProjectDetail(e?.currentTarget?.value ? e?.currentTarget?.value:slug ))
        setNftslug(" ")
        // }
        if (nftSlug != " ") {

            dispatch(NftList(nftSlug))
        }
    }
    // const HandleNFT = (e) => {
    //     // setProjSlug(e?.currentTarget?.value)
    //     // if (projSlug != " ") {
    //         {projects?.data?.nft_data?.map((key)=>{

    //             set
    //         })}
    //         // setNftslug(" ")
    //     // }
    //     if (nftSlug != " ") {

    //         dispatch(NftList(nftSlug))
    //     }
    // }
useEffect(()=>{
    HandleProj()    
},[projects])
    const count = 1
   
    useEffect(() => {
        dispatch(ProjectList({ location, count: count }))
        
    }, [dispatch])

    const location = useLocation()
    useEffect(() => {
        dispatch(GetUserAction())
    }, [props.id])

    const projdetail = useSelector(state => {
        return state?.projectdetails?.projectdetails
    })

   


    return (
        <footer className="item-details-area referal-detail">
            {/* Footer Top */}
            <div >
                <div className="container">
                    <Tabs>
                        <TabList>
                            <Tab>How To Earn</Tab>
                            <Tab>My Referrals</Tab>
                            <Tab>Referral Widget</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="pb-5"> <h3>How Creator and Referral MATIC Rewards Work</h3>
                                <div className='main-heading'>
                                    <div>Affiliates get 30% on first level NFT referred sales at Karmatica.io only.</div>
                                    <div>Creators get 10% of secondary NFT sales for the lifetime of the project.</div>
                                </div>
                                <div className='referal-main'>
                                    <h5>NFT sale to BUYER 1 </h5>
                                    <ul>
                                        <li><span>69%</span> goes to Creator </li>
                                        <li><span>30%</span> goes to Affiliate</li>
                                        <li><span>1% </span>to Karmatica</li>
                                    </ul>
                                </div>
                                <div className='referal-main'>
                                    <h5>NFT resold from BUYER 1 to BUYER 2 via Affiliate</h5>
                                    <ul>
                                        <li> <span>84%</span> goes to BUYER 1</li>
                                        <li> <span>10%</span> goes to NFT Creator</li>
                                        <li> <span>5% </span>goes to Affiliate </li>
                                        <li> <span>1% </span>to Karmatica</li>
                                    </ul>
                                </div></div>
                        </TabPanel>
                        <TabPanel>
                            <div className='position-relative'>
                                <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
                                    <svg className="activity_icon" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M7.24487 14.7815L10.238 10.8914L13.6522 13.5733L16.5813 9.79297" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <circle cx="19.9954" cy="4.20027" r="1.9222" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M14.9245 3.12012H7.65679C4.64535 3.12012 2.77808 5.25284 2.77808 8.26428V16.3467C2.77808 19.3581 4.60874 21.4817 7.65679 21.4817H16.2609C19.2724 21.4817 21.1396 19.3581 21.1396 16.3467V9.30776" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <Panel header="Referral Activity" key="1">
                                        <Table responsive className='m-0' >
                                            <thead>
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Token</th>
                                                    <th>NFT Price</th>
                                                    <th>Referral Amount</th>
                                                    <th>Collection</th>
                                                    <th>From</th>
                                                    <th>To</th>
                                                    <th>Transaction</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userdet?.referral_history?.map((items) => {
                                                    return (
                                                        <><tr className='contract-address'>
                                                            <td ><Link to={`/nftprojdetails/${items.slug}`} >{items.title?.slice(0, 20)}</Link>...</td>
                                                            <td>#{items.token_id?.slice(0, 2)}</td>
                                                            <td>{items.price}</td>
                                                            {/* <td>{items.referral_amount} </td> */}
                                                            <td className='referal'>{items.referral_amount} <img src='../../img/image14.png' /></td>
                                                            <td><Link to={`/popularcollection/details/${items.collection_slug}`}>{items.collection_name}</Link></td>
                                                            <td>{items.pay_from?.slice(0, 4)}...{items.pay_from?.slice(35, 44)}</td>
                                                            <td>{items.pay_to?.slice(0, 4)}...{items.pay_to?.slice(35, 44)}</td>
                                                            <td><a target="_blank" href={`https://polygonscan.com/tx/${items?.transaction_hash}`} >{items.transaction_hash?.slice(0, 4)}...{items.transaction_hash?.slice(35, 44)}</a></td>
                                                        </tr>
                                                        </>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                        <div className='nothing'>
                                            {userdet?.referral_history?.length == 0 &&
                                                <span> No matching records found</span>
                                            }
                                        </div>
                                    </Panel>
                                </Collapse>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <h6 className='top-content'>Share with friends using our NFT widget on your website.<br />
                                Upload your NFTs to get an affiliate referral link to earn 30% of NFTs sold in MATIC</h6>
                            <div className="col-12 col-md-12 pr-0 pl-0 select_bar">
                                <div className="form-group">
                                    <label>Select Project</label>
                                    <select name="category_id"
                                        onChange={HandleProj}
                                    >
                                        <option value={projects.data && projects?.data[0]?.title}  selected style={{ color: "#495057" }}>{projects.data && projects?.data[0]?.title} </option>

                                        {projects?.data?.map((option, key) => (
                                            <option key={key.slug} value={option.slug}  >
                                                {option.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="col-12 mt-4">
                                <div className='nfts_main' id='invest'>
                                    <div className='intro row m-0 p-0'>
                                        {projSlug !== " " &&

                                            <div className="intro-content">
                                                <span >NFTs</span>
                                                <h3 className="w-full mb-0 pt-4">NFTs</h3>
                                            </div>
                                        }
                                    </div>
                                    <div className="row items mt-0 explore-items px-0">
                                        {copy == true &&
                                            <span className='copytext'>Copied!</span>

                                        }
                                        {projdetail?.nft_data?.map((x, idx) => {
                                            const iFrame = `<iframe id="inlineFrameExample"
                                 title="Inline Frame Example"
                                 width="100%"
                                 height="auto"
                                 src='https://app.karmatica.io/referral/widget/${x.slug}/?refid=${refid}'>
                             </iframe>`
                                            return (

                                                <><div key={`eds_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item ">
                                                    <div className="card no-hover m-0" onClick={() => { setNftslug(x.slug); setWidgetModalShow(true) }} style={{cursor:'pointer'}}>

                                                        <div className="image-over relative">
                                                            {x.user_id == projdetail.user_id ? (
                                                                <>
                                                                    {/* <Link to={`/nft/details/${x.slug}?project=${slug}`}> */}
                                                                    {x.extention === 'Player' || x.extention === 'modal' ? (
                                                                        <img className="card-img-top" src={x.preview_imag} alt="" />
                                                                    ) : (
                                                                        <img className="card-img-top" src={x.image} alt="" />
                                                                    )}
                                                                    {/* </Link> */}
                                                                </>
                                                            ) : (
                                                                // <Link to={`/nft/details/${x.slug}?project=${slug}`}>
                                                                <>
                                                                    {x.extention === 'Player' || x.extention === 'modal' ? (
                                                                        <img className="card-img-top" src={x.preview_imag} alt="" />
                                                                    ) : (
                                                                        <img className="card-img-top" src={x.image} alt="" />
                                                                    )}
                                                                </>
                                                                // </Link>
                                                            )}
                                                            <div className='token'>
                                                                <span>#{x?.token_id?.slice(0, 2)}</span>
                                                                <span className='cards-icons'>
                                                                    {/* {x.is_mint == 0 && */}
                                                                    {/* // <Link to={`/nft/details/${x.slug}?project=${slug}`} ><i className="fa-solid fa-pen" /></Link> */}
                                                                    {/* } */}
                                                                </span>
                                                            </div>
                                                            {/* Author */}
                                                        </div>
                                                        {/* Card Caption */}
                                                        <div className="card-caption px-0 col-12 ">
                                                            {/* Card Body */}
                                                            <div className="card-body">
                                                                {/* <a href="#" className="d-flex justify-content-between align-items-center">
                                                                    <h5 className="m-0 pb-2 p-0 text-capitalize">{x.title.slice(0, 16)}...</h5>
                                                                </a> */}
                                                                <div className="d-flex justify-content-between align-items-end mt-1 mb-1 ">
                                                                    Project Name:<span>{x?.project_name?.slice(0, 12)}..</span>
                                                                </div>
                                                                <div className="d-flex justify-content-between align-items-end mt-1 mb-1 ">
                                                                    NFT Name :<span>{x?.title?.slice(0, 12)}..</span>
                                                                </div>
                                                                <div className="d-flex justify-content-between align-items-end mt-1 mb-1 ">
                                                                    NFT Price :<span> {x?.price} (MATIC)</span>
                                                                </div>
                                                                <div className="d-flex justify-content-between align-items-end mt-1 mb-1 ">
                                                                    NFT End-Date :<span>{dayjs(x?.end_date).format("DD MMM YYYY")}</span>
                                                                </div>


                                                            </div>
                                                        </div>

                                                        <i className="fa-sharp fa-solid fa-copy" onClick={() => setWidgetModalShow(true)}></i>
                                                       

                                                    </div>

                                                </div>
                                                <WidgetPopup
                                                data={iFrame}
                                                show={widgetModalShow}
                                                onHide={() => setWidgetModalShow(false)}
                                            />
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </footer>

    )
}
export default RefralTransdataTable