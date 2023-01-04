import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import 'antd/dist/antd.css';
import { Steps } from 'antd';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined, CheckOutlined } from '@ant-design/icons'
import { useParams } from 'react-router';
const alchemyKey = "wss://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

function NftPopup(props) {


    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm({});
    const { id } = useParams();
    const OnSubmit = (data) => {
        // dispatch(CreateCollectionAction(data))
    }

    const description = 'This is a description.';
    function gettxhashAddress() {
        // 
        return window.ethereum?.selectedAddress;
    }
    // function getconfirmAddress() {
    //     // 
    //     return web3.eth.getTransactionReceipt;
    // }
    // useEffect(() => {
    // setTxhash(gettxhashAddress())
    // setConfirm(getconfirmAddress())
    // if (txhas) {
    // setCurrent(1)
    // setCurrent(2)
    // setCurrent(3)
    // }
    // }, [])
    const nftdetail = useSelector(state => {
        // 
        return state.projectdetails.nftlist
    })
    // console.log('latprojdetailpop', nftdetail)
    // const mint = () => {
    //     CreateMetaDataAndMint({
    //         _name: nftdetail.title,
    //         _des: nftdetail.description,
    //         _imgBuffer: nftdetail.image
    //     })
    // }

    const { Step } = Steps;
    return (
        <>

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Follow steps
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Steps current={props.current} direction='vertical'>
                        <Step title="Deploying contract" description='Uploading of all media assets and metadata to IPFS' />
                        <Step icon={props.current == 0 && <LoadingOutlined type="loading" />} title="Mint" description='Send transaction to create your NFT' />
                        <Step icon={props.current !== 2 ? <LoadingOutlined type="loading" /> : props.current == 2 && <CheckOutlined type="finish" />} title="Approve" description='This transaction is conducted only once per collection' />

                    </Steps>


                </Modal.Body>

            </Modal>
        </>
    );
}

export default NftPopup