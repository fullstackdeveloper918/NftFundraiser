import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Collapse } from 'antd';
import { ProjectDetail, ProjectList } from '../../redux/Actions/projectAction';
import { useParams } from 'react-router';
import { Table } from 'react-bootstrap';
import ProjDetailPopup from '../Create/projectDetailpopup';
const ProjdataTable = (props) => {
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
    const projdetail = useSelector(state => {
        // 
        return state?.projectdetails?.projectdetails
    })
    console.log(projdetail.country_name?.name, 'projdatanft')

    useEffect(() => {
        // 
        dispatch(ProjectDetail(id))
    }, [id])

    return (
        <div>
            <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
                <Panel header="Details" key="1" >
                    <Table responsive >
                        <div >
                            <i class="fa-solid fa-pen" onClick={() =>
                                setModalShowproj(true)}></i>
                            <ProjDetailPopup
                                debugger
                                id={props.id}
                                show={modalShowproj}
                                onHide={() => setModalShowproj(false)} />
                            {/* <a className=""> <Link to={`/updateproject/${projdetail.id}`} style={{ color: '#FFF' }}> <i class="fa-solid fa-pen" ></i></Link></a> */}

                            {/* <a className="" onClick={() => deleteHandler(projdetail.id)} style={{ color: '#FFF' }}> <i class="fa-sharp fa-solid fa-trash"></i> */}
                            {/* </a> */}
                        </div>
                        <tbody>
                            {/* {projdetail.nft_data?.map((items) => {
                                return ( */}
                            <tr>
                                {/* {projdetail?.country_name?.map((item) => {
                                    return (

                                        <tr>Country : {item.name}</tr>
                                    )
                                })} */}

                                <tr>Country  {projdetail.country_name?.name}</tr>
                                <tr>State  {projdetail.state_name?.name}</tr>
                                <tr>City  {projdetail.city_name?.name}</tr>
                                <tr>Number of NFTs  {projdetail.number_of_nft}</tr>
                                <tr>Start Date  {projdetail.start_date}</tr>
                                <tr>End Date  {projdetail.end_date}</tr>
                                <tr>Price  {projdetail.price}</tr>
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

export default ProjdataTable