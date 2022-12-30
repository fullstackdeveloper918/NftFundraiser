// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Collapse } from 'antd';
// import { ProjectDetail, ProjectList } from '../../redux/Actions/projectAction';
// import { useParams } from 'react-router';
// import { Table } from 'react-bootstrap';

// const LatNftdataTable = () => {
//     const dispatch = useDispatch()

//     const { Panel } = Collapse;
//     const onChange = (key) => {
//         console.log(key);
//     };
//     const { id } = useParams()
//     const [expandIconPosition, setExpandIconPosition] = useState('end');
//     const onPositionChange = (newExpandIconPosition) => {
//         setExpandIconPosition(newExpandIconPosition);
//     };
//     const projdetail = useSelector(state => {
//         // debugger
//         return state?.projectdetails?.latestprojectdetails
//     })
//     console.log(projdetail.nft_data, 'projdatanft')

//     useEffect(() => {
//         // debugger
//         dispatch(ProjectDetail(id))
//     }, [id])

//     return (
//         <div>
//             <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
//                 <Panel header="Item Activity" key="1">
//                     <Table responsive >
//                         <thead>


//                             <tr>

//                                 <th>Item</th>
//                                 <th>Price</th>
//                                 <th>From</th>
//                                 <th>To</th>
//                                 <th>Transaction</th>
//                             </tr>


//                         </thead>
//                         <tbody>
//                             {projdetail?.project_activity && projdetail?.project_activity?.length ?
//                                 [...new Map(projdetail?.project_activity.map(item =>
//                                     [item["title"], item])).values()].map((item, idx) => {
//                                         return (

//                                             <tr>

//                                                 <td><img
//                                                     src={item.image}
//                                                     className="rounded-circle"
//                                                     alt="Avatar"
//                                                 />{item.nft_title.slice(0, 15)}</td>
//                                                 <td>{item.price}</td>
//                                                 <td>{item.pay_from.slice(0, 4)}...{item.pay_from.slice(35, 44)}</td>
//                                                 <td>{item.pay_to.slice(0, 4)}...{item.pay_to.slice(35, 44)}</td>
//                                                 <td>{item.txd_id.slice(0, 4)}...{item.txd_id.slice(35, 44)}</td>
//                                             </tr>
//                                         )
//                                     }) :
//                                 // <div className="col-12 col-sm-12 col-lg-12">
//                                 <>

//                                     <span>You don't have any activity yet</span>

//                                 </>
//                                 // </div>
//                             }
//                             {/* {projdetail?.project_activity?.map((items) => {
//                                 return (

//                                     <tr>

//                                         <td><img
//                                             src={items.image}
//                                             className="rounded-circle"
//                                             alt="Avatar"
//                                         />{items.nft_title.slice(0, 15)}</td>
//                                         <td>{items.price}</td>
//                                         <td>{items.pay_from.slice(0, 4)}...{items.pay_from.slice(35, 44)}</td>
//                                         <td>{items.pay_to.slice(0, 4)}...{items.pay_to.slice(35, 44)}</td>
//                                         <td>{items.txd_id.slice(0, 4)}...{items.txd_id.slice(35, 44)}</td>
//                                     </tr>
//                                 )
//                             })} */}

//                         </tbody>
//                     </Table>
//                 </Panel>
//             </Collapse>
//         </div>
//     )
// }

// export default LatNftdataTable
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Collapse } from 'antd';
import { ProjectDetail, ProjectList } from '../../redux/Actions/projectAction';
import { useParams } from 'react-router';
import { Table } from 'react-bootstrap';

const LatNftdataTable = () => {
    const dispatch = useDispatch()

    const { Panel } = Collapse;
    const onChange = (key) => {
        console.log(key);
    };
    const { id } = useParams()
    const [expandIconPosition, setExpandIconPosition] = useState('end');
    const onPositionChange = (newExpandIconPosition) => {
        setExpandIconPosition(newExpandIconPosition);
    };
    const projdetail = useSelector(state => {
        // debugger
        return state?.projectdetails?.latestprojectdetails
    })
    console.log(projdetail.nft_data, 'projdatanft')

    useEffect(() => {
        // debugger
        dispatch(ProjectDetail(id))
    }, [id])

    return (
        <div className='position-relative'>
            < Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
                 <svg className="activity_icon" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" d="M7.24487 14.7815L10.238 10.8914L13.6522 13.5733L16.5813 9.79297" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="19.9954" cy="4.20027" r="1.9222" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.9245 3.12012H7.65679C4.64535 3.12012 2.77808 5.25284 2.77808 8.26428V16.3467C2.77808 19.3581 4.60874 21.4817 7.65679 21.4817H16.2609C19.2724 21.4817 21.1396 19.3581 21.1396 16.3467V9.30776" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                    <Panel header="Item Activity" key="1" >
                    <Table responsive >
                        <thead>


                            <tr>

                                <th>Item</th>
                                <th>Price</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Transaction</th>
                            </tr>


                        </thead>
                        <tbody>
                            {projdetail?.project_activity && projdetail?.project_activity?.length ?
                                [...new Map(projdetail?.project_activity.map(item =>
                                    [item["title"], item])).values()].map((item, idx) => {
                                        return (
                                            <tr>

                                                <td><img
                                                    src={item.image}
                                                    className="rounded-circle mr-2"
                                                    alt="Avatar"
                                                />{item.nft_title.slice(0, 15)}</td>
                                                <td>{item.price}</td>
                                                <td>{item.pay_from.slice(0, 4)}...{item.pay_from.slice(35, 44)}</td>
                                                <td>{item.pay_to.slice(0, 4)}...{item.pay_to.slice(35, 44)}</td>
                                                <td>{item.txd_id.slice(0, 4)}...{item.txd_id.slice(35, 44)}</td>
                                            </tr>
                                        )
                                    }) :
                                // <div className="col-12 col-sm-12 col-lg-12">
                                <>
                                   
                                </>
                            }
                        </tbody>
                        {/* <div  className='text-align-center'>
                                         <span>You don't have any activity yet</span>
                                    </div> */}
                    </Table>
                </Panel>
                <div className='nothing'>
                            ---
                        </div>
            </Collapse>
        </div>
    )
}

export default LatNftdataTable