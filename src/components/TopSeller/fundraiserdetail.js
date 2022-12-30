import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Collapse } from 'antd';
import { ProjectDetail, ProjectList } from '../../redux/Actions/projectAction';
import { useParams } from 'react-router';
import { Table } from 'react-bootstrap';
import ProjDetailPopup from '../Create/projectDetailpopup';
const FunddataTable = (props) => {
    const dispatch = useDispatch()
    const { Panel } = Collapse;
    const onChange = (key) => {
        console.log(key);
    };
    const [modalShowproj, setModalShowproj] = React.useState(false);
    const { id } = useParams()
    const [expandIconPosition, setExpandIconPosition] = useState('end');
    const onPositionChange = (newExpandIconPosition) => {
        setExpandIconPosition(newExpandIconPosition);
    };
    // const { id } = useParams()
    const funddetail = useSelector(state => {
        return state?.fundraiser?.fundraiserdetail
    })
    console.log(funddetail?.organization_detail?.country, 'fdddetail')
    return (
        <div className='position-relative'>
            <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>

            <svg className='detail-icon' width="24px" fill="#fff" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z stroke="/><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z"/></svg>   

                <Panel header="Details" key="1" >
                    <Table responsive>
                        <tbody class="nfts_details">
                            <tr>
                                <td><span>Organization Name </span> <span>{funddetail?.organization_detail?.organization_name}</span></td>
                                <td><span>Country</span>  <span>{funddetail?.organization_detail?.country}</span></td>
                                <td><span>Tax Number </span> <span>{funddetail?.organization_detail?.tax_number}</span></td>
                                <td><span>Web URL</span>  <span>{funddetail?.organization_detail?.web_url}</span></td>
                            </tr>
                            {/* )
                            })} */}
                        </tbody>
                    </Table>
                </Panel>
            </Collapse>
        </div>
    )
}
export default FunddataTable