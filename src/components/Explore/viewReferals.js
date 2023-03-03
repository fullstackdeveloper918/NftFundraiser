
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Collapse } from 'antd';
import { GetNftwol, ProjectDetail, ProjectList } from '../../redux/Actions/projectAction';
import { useLocation, useParams } from 'react-router';
import { Table } from 'react-bootstrap';
import { GetUserAction } from '../../redux/Actions/authAction';
import { Link } from 'react-router-dom';

const RefralTransdataTable = (props) => {
    const dispatch = useDispatch()

    const { Panel } = Collapse;
    const onChange = (key) => {
        console.log(key);
    };

    const [expandIconPosition, setExpandIconPosition] = useState('end');
    const onPositionChange = (newExpandIconPosition) => {
        setExpandIconPosition(newExpandIconPosition);
    };


    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })

    useEffect(() => {
        dispatch(GetUserAction())
    }, [props.id])
    const location = useLocation()
    return (
        <footer className="footer-area">
            {/* Footer Top */}
            <div className="footer-top">
                <div className="container">
                    <div className='position-relative'>
                        <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
                            <svg className="activity_icon" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M7.24487 14.7815L10.238 10.8914L13.6522 13.5733L16.5813 9.79297" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <circle cx="19.9954" cy="4.20027" r="1.9222" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M14.9245 3.12012H7.65679C4.64535 3.12012 2.77808 5.25284 2.77808 8.26428V16.3467C2.77808 19.3581 4.60874 21.4817 7.65679 21.4817H16.2609C19.2724 21.4817 21.1396 19.3581 21.1396 16.3467V9.30776" stroke="#ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <Panel header="Referral Activity" key="1">
                                <Table responsive >
                                    <thead>


                                        <tr>

                                            <th>Item</th>
                                            <th>Token</th>
                                            <th>NFT Price</th>
                                            <th>Referral Amount</th>
                                            <th>Collection</th>
                                            <th>From</th>
                                            <th>To</th>

                                            <th>Transaction</th>
                                        </tr>


                                    </thead>


                                    <tbody>
                                        {userdet?.referral_history?.map((items) => {
                                            return (

                                                <><tr className='contract-address'>

                                                    <td ><Link to={`/nftprojdetails/${items.slug}`} >{items.title?.slice(0, 20)}</Link>...</td>
                                                    <td>#{items.token_id}</td>
                                                    <td>{items.price}</td>
                                                    {/* <td>{items.referral_amount} </td> */}
                                                    <td className='referal'>{items.referral_amount} <img src='../../img/image14.png' /></td>
                                                    <td><Link to={`/popularcollection/details/${items.collection_slug}`}>{items.collection_name}</Link></td>
                                                    <td>{items.pay_from?.slice(0, 4)}...{items.pay_from?.slice(35, 44)}</td>
                                                    <td>{items.pay_to?.slice(0, 4)}...{items.pay_to?.slice(35, 44)}</td>
                                                    <td><a target="_blank" href={`https://mumbai.polygonscan.com/tx/${items?.transaction_hash}`} >{items.transaction_hash?.slice(0, 4)}...{items.transaction_hash?.slice(35, 44)}</a></td>
                                                </tr>
                                                </>

                                            )
                                        })}

                                    </tbody>




                                </Table>
                                <div className='nothing'>
                                    {userdet?.referral_history?.length == 0 &&
                                        <span> No matching records found</span>
                                    }
                                </div>
                            </Panel>

                        </Collapse>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default RefralTransdataTable