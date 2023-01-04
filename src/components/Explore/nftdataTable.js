import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Collapse } from 'antd';
import { ProjectDetail, ProjectList } from '../../redux/Actions/projectAction';
import { useParams } from 'react-router';
import { Table } from 'react-bootstrap';
const NftdataTable = () => {
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
        // 
        return state?.projectdetails?.projectdetails
    })
    console.log(projdetail.nft_data, 'projdatanft')

    useEffect(() => {
        // 
        dispatch(ProjectDetail(id))
    }, [id])

    return (
        <div className='nft_detail_main position-relative'>
            <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
            <svg className='detail-icon' width="24px" fill="#fff" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z stroke=" /><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z" /></svg>
                <Panel header="Details" key="1">
                    <Table responsive className='m-0'>
                        <thead>

                            <tr>
                                <th>Blockchain</th>
                                <td>Polygon (Matic)</td>
                            </tr>
                            <tr>
                                <th>Contract</th>
                                <td>0214</td>
                            </tr>
                            <tr>
                                <th>Token ID</th>
                                <td>1254</td>
                            </tr>
                            <tr>
                                <th>Token Stranded</th>
                                <td>ERC721</td>
                            </tr>
                           


                        </thead>
                        <tbody>
                            {/* {projdetail.nft_data?.map((items) => { */}
                                {/* // return ( */}
                                    <tr>

                                        <td>
                                            {/* {items.collectionData?.contract_id} */}
                                            </td>
                                        <td>
                                            {/* {items.token_id} */}
                                            </td>
                                        {/* <td>ERC721</td> */}
                                        {/* <td>Polygon (Matic)</td> */}
                                    </tr>
                                {/* // ) */}
                            {/* })} */}

                        </tbody>
                    </Table>
                </Panel>
                {/* <div className='nothing'>
                No matching records found
                        </div> */}
            </Collapse>
        </div>
    )
}

export default NftdataTable