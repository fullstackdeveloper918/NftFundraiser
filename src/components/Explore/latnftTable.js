import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Collapse } from 'antd';
import { NftList, ProjectDetail, ProjectList } from '../../redux/Actions/projectAction';
import { useParams } from 'react-router';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const { CONTRACT_ADDRESS_URL } = process.env;
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
                <svg fill="#fff" width="24px" height="24px" class='detail-icon' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M688 312v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm144 452H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h272c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm445.7 51.5l-93.3-93.3C814.7 780.7 828 743.9 828 704c0-97.2-78.8-176-176-176s-176 78.8-176 176 78.8 176 176 176c35.8 0 69-10.7 96.8-29l94.7 94.7c1.6 1.6 3.6 2.3 5.6 2.3s4.1-.8 5.6-2.3l31-31a7.9 7.9 0 0 0 0-11.2zM652 816c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
                </svg>
                {/* <svg className='detail-icon' width="24px" fill="#fff" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z stroke=" /><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z" /></svg> */}
                <Panel header="Details" key="1">
                    <Table responsive className='m-0'>

                        <thead>

                            <tr>
                                <th>Blockchain</th>
                                <td>Polygon (Matic)</td>
                            </tr>
                            <tr className='contract-address'>
                                <th>Contract ID</th>
                                <td> <a target="_blank" href={`https://polygonscan.com/address/${latprojnftdetail?.collectionData?.contract_id}`} >{latprojnftdetail?.collectionData?.contract_id?.slice(0, 5)}.....{latprojnftdetail?.collectionData?.contract_id?.slice(39, 42)}</a></td>
                                {/* <td>{latprojnftdetail?.collectionData?.contract_id}</td> */}
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