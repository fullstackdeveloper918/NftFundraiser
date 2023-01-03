
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
    const { id } = useParams()
    const [expandIconPosition, setExpandIconPosition] = useState('end');
    const onPositionChange = (newExpandIconPosition) => {
        setExpandIconPosition(newExpandIconPosition);
    };
    const projdetail = useSelector(state => {
        // 
        return state?.projectdetails?.projectdetails
    })
    console.log(projdetail, 'userprojdata')
    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })
    const latprojdetail = useSelector(state => {
        // 
        return state.projectdetails.latestprojectdetails
    })
    console.log(latprojdetail, 'userprojdetaaaa')
    // const [projuserID, setProjuserid] = useState()
    // console.log('projjj', projuserID)
    // const projuserid = projdetail?.user_data?.map((item) => {
    //     return (
    //         setProjuserid(item.user_id)
    //     )
    // })
    console.log(userdet.user_id, 'uid')
    useEffect(() => {
        dispatch(LatestProjectDetail(id))
        dispatch(ProjectDetail(id))
        dispatch(PopularCollectionActionDetails(props.idx))
    }, [id])

    const coll = useSelector(state => {
        // 
        return state?.collection?.collectiondetail
    })
    const location = useLocation();
    const date1 = new Date(coll?.updated_at)
    const date2 = new Date()
    const time_difference = date2.getTime() - date1.getTime();
    const days_difference = Math.ceil(time_difference / (1000 * 60 * 60 * 24));
    console.log('days', days_difference)
    return (
        <div>
            <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>

                <svg className='detail-icon' width="24px" fill="#fff" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z stroke=" /><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z" /></svg>
                <Panel header="Details" key="1" >
                    <Table responsive className='nfts_details'>
                        {projdetail?.user_data?.user_id === userdet?.user_id && localStorage.getItem('authToken') &&

                            <div >
                                <i class="fa-solid fa-pen" onClick={() =>
                                    setModalShowproj(true)}></i>
                                <ProjDetailPopup
                                    debugger
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
                                {location.pathname === `/projdetails/${id}` ? (

                                    <>
                                        {/* <td><span>Owned By:</span> <span>{latprojdetail?.user_data?.username}</span> </td> */}
                                        {/* <td><span>Total NFT's:</span> <span>{latprojdetail?.number_of_nft}</span></td> */}
                                        <td><span>Chain: </span> <span>Polygon (Matic)</span></td>
                                        <td><span>Created : </span> <span> {dayjs(latprojdetail?.created_at).format("DD MMM YYYY")} </span></td>
                                        <td><span>Country </span> <span>{latprojdetail?.country_name?.name}</span></td>
                                        <td><span>State</span>  <span>{latprojdetail?.state_name?.name}</span> </td>
                                        <td><span>City</span>  <span>{latprojdetail?.city_name?.name}</span> </td>
                                        <td><span>Number of NFTs</span>  <span>{latprojdetail?.number_of_nft}</span> </td>
                                        {latprojdetail.type == 2 &&

                                            <><td><span>Start Date</span>  <span>{latprojdetail?.start_date}</span> </td>
                                                <td><span>End Date </span> <span>{latprojdetail?.end_date}</span> </td></>
                                        }
                                        <td><span>Price </span> <span> {latprojdetail?.price} </span> </td></>
                                ) : (
                                    <>
                                        {location.pathname === `/popularcollection/details/${id}` ? (
                                            <>

                                                <td><span>Number of NFTs </span> {coll?.nft_data?.length}<span></span></td>
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
                                                <td><span>Number of NFTs</span>  <span>{projdetail.number_of_nft}</span> </td>
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