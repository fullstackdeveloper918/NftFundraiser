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
        // debugger
        return state?.projectdetails?.projectdetails
    })
    console.log(projdetail.nft_data, 'projdatanft')

    useEffect(() => {
        // debugger
        dispatch(ProjectDetail(id))
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
                            {projdetail.nft_data?.map((items) => {
                                return (
                                    <tr>

                                        <td>{items.collectionData?.contract_id}</td>
                                        <td>{items.token_id}</td>
                                        <td>ERC721</td>
                                        <td>Polygon (Matic)</td>
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

export default NftdataTable