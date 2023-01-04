
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Collapse } from 'antd';
import { ProjectDetail, ProjectList } from '../../redux/Actions/projectAction';
import { useParams } from 'react-router';
import { Table } from 'react-bootstrap';
import ProjDetailPopup from '../Create/projectDetailpopup';
const UserdataTable = (props) => {
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

    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })



    return (
        <div>
            <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
            <svg className='detail-icon' width="24px" fill="#fff" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z stroke=" /><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z" /></svg>
              
                <Panel header="Details" key="1" >
                    <Table responsive className='nfts_details' >

                        <tbody >

                            <tr>
                             
                                <td><span>Name </span> <span>{userdet.username}</span></td>
                                <td><span>Wallet ID</span>  <span>{userdet.wallet_id}</span></td>
                                <td><span>Reffers </span> <span>{userdet.reffers}</span></td>
                                <td><span>Fundraised </span> <span>{userdet.total_fundraised}</span></td>

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

export default UserdataTable