
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Collapse } from 'antd';
import { ProjectDetail, ProjectList } from '../../redux/Actions/projectAction';
import { useParams } from 'react-router';
import { ProgressBar, Table } from 'react-bootstrap';
import ProjDetailPopup from '../Create/projectDetailpopup';
import dayjs from 'dayjs';
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
    console.log(projdetail.country_name?.name, 'projdatanft')

    useEffect(() => {
        // 
        dispatch(ProjectDetail(id))
    }, [id])

    return (
        <div>
            <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
                <Panel header="Details" key="1" >
                    <Table responsive className='nfts_details'>
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
                        <tbody className=''>
                            {/* {projdetail.nft_data?.map((items) => {
                                return ( */}
                            <tr>

                                {/* {projdetail?.country_name?.map((item) => {
                                    return (

                                        <tr>Country : {item.name}</tr>
                                    )
                                })} */}
                                <td><span>Owned By:</span> <span>{projdetail?.user_data?.username}</span></td>
                                <td><span>Total NFT's:</span> <span>{projdetail?.number_of_nft}</span></td>
                                <td><span>Chain: </span> <span>Polygon (Matic)</span></td>
                                <td><span>Created : </span> <span> {dayjs(projdetail?.created_at).format("DD MMM YYYY")} </span></td>
                                <td><span>Country </span> <span>{projdetail.country_name?.name}</span></td>
                                <td><span>State</span>  <span>{projdetail.state_name?.name}</span> </td>
                                <td><span>City</span>  <span>{projdetail.city_name?.name}</span> </td>
                                <td><span>Number of NFTs</span>  <span>{projdetail.number_of_nft}</span> </td>
                                <td><span>Start Date</span>  <span>{projdetail.start_date}</span> </td>
                                <td><span>End Date </span> <span>{projdetail.end_date}</span> </td>
                                <td><span>Price </span> <span> {projdetail.price} </span> </td>
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