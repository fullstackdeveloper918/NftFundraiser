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
        <div>
            <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
                <Panel header="Details" key="1" >
                    <Table responsive >
                        <tbody>
                            <tr>
                                <td>Organization Name  {funddetail?.organization_detail?.organization_name}</td>
                                <td>Country  {funddetail?.organization_detail?.country}</td>
                                <td>Tax Number  {funddetail?.organization_detail?.tax_number}</td>
                                <td>Web URL  {funddetail?.organization_detail?.web_url}</td>
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