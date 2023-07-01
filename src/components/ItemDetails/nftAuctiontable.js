
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Collapse } from 'antd';
import { getBid, NftList,  UpdateBId } from '../../redux/Actions/projectAction';
import { Table } from 'react-bootstrap';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useHistory } from 'react-router-dom';


const NftAuctiondataTable = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const { Panel } = Collapse;
    const onChange = (key) => {
        // console.log(key);
    };
    const [expandIconPosition, setExpandIconPosition] = useState('end');
    const onPositionChange = (newExpandIconPosition) => {
        setExpandIconPosition(newExpandIconPosition);
    };
   
    const nftdetail = useSelector(state => {
        return state.projectdetails.nftlist

    })
    useEffect(() => {
        dispatch(NftList(props.slug.id,null,history))

    }, [props.slug.id,dispatch])

    const acceptHandler = (id) => {
        getBid(props,history)
        dispatch(UpdateBId({ id, status: "2", setLoading, slug: props.slug.id,history }))
    }
    const rejectHandler = (id) => {
        getBid(props,history)
        dispatch(UpdateBId({ id, status: "3", setLoading, slug: props.slug.id,history }))
    }

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 35,
                textAlign: "center"

            }}
            spin
        />
    )
    return (
        <div className='position-relative'>


            < Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
                <svg className="activity_icon" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" d="M7.24487 14.7815L10.238 10.8914L13.6522 13.5733L16.5813 9.79297" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <circle cx="19.9954" cy="4.20027" r="1.9222" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M14.9245 3.12012H7.65679C4.64535 3.12012 2.77808 5.25284 2.77808 8.26428V16.3467C2.77808 19.3581 4.60874 21.4817 7.65679 21.4817H16.2609C19.2724 21.4817 21.1396 19.3581 21.1396 16.3467V9.30776" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <Panel header="Latest Bids" key="1" >
                    <Table responsive >
                        {loading ? (
                            <div className='spiner'>
                                <Spin indicator={antIcon} />
                            </div>
                        ) : (
                            <><thead>


                                <tr>

                                    <th>User</th>
                                    <th>Bid Price</th>
                                    <th>Wallet</th>
                                  
                                    <th>Action</th>
                                </tr>


                            </thead>
                           
                               
                            
                            <tbody className='img_table'>

                                    {nftdetail.bids?.map((item) => {

                                        return (
                                            <tr>

                                                <td>{item.username}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.pay_from?.slice(0, 4)}...{item.pay_from?.slice(35, 44)}</td>
                                               
                                                <td className='Btn_td'>
                                                    {item.status === 1 ? (

                                                        <><Button type="submit" className={nftdetail.bid_approved_id !== null ? "btndisabled" : "table-btn "} onClick={() => acceptHandler(item.id)} disabled={nftdetail.bid_approved_id !== null ? true : false}>Accept</Button>
                                                            <Button type="submit" className={nftdetail.bid_approved_id !== null ? "btndisabled" : "table-btn "} onClick={() => rejectHandler(item.id)} disabled={nftdetail.bid_approved_id !== null ? true : false}>Reject</Button></>
                                                    ) : (
                                                        <>
                                                            {/* {nftdetail?.bid_approved_id !== null && } */}
                                                            <a className='auctionbttn'>Confirmed</a>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}

                                </tbody>
                  
                        
                                </>

                        )}
                    </Table>
                    {nftdetail?.bids?.length === 0 &&
                        <div className='nothing'>

                            No matching records found
                        </div>
                    }
                </Panel>

            </Collapse>
        </div >
    )
}

export default NftAuctiondataTable