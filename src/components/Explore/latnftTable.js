import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Collapse } from 'antd';
import { NftList, ProjectDetail, ProjectList } from '../../redux/Actions/projectAction';
import { useParams } from 'react-router';
import { Table } from 'react-bootstrap';
const LatNftDataTable = () => {
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
    const latprojnftdetail = useSelector(state => {
        // 
        return state?.projectdetails?.getnftwoldetails
    })
    console.log(latprojnftdetail, 'laptnft')
    useEffect(() => {
        dispatch(NftList(id))
    }, [id])

    return (
        <div>
            <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
                <Panel header="Details" key="1">
                    <Table responsive >
                        <thead>


                            <tr>

                                <th>Contract Address</th>
                                <th>Token ID</th>
                                <th>Token Stranded</th>
                                <th>Blockchain</th>
                            </tr>


                        </thead>
                        <tbody>
                            {/* {latprojnftdetail?.map((items) => { */}
                            {/* return ( */}
                            <tr>

                                <td>{latprojnftdetail?.collectionData?.contract_id}</td>
                                <td>{latprojnftdetail?.token_id}</td>
                                <td>ERC721</td>
                                <td>Polygon (Matic)</td>
                            </tr>
                            {/* ) */}
                            {/* })} */}

                        </tbody>
                    </Table>
                </Panel>
            </Collapse>
        </div>
    )
}

export default LatNftDataTable