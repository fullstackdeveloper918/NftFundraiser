import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Collapse } from 'antd';
import { NftList, ProjectDetail, ProjectList } from '../../redux/Actions/projectAction';
import { useParams } from 'react-router';
import { Table } from 'react-bootstrap';
const LatNftDataTable = (props) => {
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

    // useEffect(() => {
    //     debugger
    //     dispatch(NftList(id))
    // }, [id])
    const latprojnftdetail = useSelector(state => {
        // 
        return state?.projectdetails?.getnftwoldetails
    })
    console.log(latprojnftdetail, 'laptnft')

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
                                <td>{latprojnftdetail?.collectionData?.contract_id}</td>
                            </tr>
                            <tr>
                                <th>Token ID</th>
                                <td>{latprojnftdetail?.token_id}</td>
                            </tr>
                            <tr>
                                <th>Token Stranded</th>
                                <td>ERC721</td>
                            </tr>

                            {/* <tr>

                                <th>Contract Address</th>
                                <th>Token ID</th>
                                <th>Token Stranded</th>
                                <th>Blockchain</th>
                            </tr> */}


                        </thead>

                    </Table>
                </Panel>
            </Collapse>
        </div>
    )
}

export default LatNftDataTable