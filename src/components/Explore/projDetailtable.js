// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Collapse } from 'antd';
// import { ProjectDetail, ProjectList } from '../../redux/Actions/projectAction';
// import { useParams } from 'react-router';
// import { ProgressBar, Table } from 'react-bootstrap';
// import ProjDetailPopup from '../Create/projectDetailpopup';
// import dayjs from 'dayjs';
// const ProjdataTable = (props) => {
//     const dispatch = useDispatch()
//     const { Panel } = Collapse;
//     const onChange = (key) => {
//         console.log(key);
//     };
//     const [modalShowproj, setModalShowproj] = React.useState(false);
//     const id = useParams()
//     const [expandIconPosition, setExpandIconPosition] = useState('end');
//     const onPositionChange = (newExpandIconPosition) => {
//         setExpandIconPosition(newExpandIconPosition);
//     };
//     const projdetail = useSelector(state => {

//         // 
//         return state?.projectdetails?.projectdetails
//     })
//     console.log(projdetail, 'projd')


//     useEffect(() => {
//         // 
//         dispatch(ProjectDetail(id))
//     }, [id])

//     // console.log(projdetail?.project_percentage, "percet")

//     return (
//         <div>
//             <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
//                 <Panel header="Details" key="1" >
//                     <Table responsive className='nfts_details'>
//                         <div >
//                             <i class="fa-solid fa-pen" onClick={() =>
//                                 setModalShowproj(true)}></i>
//                             <ProjDetailPopup
//                                 debugger
//                                 id={props.id}
//                                 show={modalShowproj}
//                                 onHide={() => setModalShowproj(false)} />
//                             {/* <a className=""> <Link to={`/updateproject/${projdetail.id}`} style={{ color: '#FFF' }}> <i class="fa-solid fa-pen" ></i></Link></a> */}

//                             {/* <a className="" onClick={() => deleteHandler(projdetail.id)} style={{ color: '#FFF' }}> <i class="fa-sharp fa-solid fa-trash"></i> */}
//                             {/* </a> */}
//                         </div>
//                         <tbody className=''>
//                             {/* {projdetail.nft_data?.map((items) => {
//                                 return ( */}
//                             <tr>

//                                 {/* {projdetail?.country_name?.map((item) => {
//                                     return (

//                                         <tr>Country : {item.name}</tr>
//                                     )
//                                 })} */}
//                                 <tr><span>Owned By:</span> <span>{projdetail?.user_data?.username}</span></tr>
//                                 <tr><span>Total NFT's:</span> <span>{projdetail?.number_of_nft}</span></tr>
//                                 <tr><span>Chain: </span> <span>Polygon (Matic)</span></tr>
//                                 <tr><span>Created : </span> <span> {dayjs(projdetail?.created_at).format("DD MMM YYYY")} </span></tr>
//                                 <tr><span>Country </span> <span>{projdetail.country_name?.name}</span></tr>
//                                 <tr><span>State</span>  <span>{projdetail.state_name?.name}</span> </tr>
//                                 <tr><span>City</span>  <span>{projdetail.city_name?.name}</span> </tr>
//                                 <tr><span>Number of NFTs</span>  <span>{projdetail.number_of_nft}</span> </tr>
//                                 <tr><span>Start Date</span>  <span>{projdetail.start_date}</span> </tr>
//                                 <tr><span>End Date </span> <span>{projdetail.end_date}</span> </tr>
//                                 <tr><span>Price </span> <span> {projdetail.price} </span> </tr>
//                             </tr>
//                             {/* )
//                             })} */}

//                         </tbody>
//                     </Table>
//                 </Panel>
//             </Collapse>
//         </div>
//     )
// }

// export default ProjdataTable
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
                                <tr><span>Owned By:</span> <span>{projdetail?.user_data?.username}</span></tr>
                                <tr><span>Total NFT's:</span> <span>{projdetail?.number_of_nft}</span></tr>
                                <tr><span>Chain: </span> <span>Polygon (Matic)</span></tr>
                                <tr><span>Created : </span> <span> {dayjs(projdetail?.created_at).format("DD MMM YYYY")} </span></tr>
                                <tr><span>Country </span> <span>{projdetail.country_name?.name}</span></tr>
                                <tr><span>State</span>  <span>{projdetail.state_name?.name}</span> </tr>
                                <tr><span>City</span>  <span>{projdetail.city_name?.name}</span> </tr>
                                <tr><span>Number of NFTs</span>  <span>{projdetail.number_of_nft}</span> </tr>
                                <tr><span>Start Date</span>  <span>{projdetail.start_date}</span> </tr>
                                <tr><span>End Date </span> <span>{projdetail.end_date}</span> </tr>
                                <tr><span>Price </span> <span> {projdetail.price} </span> </tr>
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