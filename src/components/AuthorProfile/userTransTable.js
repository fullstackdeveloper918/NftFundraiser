import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Collapse } from 'antd';
import { Table } from 'react-bootstrap';

const UserdataTable = (props) => {

    const { Panel } = Collapse;
    const onChange = (key) => {
    };
    const [expandIconPosition, setExpandIconPosition] = useState('end');
    const onPositionChange = (newExpandIconPosition) => {
        setExpandIconPosition(newExpandIconPosition);
    };
    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })

    return (
        <div>
            <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
                <svg fill="#fff" width="24px" height="24px" class='detail-icon' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M688 312v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm144 452H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h272c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm445.7 51.5l-93.3-93.3C814.7 780.7 828 743.9 828 704c0-97.2-78.8-176-176-176s-176 78.8-176 176 78.8 176 176 176c35.8 0 69-10.7 96.8-29l94.7 94.7c1.6 1.6 3.6 2.3 5.6 2.3s4.1-.8 5.6-2.3l31-31a7.9 7.9 0 0 0 0-11.2zM652 816c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
                </svg>
                <Panel header="Details" key="1" >
                    <Table responsive className='nfts_details' >
                        <tbody >
                            <tr>
                                <td><span>Name </span> <span>{userdet.username ? userdet.username :  "N/A" }</span></td>
                                <td><span>Wallet ID</span>  <span>{userdet.wallet_id}</span></td>
                                <td><span>Number of Referrals </span> <span>{userdet.referrers}</span></td>
                                <td><span>Referral Amount </span> <span>{userdet.referral_amount} Polygon token</span></td>
                                <td><span>Fundraised </span> <span>{userdet.total_fundraised} MATIC</span></td>
                            </tr>
                        </tbody>
                    </Table>
                </Panel>
            </Collapse>
        </div>
    )
}
export default UserdataTable