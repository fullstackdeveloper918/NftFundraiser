
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Collapse } from 'antd';
import { LatestProjectDetail, ProjectDetail, ProjectList } from '../../redux/Actions/projectAction';
import { useLocation, useParams } from 'react-router';
import { ProgressBar, Table } from 'react-bootstrap';
import ProjDetailPopup from '../Create/projectDetailpopup';
import dayjs from 'dayjs';
import { PopularCollectionActionDetails } from '../../redux/Actions/popularAction';
const ProjdataTable = (props) => {
    const dispatch = useDispatch()
    const { Panel } = Collapse;
    const onChange = (key) => {
        console.log(key);
    };
    const [modalShowproj, setModalShowproj] = React.useState(false);
    const { slug } = useParams()
    const [expandIconPosition, setExpandIconPosition] = useState('end');
    const onPositionChange = (newExpandIconPosition) => {
        setExpandIconPosition(newExpandIconPosition);
    };
    const projdetail = useSelector(state => {
        // 
        return state?.projectdetails?.projectdetails
    })
    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })
    const latprojdetail = useSelector(state => {
        // 
        return state.projectdetails.latestprojectdetails
    })
    
    useEffect(() => {
        dispatch(LatestProjectDetail(slug))
        if(sessionStorage.getItem("authToken")){

            dispatch(ProjectDetail(slug))
        }
        dispatch(PopularCollectionActionDetails(props.idx))
    }, [slug])

    const coll = useSelector(state => {
        // 
        return state?.collection?.collectiondetail
    })
    const location = useLocation();
    const date1 = new Date(coll?.updated_at)
    const date2 = new Date()
    const time_difference = date2.getTime() - date1.getTime();
    const days_difference = Math.ceil(time_difference / (1000 * 60 * 60 * 24));
    return (
        <div>
            <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
                <svg fill="#fff" width="24px" height="24px" class='detail-icon' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M688 312v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm144 452H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h272c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm445.7 51.5l-93.3-93.3C814.7 780.7 828 743.9 828 704c0-97.2-78.8-176-176-176s-176 78.8-176 176 78.8 176 176 176c35.8 0 69-10.7 96.8-29l94.7 94.7c1.6 1.6 3.6 2.3 5.6 2.3s4.1-.8 5.6-2.3l31-31a7.9 7.9 0 0 0 0-11.2zM652 816c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
                </svg>
                {/* <svg className='detail-icon' width="24px" fill="#fff" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z stroke=" /><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z" /></svg> */}
                <Panel header="Details" key="1" >
                    <Table responsive className='nfts_details'>
                        {projdetail?.user_data?.user_id === userdet?.user_id && sessionStorage.getItem('authToken') &&

                            <div >
                                <i class="fa-solid fa-pen" onClick={() =>
                                    setModalShowproj(true)}></i>
                                <ProjDetailPopup
                                    // 
                                    id={props.id}
                                    show={modalShowproj}
                                    onHide={() => setModalShowproj(false)} />
                                {/* <a className=""> <Link to={`/updateproject/${projdetail.id}`} style={{ color: '#FFF' }}> <i class="fa-solid fa-pen" ></i></Link></a> */}

                                {/* <a className="" onClick={() => deleteHandler(projdetail.id)} style={{ color: '#FFF' }}> <i class="fa-sharp fa-solid fa-trash"></i> */}
                                {/* </a> */}
                            </div>
                        }
                        <tbody className=''>
                            {/* {projdetail.nft_data?.map((items) => {
                                return ( */}
                            <tr>

                                {/* {projdetail?.country_name?.map((item) => {
                                    return (

                                        <tr>Country : {item.name}</tr>
                                    )
                                })} */}
                                {location.pathname === `/projects/${slug}` ? (

                                    <>
                                        {/* <td><span>Owned By:</span> <span>{latprojdetail?.user_data?.username}</span> </td> */}
                                        {/* <td><span>Total NFT's:</span> <span>{latprojdetail?.number_of_nft}</span></td> */}
                                        <td><span>Chain </span> <span>Polygon (Matic)</span></td>
                                        <td><span>Created  </span> <span> {dayjs(latprojdetail?.created_at).format("DD MMM YYYY")} </span></td>
                                        <td><span>Country </span> <span>{latprojdetail?.country_name?.name}</span></td>
                                        <td><span>State</span>  <span>{latprojdetail?.state_name?.name}</span> </td>
                                        <td><span>City</span>  <span>{latprojdetail?.city_name?.name}</span> </td>
                                        <td><span>Project Type</span>  <span>{latprojdetail?.type === "1" ? "Single" : 'Campaign'}</span> </td>
                                        {latprojdetail.type == 2 &&

                                            <><td><span>Start Date</span>  <span>{latprojdetail?.start_date}</span> </td>
                                                <td><span>End Date </span> <span>{latprojdetail?.end_date}</span> </td></>
                                        }
                                        <td><span>Price </span> <span> {latprojdetail?.price} </span> </td></>
                                ) : (
                                    <>
                                        {location.pathname === `/popularcollection/details/${slug}` ? (
                                            <>

                                                <td><span>Number of NFTs </span><span> {coll?.nft_data?.length}</span></td>
                                                <td><span>Chain </span> <span>Polygon (Matic)</span></td>
                                                <td><span>Created at</span>  <span>{days_difference} days ago</span> </td>
                                                <td><span>Category</span>  <span>{coll?.category}</span> </td>
                                            </>
                                        ) : (

                                            <>
                                                <td><span>Chain: </span> <span>Polygon (Matic)</span></td>
                                                <td><span>Created : </span> <span> {dayjs(projdetail?.created_at).format("DD MMM YYYY")} </span></td>
                                                <td><span>Country </span> <span>{projdetail.country_name?.name}</span></td>
                                                <td><span>State</span>  <span>{projdetail.state_name?.name}</span> </td>
                                                <td><span>City</span>  <span>{projdetail.city_name?.name}</span> </td>
                                                <td><span>Project Type</span>  <span>{projdetail?.type === "1" ? "Single" : 'Campaign'}</span> </td>
                                                {projdetail.type == 2 &&

                                                    <><td><span>Start Date</span>  <span>{projdetail.start_date}</span> </td>
                                                        <td><span>End Date </span> <span>{projdetail.end_date}</span> </td></>
                                                }
                                                <td><span>Price </span> <span> {projdetail.price} </span> </td>
                                            </>
                                        )}
                                    </>
                                )}
                            </tr>
                            {/* )
                            })} */}

                        </tbody>
                    </Table>
                </Panel>
            </Collapse>
        </div>
    )
}

export default ProjdataTable