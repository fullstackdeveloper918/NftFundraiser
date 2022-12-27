
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