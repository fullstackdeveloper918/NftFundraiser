import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Collapse } from 'antd';
import { ProjectDetail, ProjectList } from '../../redux/Actions/projectAction';
import { useParams } from 'react-router';
import { Table } from 'react-bootstrap';

const FundTransdataTable = () => {
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

    const funddetail = useSelector(state => {
        return state?.fundraiser?.fundraiserdetail
    })
    console.log(funddetail?.organization_detail?.country, 'fdddetail')


    return (
        <div className='position-relative'>
            <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
            <svg class="activity_icon" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M7.24487 14.7815L10.238 10.8914L13.6522 13.5733L16.5813 9.79297" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="19.9954" cy="4.20027" r="1.9222" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle><path d="M14.9245 3.12012H7.65679C4.64535 3.12012 2.77808 5.25284 2.77808 8.26428V16.3467C2.77808 19.3581 4.60874 21.4817 7.65679 21.4817H16.2609C19.2724 21.4817 21.1396 19.3581 21.1396 16.3467V9.30776" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <Panel header="Item Activity" key="1">
                    <Table responsive >
                        <thead>


                            <tr>

                                <th>NFT</th>
                                <th>Project</th>
                                <th>Price</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Token</th>

                                <th>Transaction</th>
                            </tr>


                        </thead>
                        <tbody>
                            {funddetail?.payment_history?.map((items) => {
                                return (
                                    <tr>

                                        <td>#{items.nft_id}</td>
                                        <td>#{items.project_id}</td>
                                        <td>{items.price}</td>
                                        <td>{items.pay_from.slice(0, 4)}...{items.pay_from.slice(35, 44)}</td>
                                        <td>{items.pay_to.slice(0, 4)}...{items.pay_to.slice(35, 44)}</td>
                                        <td>#{items.token_id}</td>
                                        <td>{items.txd_id.slice(0, 4)}...{items.txd_id.slice(35, 44)}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </Table>
                </Panel>
                <div className='nothing'>
                      No matching records found
                        </div>
            </Collapse>
        </div>
    )
}

export default FundTransdataTable