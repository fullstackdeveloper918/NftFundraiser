
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Collapse } from 'antd';
import { useParams } from 'react-router';
import { ProgressBar, Table } from 'react-bootstrap';
import { TopFundraiserDetail } from '../../redux/Actions/fundraiserAction';
const FunddetailTable = (props) => {
    const dispatch = useDispatch()
    const { Panel } = Collapse;
    const onChange = (key) => {
        console.log(key);
    };
    const { user_id } = useParams()
    const [expandIconPosition, setExpandIconPosition] = useState('end');
    const funddetail = useSelector(state => {
        return state?.fundraiser?.fundraiserdetail
    })

    useEffect(() => {

        dispatch(TopFundraiserDetail(user_id))


    }, [dispatch, user_id])

    return (
        <div>
            <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
                <Panel header="Details" key="1" >
                    <Table responsive className='nfts_details'>

                        <tbody className=''>
                            
                            <tr>

                               
                                <tr><span>Organization Name </span> <span>{funddetail?.organization_detail?.organization_name}</span></tr>
                                <tr><span>Country</span> <span>{funddetail?.organization_detail?.country}</span></tr>
                                <tr><span>Tax number </span> <span>{funddetail?.organization_detail?.tax_number}</span></tr>
                                <tr><span>Web URL </span> <span>{funddetail?.organization_detail?.web_url}</span></tr>
                                <tr><span>Social Links </span> <span>{funddetail?.organization_detail?.social_links}</span></tr>

                            </tr>
                           

                        </tbody>
                    </Table>
                </Panel>
            </Collapse>
        </div>
    )
}

export default FunddetailTable