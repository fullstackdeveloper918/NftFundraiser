import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CreateCollectionAction, UpdateProject } from '../../redux/Actions/projectAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import JoditEditor from 'jodit-react';
import { useParams } from 'react-router';
import Web3 from 'web3';
import React from 'react';
import { CityList, StateList } from '../../redux/Actions/authAction';
// import 'bootstrap/dist/css/bootstrap.min.css';
import NFTContract from '../../backend/contracts/artWork.sol/NFTContract.json'
import { CreateMetaDataAndMint } from '../Wallet/interact';
import NftPopup from './nftPopup';
const alchemyKey = "wss://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// console.log(NFTContract.abi,"abi")
const web3 = createAlchemyWeb3(alchemyKey);
const provider = new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B");

function SellPopup(props) {
    const [current, setCurrent] = React.useState(0)
    const dispatch = useDispatch()
    const slug = useParams()
    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm({});
    const [modalShow, setModalShow] = React.useState(false);

    const OnSubmit = (data) => {
    }
    const nftdetail = useSelector(state => {
        // 
        return state.projectdetails.nftlist

    })
    // console.log(nftdetail, 'latprojdetail')
    const collupdate = useSelector(state => {
        return state?.projectdetails?.collectiondetails
    })

    // console.log('collupdate', collupdat


    const mint = (contractAddress) => {
        CreateMetaDataAndMint({
            _name: nftdetail.title,
            _des: nftdetail.description,
            _imgBuffer: nftdetail.image,
            contractAddress,
            setCurrent,
            collid: nftdetail?.collection_id,
            nft_file_content: nftdetail?.nft_file_content,
            slug,
            setModalShow
        })
    }

    const deployContract = async () => {

        try {
            if (nftdetail?.collectionData?.contract_id == null) {

                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: web3.utils.toHex('80001') }],
                })

                // const { address } = await ConnectWallet()
                const address = window?.ethereum?.selectedAddress
                const MyNFTContract = new web3.eth.Contract(NFTContract.abi)
                const gas = await web3.eth.getGasPrice();
                // const gas = 500000

                MyNFTContract.deploy({
                    data: NFTContract.bytecode,
                    arguments: [nftdetail?.collectionData?.title, nftdetail?.collectionData?.symbol],
                }).send({
                    from: address,
                })
                    .on('error', (error) => {
                        // console.log(error)
                    })
                    .on('transactionHash', (transactionHash) => {
                        // console.log(transactionHash, "transactionHash")
                    })
                    .on('receipt', (receipt) => {
                        // receipt will contain deployed contract address
                        // console.log(receipt, "reciept")
                    })
                    .on('confirmation', (confNumber, receipt) => {
                        // console.log(receipt.contractAddress, "confirmRecipet")
                        if (confNumber == 1) {
                            mint(receipt?.contractAddress)
                            // setContractAdd(receipt?.contractAddress)
                            // UpdateContract(id)
                        }

                    })
            } else {
                mint(nftdetail?.collectionData?.contract_id)
            }
            return {
                success: true,
                // status: ":white_check_mark: Check out your transaction on Etherscan: <https://ropsten.etherscan.io/tx/>" + txHash
                status: ":white_check_mark: Check out your transaction on Etherscan: <https://ropsten.etherscan.io/tx/>"
            }
        } catch (error) {
            // 
            alert("went wrong")
            return {
                success: false,
                status: ":disappointed_relieved: Something went wrong: " + error.message
            }
        }

    }

    const deployAndMint = async () => {

        setModalShow(true)
        // mint()
        await deployContract()
        // nftdetail.id()
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header >

                <div>
                    <a>List for sale</a> <a><i class="fa-regular fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a>
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(OnSubmit)} className="item-form card no-hover">
                    <div className="row">

                        <div className="col-12 ">
                            <div className="form-group mt-3">
                                <label>Choose a type of sale</label>
                                <div className="form-check form-check-inline mr-2">
                                    {/* {data.usertype == 2 ? ( */}
                                    <>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="radiobutton"
                                            id="1"
                                            // checked={data.usertype ? false:tr}
                                            value="1"
                                        // defaultChecked={data.usertype == 1 ? true : !usertype ? true : false}
                                        // {...register("usertype", { required: true })}
                                        // aria-invalid={errors.usertype ? "true" : "false"}
                                        // onChange={(e) => setUserType(e.target.value)}
                                        // defaultChecked={data.usertype}
                                        />
                                        <label className="form-check-label mr-2" htmlFor="donation">Fixed Price</label>
                                    </>
                                    {/* ) : ( */}

                                    <><input
                                        className="form-check-input"
                                        type="radio"
                                        name="radiobutton"
                                        id="2"
                                        value="2"
                                    // {...register("usertype", { required: true })}
                                    // defaultChecked={data.usertype == 2 ? true : false}
                                    // onChange={(e) => setUserType(e.target.value)}
                                    // aria-invalid={errors.type ? "true" : "false"}

                                    />
                                        <label className="form-check-label" htmlFor="donation">English Auction</label></>
                                    {/* )} */}
                                </div>

                                {/* {errors.usertype?.type === 'required' && <p style={{ color: 'red' }} role="alert">Type is required</p>} */}

                            </div>
                        </div>
                        <div className="col-md-12 col-12">
                            {/* {type == 1 && ( */}

                            <div className="form-group mt-3">
                                <label>Set Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder="Set price"
                                // {...register("title", { required: true, pattern: { value: /[A-Za-z]/ } })}
                                // aria-invalid={errors.title ? "true" : "false"}
                                />
                                {/* {errors.title && errors.title?.type === 'pattern' && <p style={{ color: 'red' }} role="alert">Only VarChar allowed</p>} */}
                                {/* {errors.title?.type === 'required' && <p style={{ color: 'red' }} role="alert">Title is required</p>} */}

                            </div>
                            {/* )} */}
                        </div>
                        <><div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Start date</label>
                                <input
                                    type="date"
                                    // placeholder='dd-mm-yy'
                                    // hidden={data.type == 1}
                                    className="form-control"
                                    name="start_date"
                                // min={disablePastDate()}

                                // placeholder="Start date :"
                                // {...register("start_date", { required: true })}
                                // aria-invalid={errors.start_date ? "true" : "false"} 
                                />
                                {/* {errors.start_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">Start date is required</p>} */}
                            </div>
                        </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label>End Date</label>
                                    <input
                                        type="date"
                                        // hidden={data.type == 1}
                                        className="form-control"
                                        name="end_date"
                                    // min={disablePastDate()}

                                    // placeholder="End date"
                                    // {...register("end_date")}
                                    // aria-invalid={errors.end_date ? "true" : "false"}
                                    />
                                    <div >

                                        {/* <span className='logo-dis'>End date should be greater then or equal to start date</span> */}
                                    </div>
                                    {/* {errors.end_date && errors?.end_date?.type === 'min' && <p style={{ color: 'red' }} role="alert">End date should be greater or equal to startdate</p>} */}
                                    {/* {errors.end_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">End date is required</p>} */}
                                </div>
                            </div></>
                        <button className="w-full btn btn-bordered-white btn-smaller mt-3 d-flex align-items-center justify-content-center py-1 mx-2" style={{ color: '#FFF' }}
                            id="nftdetail.id" onClick={() => deployAndMint(slug)}>Mint</button><NftPopup
                            show={modalShow}
                            current={current}
                            onHide={() => setModalShow(false)} />
                    </div>



                </form>
            </Modal.Body>

        </Modal >
    );
}

export default SellPopup