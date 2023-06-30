import React from 'react';
import Modal from 'react-bootstrap/Modal';
import 'antd/dist/antd.css';
import { Steps } from 'antd';
import { LoadingOutlined, CheckOutlined } from '@ant-design/icons'


function NftPopup(props) {



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
                        <Step icon={props.current === 0 && <LoadingOutlined type="loading" />} title="Deploying contract" description='Uploading of all media assets and metadata to IPFS' />
                        <Step icon={props.current === 0 && <LoadingOutlined type="loading" />} title="Mint" description='Send transaction to create your NFT' />
                        <Step icon={props.current !== 2 ? <LoadingOutlined type="loading" /> : props.current === 2 && <CheckOutlined type="finish" />} title="Approve" description='This transaction is conducted only once per collection' />

                    </Steps>


                </Modal.Body>

            </Modal>
        </>
    );
}

export default NftPopup