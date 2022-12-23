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
        <div>
            <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
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
            </Collapse>
        </div>
    )
}

export default FundTransdataTable